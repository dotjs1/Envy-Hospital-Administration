const mongoose=require('mongoose');
const express=require('express');
const routes=express.Router();

const Connectmongoose=async()=>{
    try{
     await mongoose.connect(process.env.MONGO_URI);

     console.log('connected to ptdatas collection of mongoDB')
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
}
Connectmongoose();

const Ptschema=new mongoose.Schema({},{strict:false});
const AppoiModel=mongoose.model('Save',Ptschema,'ptdatas');

routes.get('/getappointment',async(req,res)=>{
try{
    const collectionData=await AppoiModel.find();
    res.status(200).json({message:'data has been extracted successfully',data:collectionData})
}catch (error) {
    console.error("Error fetching data:", error.message);
}
});

routes.delete('/cancel', async (req, res) => {
    console.log("Query:", req.query);
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: 'ID is required to cancel an appointment' });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const ObjId= new mongoose.Types.ObjectId(id);
        const result = await AppoiModel.findByIdAndDelete(ObjId);
        if (!result) {
            return res.status(404).json({ error: 'Appointment ID not found in the database' });
        }
        return res.status(200).json({ message: 'The appointment has been canceled',result });
        
    } catch (error) {
        console.error("Error deleting data:", error);
        res.status(500).json({ error: "Failed to cancel appointment", details: error.message });
    }
});
module.exports=routes;
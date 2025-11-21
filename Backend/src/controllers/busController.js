import BUS from "../models/busModel.js";

export const addBus = async(req,res)=>{

    try{
        const { bus_name, start_point,end_point,travel_date,departure_time,arrival_time,price} = req.body;

        if(!bus_name||!start_point||!end_point||!travel_date||!departure_time||!arrival_time||!price){
            return res.status(400).json({message:"All fields are required"});
        }

        const result = await BUS.addBus({bus_name, start_point,end_point,travel_date,departure_time,arrival_time,price});

        res.status(200).json({message:"Bus Added successfully", bus_id: result.insertId});

    }catch(err){
        return res.status(500).json({ error: err.message });
    }
}

export const getAllBuses = async(req,res)=>{
    try{
        const result = await BUS.getAllBus();
        res.status(200).json({message:"All fetched successfully",result})
    }catch(err){
        return res.status(500).json({ error: err.message });

    }
}

export const updateBus = async(req,res)=>{
    try{
        const busId=req.params.bus_id;
        const updateBus = await BUS.updateBusDetails(busId,req.body)
        if(updateBus.affectedRows===0){
            return res.status(500).json({message:"Bus Not Found","BusId":busId});
        }
        return res.status(200).json({message:"Updates successfully","BusId":busId})

    }catch(err){
        return res.status(500).json({ error: err.message });
    }
}

export const deletingBus = async(req,res)=>{
    try{
        const busId=req.params.bus_id;
        const deleteResult  = await BUS.deleteBus(busId)
        if(deleteResult .affectedRows===0){
            return res.status(500).json({message:"Bus Not Found","BusId":busId});
        };
        return res.status(200).json({message:"Deleted successfully","BusId":busId});

    }catch(err){
        return res.status(500).json({ error: err.message });
    }
}
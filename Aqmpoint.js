const mongoose = require('mongoose');


const AqmpointSchema = new mongoose.Schema({
    aqm: {
        r3000:Number, 
        r5000:Number,
        noxevent:Number,
        r2000: Number,
        coevent: Number ,
    },
    gps: {
        system_time: String,
        gps_time: String,
        latitude: String,
        longitude: String
    }
})


module.exports = mongoose.model('Aqmpoint',AqmpointSchema);
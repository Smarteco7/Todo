const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const listSchema = new mongoose.Schema({
    // id:{
    //     type: Number,
    //     required:false,
    // },
    title:{
        type: String,
        required:true,
    },
    date:{
        type: Date,
        min:'1800-01-01',
        max:'2050-12-31',
        required:false
    },
    time:{
        type: String,
        required:false,
    },
    isCompleted:{
        type: Boolean,
        default: false,
    }

}, {timestamps: true});

 const List= mongoose.model('List', listSchema);

module.exports = List;
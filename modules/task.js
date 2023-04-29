const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({ 

    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    assignedUserId:{
        type:String,
        
    },
    assignedUserName:{
        type:String,
    },
    status:{
        type:String,
        required:true,
        default:"toDo"
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        require:true,
    },
    updatedAt:{
        type:Date,
        require:true,
    },
    role:{
        type:String,
        require:true,
    },
  
});

module.exports = mongoose.model('Task', taskSchema);

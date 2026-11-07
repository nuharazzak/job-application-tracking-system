import mangoose from "mongoose";

const Userschema =new mangoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
        }       
},
    {
    timestamps:true   ,
    }
    
);
const User = mangoose.model("User",Userschema);

export default User;
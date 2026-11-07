import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id)=>{
    return jwt.
    sign({id},process
    .env.JWT_SECRET,{
    expiresIn:"7d"
    });
}

const registeredUser =  async (req,res,next)=>{
    try{
        const {name,email,password,} = req.body;

        //validate all required fields
        if(!name || !email || !password){
            res.status(400);
            throw new Error ("Please fill all required fields");
        }

        //check if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400);
            throw new Error ("User already exists");
        }


        //hash password

        const hashedPassword  = await bcrypt.hash(password,10);

        //create new user

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });

        if(user){
            res.status(201)
            .json({
                success:true,
                message:"User registered successfully",

                _id:user._id,
                name:user.name,
                email:user.email,

                token:generateToken(user._id)

            });
        }
    }
    catch(error){
        next(error);
    }
}

const loginUser = async(req,res,next)=>{
    try{
        const{email, password} = req.body;
        if(!email || !password){
            res.status(400);
            throw new Error ("Please fill email and password");
        };

        const user = await User.findOne({email});

        if(user && 
            //compare password
            (await bcrypt.compare(password,user.password)))

        {
            res.status(200).json({
                success:true,
                message: "User logged in successfully",

                _id:user._id,
                name:user.name,
                email:user.email,
                token:generateToken(user._id)

            });


        }else{
            res.status(401);
            throw new Error("Invalid email or password");
        }

    }
    catch(error){
        next(error);
    }

}

const getUserProfile = async(req,res,next)=>{
    res.status(200).json({
        success:true,
        user:req.user
    });
};

export{registeredUser,loginUser,getUserProfile};
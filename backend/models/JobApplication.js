import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true
    },
    company:{
        type:String,
        required:true,
        trim:true
    },
    position:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        trim:true
    },
    jobType:{
        type:String,
        enum:["Full-time","Part-time","Internship", "Contract"],
        default:"Full-time"
    },
    workModel:{
        type:String,
        enum:["On-site","Remote","Hybrid"],
        default:"On-site"
    },
     status: {
        type: String,
        enum: [
            "Wishlist",
            "Applied",
            "Interview",
            "Assessment",
            "Offered",
            "Rejected",
            "Withdrawn"
        ],
        default: "Applied"
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },

    jobUrl: {
        type: String,
        trim: true
    },

    salary: {
        type: Number,
        min: 0
    },

    notes: {
        type: String,
        trim: true
    }

},
{
    timestamps:true
}

);

const JobApplication = mongoose.model("JobApplication", JobApplicationSchema);

export default JobApplication;
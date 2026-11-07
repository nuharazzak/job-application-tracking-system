import mangoose from "mongoose";

const JobApplicationSchema = new mangoose.Schema({
    user:{
        type : mangoose.Schema.Types.ObjectId,
        ref : "User",
        required:true
    },
    Company:{
        type:String,
        required:true,
        trim:true
    },
    Position:{
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

const JobApplication = mangoose.model("JobApplication", JobApplicationSchema);

export default JobApplication;
import JobApplication from '../models/jobApplication.js';

// Create a new job application
const createJobApplication = async (req,res, next) => {
     try{
        const {
            company,
            position,
            location,
            jobType,
            workModel,
            status,
            applicationDate,
            jobUrl,
            salary,
            notes
        } = req.body;

        //Validate required fields
        if(!company || !position){
            res.status(400);
            throw new Error("Please fill all required fields");
        }

        //create new job application
        const application = await JobApplication.create({
            user: req.user._id, //get the user ID from the authentication middleware.
            company,
            position,
            location,
            jobType,
            workModel,
            status,
            applicationDate,
            jobUrl,
            salary,
            notes
        });
        res.status(201).json({ 
            success: true,
            message: "job application created successfully",
            application
         });

     }
     catch(error){
        next(error);
     }
}

const getJobApplications = async (req, res, next)=>{
    try{
        const applications = await JobApplication.find({
            user: req.user._id
        }).sort({createdAt: -1}); //sort by most recent applications first

        res.status(200).json({
            success:true,
            count: applications.length,
            applications 
        });
    }
    catch(error){
        next(error);
}
}

const getJobApplicationById = async (req, res, next) =>{
    try{
        const applications = await JobApplication.findOne({
            user:req.user._id,
            _id:req.params.id
        });

        if(!applications)
        {
            res.status(404);
            throw new Error("Job application not found");
        }

        res.status(200).json({
            success:true,
            applications
        })
    }
    catch(error){
        next(error);
    }
}

const updateJobApplication = async (req, res, next)=>{
    try{
        const updatedApplication = await JobApplication.findOneAndUpdate({
            _id:req.params.id,
            user:req.user._id
        },
        req.body,
        {
            new:true,
            runValidators:true
        }
        );
        if(!updatedApplication){
            res.status(404);
            throw new Error("Job application not found");

        }
        res.status(200).json({
            success:true,
            message:"Job Application Updated Successfully",
            application: updatedApplication
        });
    }
    catch(error){
        next(error);
    }
}


const deleteJobApplication = async(req, res, next)=>{
    try{
        const deletedApplication = await JobApplication.findOneAndDelete({
            _id:req.params.id,
            user:req.user._id

        });

        if(!deletedApplication){
            res.status(404);
            throw new Error ("Job Application not found");
        }

        res.status(200).json({
            success:true,
            message:"Job Application Deleted Successfully"
        });
    }
    catch(error){
        next(error);
    }

}

export {
    createJobApplication,
    getJobApplications,
    getJobApplicationById,
    updateJobApplication,
    deleteJobApplication
};
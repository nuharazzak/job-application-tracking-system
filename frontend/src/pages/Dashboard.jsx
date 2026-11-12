import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard= ()=>{
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStates] = useState(
        {   total:0,
            applied:0,
            interview:0,
            rejected:0

        }
    );

    const recentApplications = [...applications]
    .sort((a, b) =>
        new Date(b.applicationDate) - new Date(a.applicationDate)
    )
    .slice(0, 5);
   
    // Fetch job applications

    const fetchApplications = async()=>{
        try{
            const response =  await API.get("/applications");
            const data = response.data.applications || [];
            


             // Store applications
            setApplications(data);


            setStates({
                total:data.length,
                applied:data.filter(app=>app.status === "Applied").length,
                interview:data.filter(app=>app.status === "Interview").length,
                rejected:data.filter(app=>app.status === "Rejected").length,


            });
        }
        catch(error){
             console.error(
                "Error fetching applications:",
                error.response?.data?.message || error.message
            );
        }
        finally{
            setLoading(false);
        }

    }

    // Run when dashboard loads
    useEffect(()=>{
        fetchApplications()
    },[]);

    const getStatusStyle = (status)=>{
        switch(status){
            case "Applied":
            return "bg-blue-100 text-blue-700";

        case "Interview":
            return "bg-green-100 text-green-700";

        case "Rejected":
            return "bg-red-100 text-red-700";

        case "Shortlisted":
            return "bg-purple-100 text-purple-700";

        case "Offer":
            return "bg-yellow-100 text-yellow-700";

        default:
            return "bg-gray-100 text-gray-700";
        }

    };


    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Dashboard Header */}
            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Welcome back! Here's your job application overview.
                </p>

            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-lg bg-white p-6 shadow">

                    <h3 className="text-gray-500">
                        Total Applications
                    </h3>

                    <p className="mt-2 text-3xl font-bold text-gray-800">
                        {stats.total}
                    </p>

                </div>

                <div className="rounded-lg bg-white p-6 shadow">

                    <h3 className="text-gray-500">
                        Applied
                    </h3>

                    <p className="mt-2 text-3xl font-bold text-blue-600">
                        {stats.applied}
                    </p>

                </div>

                <div className="rounded-lg bg-white p-6 shadow">

                    <h3 className="text-gray-500">
                        Interview
                    </h3>

                    <p className="mt-2 text-3xl font-bold text-green-600">
                        {stats.interview}
                    </p>

                </div>

                <div className="rounded-lg bg-white p-6 shadow">

                    <h3 className="text-gray-500">
                        Rejected
                    </h3>

                    <p className="mt-2 text-3xl font-bold text-red-600">
                        {stats.rejected}
                    </p>

                </div>

            </div>

            {/* Recent Applications Section */}
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

    <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Recent Applications
    </h2>

    {loading ? (
        <p className="text-gray-500 text-center py-6">
            Loading applications...
        </p>
    ) : applications.length === 0 ? (
        <p className="text-gray-500 text-center py-6">
            No job applications yet. Add your first application to get started.
        </p>
    ) : (
        <div className="overflow-x-auto">

            <table className="w-full text-left">

                <thead>
                    <tr className="border-b text-gray-500 text-sm">
                        <th className="py-3 px-4">Company</th>
                        <th className="py-3 px-4">Position</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Applied Date</th>
                        <th className="py-3 px-4">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {recentApplications.map((application) => (
                        <tr
                            key={application._id}
                            className="border-b hover:bg-gray-50"
                        >
                            <td className="py-4 px-4 font-medium text-gray-800">
                                {application.company}
                            </td>

                            <td className="py-4 px-4 text-gray-600">
                                {application.position}
                            </td>

                            <td className="py-4 px-4 text-gray-600">
                                {application.location || "-"}
                            </td>

                            <td className="py-4 px-4 text-gray-600">
                                {application.applicationDate
                                    ? new Date(application.applicationDate).toLocaleDateString()
                                    : "-"}
                            </td>

                            <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(application.status)}`}>
                                    {application.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    )}

    </div>

        </div>
    );

};


export default Dashboard;
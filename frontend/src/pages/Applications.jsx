import { useEffect, useState } from "react";
import API from "../services/api";

const Applications = () => {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch all applications
    const fetchApplications = async () => {

        try {
            setLoading(true);
            setError("");

            const response = await API.get("/applications");

            const data = response.data.applications || [];

            setApplications(data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to fetch applications"
            );

        } finally {
            setLoading(false);
        }
    };

    // Handle application deletion
const handleDelete = async (id) => {

    // Ask for confirmation
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        setError("");
        setSuccess("");

        // Send DELETE request to backend
        await API.delete(`/applications/${id}`);

        // Remove deleted application from state
        setApplications((prevApplications) =>
            prevApplications.filter(
                (application) => application._id !== id
            )
        );

        // Display success message
        setSuccess("Application deleted successfully!");

    } catch (error) {

        setError(
            error.response?.data?.message ||
            "Failed to delete application"
        );

    }
};

    // Run when component loads
    useEffect(() => {
        fetchApplications();
    }, []);

    // Status badge colors
    const getStatusStyle = (status) => {

        switch (status) {

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

            {/* Page Header */}
            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    My Applications
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage and track all your job applications.
                </p>

            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {success && (
                    <p className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                        {success}
                    </p>
                )}
                {loading ? (

                    <p className="text-center py-6 text-gray-500">
                        Loading applications...
                    </p>

                ) : error ? (

                    <p className="text-center py-6 text-red-600">
                        {error}
                    </p>

                ) : applications.length === 0 ? (

                    <p className="text-center py-6 text-gray-500">
                        No applications found. Add your first job application!
                    </p>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full text-left">

                            <thead>
                                <tr className="border-b text-gray-500 text-sm">

                                    <th className="py-3 px-4">Company</th>

                                    <th className="py-3 px-4">Position</th>

                                    <th className="py-3 px-4">Location</th>

                                    <th className="py-3 px-4">Job Type</th>

                                    <th className="py-3 px-4">Applied Date</th>

                                    <th className="py-3 px-4">Status</th>

                                    <th className="py-3 px-4">Actions</th>

                                </tr>
                            </thead>

                            <tbody>

                                {applications.map((application) => (

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
                                            {application.jobType}
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

                                        <td className="py-4 px-4">

                                        <button
                                            onClick={() => handleDelete(application._id)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Delete
                                        </button>

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

export default Applications;
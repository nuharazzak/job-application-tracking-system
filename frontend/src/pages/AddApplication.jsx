import { useState } from "react";
import {useNavigate} from "react-router-dom";
import API from "../services/api";

const AddApplication = ()=>{

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: "",
        position: "",
        location: "",
        jobType: "Full-time",
        workMode: "On-site",
        applicationDate: new Date().toISOString().split("T")[0],
        jobUrl: "",
        salary: "",
        status: "Applied",
        notes: ""

    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

   // Handle input change
const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData((prevData) => ({
        ...prevData,
        [name]: value
    }));

};

// Form validation
const validateForm = () => {

    if (!formData.company.trim()) {
        return "Company name is required";
    }

    if (!formData.position.trim()) {
        return "Job position is required";
    }

    if (!formData.applicationDate) {
        return "Application date is required";
    }

    if (formData.salary !== "" && Number(formData.salary) < 0) {
        return "Salary cannot be negative";
    }

    return null;
};

    

    // Submit application
const handleSubmitApplication = async (e) => {

    e.preventDefault();

    setError("");
    setSuccessMessage("");

    // Validate form
    const validationError = validateForm();

    if (validationError) {
        setError(validationError);
        return;
    }

    try {

        setLoading(true);

        const applicationData = {
            ...formData,
            company: formData.company.trim(),
            position: formData.position.trim(),
            location: formData.location.trim(),
            salary: formData.salary === ""
                ? undefined
                : Number(formData.salary)
        };

        await API.post('/applications', applicationData);

        setSuccessMessage("Application saved successfully!");

        // Navigate to dashboard after successful submission
        setTimeout(() => {
            navigate('/dashboard');
        }, 1000);

    }
    catch (error) {

        setError(
            error.response?.data?.message ||
            "Failed to add application. Please try again."
        );

    }
    finally {

        setLoading(false);

    }

};
    return(
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Add Job Application
                </h1>
                {error && 
                (
                    <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </p>
                )}
                {successMessage && (
                    <p className="bg-green-100 text-green-700 p-3 rounded mb-4">
                        {successMessage}
                     </p>
                )}
                <form onSubmit={handleSubmitApplication}>
                     {/* Company */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Company Name
                        </label>

                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter company name"
                        />
                    </div>
                    {/* Position */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Job Position
                        </label>

                        <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            required
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter job position"
                        />
                    </div>
                    {/* Location */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter location"
                        />
                    </div>
                     {/* Job Type */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Job Type
                        </label>

                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-3"
                        >
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Internship</option>
                            <option>Contract</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Work Mode
                        </label>

                        <select
                            name="workMode"
                            value={formData.workMode}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-3"
                        >
                            <option>On-site</option>
                            <option>Remote</option>
                            <option>Hybrid</option>
                        </select>
                    </div>
                     {/* Application Date */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Application Date
                        </label>

                        <input
                            type="date"
                            name="applicationDate"
                            value={formData.applicationDate}
                            onChange={handleInputChange}
                            required
                            className="w-full border rounded-lg p-3"
                        />
                    </div>
                    {/* Job URL */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Job URL
                        </label>

                        <input
                            type="url"
                            name="jobUrl"
                            value={formData.jobUrl}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-3"
                            placeholder="https://example.com/job"
                        />
                    </div>
                    {/* Salary */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Salary
                        </label>

                        <input
                            type="number"
                            name="salary"
                            min="0"
                            value={formData.salary}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-3"
                            placeholder="Enter expected salary"
                        />
                    </div>
                    {/* Status */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">
                            Application Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-3"
                        >
                            <option>Applied</option>
                            <option>Interview</option>
                            <option>Rejected</option>
                            <option>Shortlisted</option>
                            <option>Offer</option>
                        </select>
                    </div>
                    {/* Notes */}
                    <div className="mb-6">
                        <label className="block mb-2 font-medium">
                            Notes
                        </label>

                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full border rounded-lg p-3"
                            placeholder="Additional information..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Saving..." : "Save Application"}
                    </button>


                </form>
            </div>
           </div> 
        
    );
    

};

export default AddApplication;
import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";
import {
    Briefcase,
    Send,
    CalendarCheck,
    XCircle,
    Award
} from "lucide-react";

const Dashboard= ()=>{
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [stats, setStats] = useState(
        {   total:0,
            applied:0,
            interview:0,
            rejected:0,
            offers: 0

        }
    );

    const recentApplications = [...applications]
    .sort((a, b) =>
        new Date(b.applicationDate) - new Date(a.applicationDate)
    )
    .slice(0, 5);

    // Prepare application statistics for charts

const chartData = [
    {
        name: "Applied",
        value: applications.filter(app => app.status === "Applied").length
    },
    {
        name: "Interview",
        value: applications.filter(app => app.status === "Interview").length
    },
    {
        name: "Rejected",
        value: applications.filter(app => app.status === "Rejected").length
    },
    {
        name: "Shortlisted",
        value: applications.filter(app => app.status === "Shortlisted").length
    },
    {
        name: "Offer",
        value: applications.filter(app => app.status === "Offer").length
    }
];

        const COLORS = [
            "#3B82F6",
            "#22C55E",
            "#EF4444",
            "#A855F7",
            "#EAB308"
        ];
   
    

    // Fetch job applications
const fetchApplications = async () => {

    try {

        setLoading(true);
        setError("");

        const response = await API.get("/applications");

        const data = response.data.applications || [];

        // Store applications
        setApplications(data);

        // Calculate statistics
        setStats({
            total: data.length,
            applied: data.filter(app => app.status === "Applied").length,
            interview: data.filter(app => app.status === "Interview").length,
            rejected: data.filter(app => app.status === "Rejected").length,
            offers: data.filter(app => app.status === "Offer").length
        });

    } catch (error) {

        setError(
            error.response?.data?.message ||
            "Failed to load applications. Please try again."
        );

    } finally {

        setLoading(false);

    }
};

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
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
            <h1 className="text-3xl font-bold text-gray-900">
                Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
                Welcome back! Here's your job application overview.
            </p>
        </div>

        <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            })}
        </div>

    </div>

            {/* Statistics Section */}
           

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
    {/* Total Applications */}

    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between">

            <div>
                <p className="text-sm text-gray-500">
                    Total Applications
                </p>

                <h3 className="mt-2 text-3xl font-bold text-gray-800">
                    {stats.total}
                </h3>
            </div>

            <div className="rounded-lg bg-blue-100 p-3">
                <Briefcase className="h-6 w-6 text-blue-600" />
            </div>

        </div>

    </div>


    {/* Applied */}

    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between">

            <div>
                <p className="text-sm text-gray-500">
                    Applied
                </p>

                <h3 className="mt-2 text-3xl font-bold text-blue-600">
                    {stats.applied}
                </h3>
            </div>

            <div className="rounded-lg bg-blue-100 p-3">
                <Send className="h-6 w-6 text-blue-600" />
            </div>

        </div>

    </div>


    {/* Interview */}

    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between">

            <div>
                <p className="text-sm text-gray-500">
                    Interview
                </p>

                <h3 className="mt-2 text-3xl font-bold text-green-600">
                    {stats.interview}
                </h3>
            </div>

            <div className="rounded-lg bg-green-100 p-3">
                <CalendarCheck className="h-6 w-6 text-green-600" />
            </div>

        </div>

    </div>


    {/* Rejected */}

    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between">

            <div>
                <p className="text-sm text-gray-500">
                    Rejected
                </p>

                <h3 className="mt-2 text-3xl font-bold text-red-600">
                    {stats.rejected}
                </h3>
            </div>

            <div className="rounded-lg bg-red-100 p-3">
                <XCircle className="h-6 w-6 text-red-600" />
            </div>

        </div>

    </div>


    {/* Offers */}

    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

        <div className="flex items-center justify-between">

            <div>
                <p className="text-sm text-gray-500">
                    Offers
                </p>

                <h3 className="mt-2 text-3xl font-bold text-yellow-600">
                    {stats.offers}
                </h3>
            </div>

            <div className="rounded-lg bg-yellow-100 p-3">
                <Award className="h-6 w-6 text-yellow-600" />
            </div>

        </div>

    </div>

</div>

            {/* Application Statistics Charts */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

    {/* Pie Chart */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">

            <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800">
                    Application Status Distribution
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Overview of your application statuses.
                </p>
            </div>

        <ResponsiveContainer width="100%" height={300}>

            <PieChart>

                <Pie
                    data={chartData.filter(item => item.value > 0)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >

                    {chartData
                        .filter(item => item.value > 0)
                        .map((entry) => (
                            <Cell
                                key={entry.name}
                                fill={COLORS[chartData.indexOf(entry)]}
                            />
                        ))}

                </Pie>

                <Tooltip />
                <Legend />

            </PieChart>

        </ResponsiveContainer>

    </div>

    {/* Bar Chart */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">

        <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800">
                    Application Statistics
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Compare applications across different statuses.
                </p>
        </div>

        <ResponsiveContainer width="100%" height={300}>

            <BarChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Legend />

                <Bar
                    dataKey="value"
                    name="Applications"
                    fill="#3B82F6"
                    radius={[6, 6, 0, 0]}
                />

            </BarChart>

        </ResponsiveContainer>

    </div>

</div>

            {/* Recent Applications Section */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
                <h2 className="text-lg font-bold text-gray-800">
                    Recent Applications
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Your latest 5 job applications.
                </p>
            </div>

            <Link
                to="/applications"
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
            >
                View All Applications →
            </Link>

        </div>

    {loading ? (
        <div className="flex flex-col items-center justify-center py-10">

            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

            <p className="mt-4 text-gray-500 text-sm">
                Loading applications...
            </p>

        </div>
    ) : error ? (
        <div className="text-center py-10">

                <p className="text-red-600 mb-4">
                    {error}
                </p>

                <button
                    onClick={fetchApplications}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Try Again
                </button>

        </div>

    ) : applications.length === 0 ? (
        <p className="text-gray-500 text-center py-6">
            No job applications yet. Add your first application to get started.
        </p>
    ) : (
        <div className="overflow-x-auto">

            <table className="w-full min-w-[600px]">

                <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-gray-600 text-sm">
                        <th className="py-4 px-4 text-left font-semibold whitespace-nowrap">Company</th>
                        <th className="py-3 px-4 text-left font-semibold whitespace-nowrap">Position</th>
                        <th className="py-3 px-4 text-left font-semibold whitespace-nowrap">Location</th>
                        <th className="py-3 px-4 text-left font-semibold whitespace-nowrap">Applied Date</th>
                        <th className="py-3 px-4 text-left font-semibold whitespace-nowrap">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {recentApplications.map((application) => (
                        <tr
                            key={application._id}
                            className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-200"
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
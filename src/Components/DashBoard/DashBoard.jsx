import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { User, Book, RefreshCw } from "lucide-react";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // Pie Chart Data
  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["#4C51BF", "#00B5D8"],
      },
    ],
  };

  // Sample Data
  const overdueBorrowers = [
    { name: "Sasmith Gunasekara", borrowedId: "10" },
    { name: "John Doe", borrowedId: "20" },
    { name: "Jane Smith", borrowedId: "30" },
    { name: "David Lee", borrowedId: "40" },
  ];

  const bookWormAdmins = [
    { name: "Nisal Gunasekara", adminId: "1", status: "Active" },
    { name: "Alice Johnson", adminId: "2", status: "Inactive" },
    { name: "Bob Smith", adminId: "3", status: "Active" },
  ];

  const statistics = [
    { icon: User, count: "150", text: "Total User Base" },
    { icon: Book, count: "1500", text: "Total Book Count" },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-purple-600 to-blue-500 min-h-screen py-40">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Left - Pie Chart */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-md">
          <Pie data={data} />
          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-indigo-600 rounded-full mr-2"></div>
              <span className="text-white">Total Borrowed Books</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-cyan-500 rounded-full mr-2"></div>
              <span className="text-white">Total Returned Books</span>
            </div>
          </div>
        </div>

        {/* Middle - Stats */}
        <div className="flex flex-col space-y-4 text-white">
          {statistics.map((stat, index) => (
            <div key={index} className="flex items-center bg-white/10 p-4 rounded-lg shadow-md">
              <stat.icon className="w-6 h-6 text-yellow-300 mr-4" />
              <div>
                <p className="text-lg font-bold">{stat.count}</p>
                <p className="text-gray-300">{stat.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Borrowers & Admins */}
        <div className="flex flex-col space-y-4">
          {/* Overdue Borrowers */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg text-gray-100 mb-2">Overdue Borrowers</h3>
            {overdueBorrowers.map((borrower, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-200 p-2 rounded-md mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{borrower.name}</p>
                  <p className="text-sm text-gray-600">Borrowed ID: {borrower.borrowedId}</p>
                </div>
                <RefreshCw className="w-5 h-5 text-gray-700 cursor-pointer" />
              </div>
            ))}
          </div>

          {/* BookWorm Admins */}
          <div className="mt-6 bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg text-gray-100 mb-2">BookWorm Admins</h3>
            {bookWormAdmins.map((admin, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-200 p-2 rounded-md mb-2">
                <div>
                  <p className="font-semibold text-gray-900">{admin.name}</p>
                  <p className="text-sm text-gray-600">Admin ID: {admin.adminId}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`${admin.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                    {admin.status}
                  </span>
                  <RefreshCw className="w-5 h-5 text-gray-700 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

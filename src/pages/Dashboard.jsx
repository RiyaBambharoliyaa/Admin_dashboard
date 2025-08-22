import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  // Dummy data for chart
  const data = [
    { name: "Users", value: 400 },
    { name: "Orders", value: 300 },
    { name: "Revenue", value: 300 },
    { name: "Products", value: 200 },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6">📊 Dashboard Overview</h2>
      <p className="text-gray-600 mb-10">
        Welcome to the admin dashboard. Here you can track key metrics and stats.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">👥 Total Users</h3>
          <p className="text-2xl font-bold text-blue-600">1,245</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">🛒 Total Orders</h3>
          <p className="text-2xl font-bold text-green-600">530</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">💰 Revenue</h3>
          <p className="text-2xl font-bold text-yellow-600">$12,400</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">📦 Products</h3>
          <p className="text-2xl font-bold text-red-600">320</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Data Distribution</h3>
        <div className="w-full h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

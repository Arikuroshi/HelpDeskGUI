import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800">
        Kantan Help Dashboard
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Tickets</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Open Tickets</h3>
          <p className="text-2xl font-bold">45</p>
        </div>
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold">Resolved Tickets</h3>
          <p className="text-2xl font-bold">75</p>
        </div>
      </div>
      <div className="mt-8">
        <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          Create New Ticket
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

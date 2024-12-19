import React, { useState } from "react";

interface Request {
  id: number;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  reason: string;
}

const FormsPage: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      type: "Leave request",
      status: "Approved",
      startDate: "2024-06-10",
      endDate: "2024-06-12",
      reason: "Family trip",
    },
    {
      id: 2,
      type: "Shift change form",
      status: "Pending",
      startDate: "2024-06-15",
      endDate: "2024-06-16",
      reason: "Need to attend event",
    },
  ]);

  const [newForm, setNewForm] = useState({
    type: "Leave request",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: Request = {
      id: requests.length + 1,
      type: newForm.type,
      status: "Pending",
      startDate: newForm.startDate,
      endDate: newForm.endDate,
      reason: newForm.reason,
    };
    setRequests([...requests, newRequest]);
    setNewForm({ type: "Leave request", startDate: "", endDate: "", reason: "" });
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="flex items-center space-x-3">
          <h3 className="text-yellow-400 text-2xl font-semibold">
            Request Form
          </h3>
          <div className="h-1 w-60 bg-yellow-400"></div>
      </div>

      {/* History Section */}
      <div className="mb-8 bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-yellow-300">Request History</h2>
        <table className="w-full text-left rounded-lg">
          <thead>
            <tr className="text-yellow-400 border-b border-gray-700">
              <th className="p-2">Type</th>
              <th className="p-2">Status</th>
              <th className="p-2">Start Date</th>
              <th className="p-2">End Date</th>
              <th className="p-2">Reason</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-700">
                <td className="p-2 text-white">{request.type}</td>
                <td className="p-2">
                  {request.status === "Approved" ? (
                    <span className="text-green-400 font-semibold">{request.status}</span>
                  ) : request.status === "Pending" ? (
                    <span className="text-yellow-400 font-semibold">{request.status}</span>
                  ) : (
                    <span className="text-red-400 font-semibold">{request.status}</span>
                  )}
                </td>
                <td className="p-2 text-white">{request.startDate}</td>
                <td className="p-2 text-white">{request.endDate}</td>
                <td className="p-2 text-white">{request.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-yellow-300">Create New Form</h2>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
          {/* Form Type */}
          <div className="col-span-2">
            <label className="block mb-2 text-gray-300">Form Type</label>
            <select
              value={newForm.type}
              onChange={(e) => setNewForm({ ...newForm, type: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none"
            >
              <option value="Leave request">Leave request</option>
              <option value="Shift change form">Shift change form</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block mb-2 text-gray-300">Start Date</label>
            <input
              type="date"
              value={newForm.startDate}
              onChange={(e) => setNewForm({ ...newForm, startDate: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block mb-2 text-gray-300">End Date</label>
            <input
              type="date"
              value={newForm.endDate}
              onChange={(e) => setNewForm({ ...newForm, endDate: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none"
            />
          </div>

          {/* Reason */}
          <div className="col-span-2">
            <label className="block mb-2 text-gray-300">Reason</label>
            <input
              type="text"
              value={newForm.reason}
              onChange={(e) => setNewForm({ ...newForm, reason: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-yellow-400 px-4 py-2 rounded text-gray-900 font-semibold hover:bg-yellow-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormsPage;

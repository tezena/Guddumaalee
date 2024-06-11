"use client";

import { useState } from "react";

// Mock data for disputes
const disputes = [
  {
    id: 1,
    clientName: "John Doe",
    clientId: "C123",
    summary: "Dispute about contract terms.",
    submissionDate: "2023-01-01",
    response: "Admin response goes here.",
    solved: false,
    resolution: null,
  },
  {
    id: 2,
    clientName: "Jane Smith",
    clientId: "C124",
    summary: "Dispute about service quality.",
    submissionDate: "2023-02-15",
    response: "Admin response goes here.",
    solved: true,
    resolution: "Issue resolved by renegotiation.",
  },
];

const Disputes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDispute, setNewDispute] = useState({
    clientName: "John Doe", // Preset for example
    clientId: "C123", // Preset for example
    summary: "",
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleChange = (e:any) =>
    setNewDispute({ ...newDispute, [e.target.name]: e.target.value });
  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(newDispute);
    handleCloseModal();
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen relative">
      <h1 className="text-3xl font-bold mb-6">Dispute Details</h1>
      <div className="bg-white p-8 rounded shadow mb-4 flex flex-col gap-4">
        <p>
          <strong>Client Name:</strong> {disputes[0].clientName}
        </p>
        <p>
          <strong>Client ID:</strong> {disputes[0].clientId}
        </p>
      </div>
      {disputes.map((dispute) => (
        <div
          key={dispute.id}
          className="border p-10 rounded mb-4 bg-gray-100 shadow flex flex-col gap-4"
        >
          <p>
            <strong>Summary:</strong> {dispute.summary}
          </p>
          <p>
            <strong>Submission Date:</strong> {dispute.submissionDate}
          </p>
          <p>
            <strong>Response:</strong> {dispute.response}
          </p>
          <p>
            <strong>Status:</strong> {dispute.solved ? "Solved" : "In Progress"}
          </p>
          {dispute.solved && (
            <p>
              <strong>Resolution:</strong> {dispute.resolution}
            </p>
          )}
        </div>
      ))}
      <button
        onClick={handleOpenModal}
        className="bg-[#8a43aa] text-white py-2 px-4 rounded shadow hover:bg-[#6b3286] transition duration-200 absolute top-8 right-4"
      >
        Submit New Dispute
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl mb-4 font-semibold">Submit New Dispute</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={newDispute.clientName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Client ID</label>
                <input
                  type="text"
                  name="clientId"
                  value={newDispute.clientId}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Summary</label>
                <textarea
                  name="summary"
                  value={newDispute.summary}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-[#7b7b7b] text-white py-2 px-4 rounded mr-2  hover:bg-[#414141]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#8b47aa] text-white py-2 px-4 rounded  hover:bg-[#6b3286]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Disputes;

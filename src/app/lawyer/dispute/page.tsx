"use client"

import React, { useState, useEffect } from 'react';

type DisputeFormData = {
  title: string;
  description: string;
  category: string;
  clientName: string;
  clientContact: string;
  lawyerName: string;
  lawyerContact: string;
  evidence: FileList | null;
};

const DisputePage: React.FC = () => {
  const [formData, setFormData] = useState<DisputeFormData>({
    title: '',
    description: '',
    category: '',
    clientName: '',
    clientContact: '',
    lawyerName: '',
    lawyerContact: '',
    evidence: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DisputeFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files : null
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof DisputeFormData, string>> = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.clientName) newErrors.clientName = 'Client name is required';
    if (!formData.clientContact) newErrors.clientContact = 'Client contact is required';
    if (!formData.lawyerName) newErrors.lawyerName = 'Lawyer name is required';
    if (!formData.lawyerContact) newErrors.lawyerContact = 'Lawyer contact is required';
    if (!formData.evidence) newErrors.evidence = 'Evidence is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
      // Handle form submission logic here
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Submit a Dispute</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium" htmlFor="title">Dispute Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.description && <p className="text-red-500 mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="Contract">Contract</option>
              <option value="Family">Family</option>
              <option value="Criminal">Criminal</option>
              <option value="Others">Others</option>
            </select>
            {errors.category && <p className="text-red-500 mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium" htmlFor="clientName">Client Name</label>
            <input
              id="clientName"
              name="clientName"
              type="text"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.clientName && <p className="text-red-500 mt-1">{errors.clientName}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium" htmlFor="clientContact">Client Contact</label>
            <input
              id="clientContact"
              name="clientContact"
              type="text"
              value={formData.clientContact}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.clientContact && <p className="text-red-500 mt-1">{errors.clientContact}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium" htmlFor="lawyerName">Lawyer Name</label>
            <input
              id="lawyerName"
              name="lawyerName"
              type="text"
              value={formData.lawyerName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.lawyerName && <p className="text-red-500 mt-1">{errors.lawyerName}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium" htmlFor="lawyerContact">Lawyer Contact</label>
            <input
              id="lawyerContact"
              name="lawyerContact"
              type="text"
              value={formData.lawyerContact}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.lawyerContact && <p className="text-red-500 mt-1">{errors.lawyerContact}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium" htmlFor="evidence">Upload Evidence</label>
            <input
              id="evidence"
              name="evidence"
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.evidence && <p className="text-red-500 mt-1">{errors.evidence}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Submit Dispute
          </button>
        </form>
      </div>
    </div>
  );
};

export default DisputePage;

"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type DisputeFormData = {
  title: string;
  description: string;
  category: string;
  customCategory: string;
  clientName: string;
  clientContact: string;
  lawyerName: string;
  lawyerContact: string;
  evidence: FileList | null;
};

const DisputePage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<DisputeFormData>({
    title: '',
    description: '',
    category: '',
    customCategory: '',
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
    if (formData.category === 'Others' && !formData.customCategory) newErrors.customCategory = 'Custom category is required';
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
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-[#7B3B99] text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Back
        </button>
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

          {formData.category === 'Others' && (
            <div>
              <label className="block mb-2 font-medium" htmlFor="customCategory">Custom Category</label>
              <input
                id="customCategory"
                name="customCategory"
                type="text"
                value={formData.customCategory}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              />
              {errors.customCategory && <p className="text-red-500 mt-1">{errors.customCategory}</p>}
            </div>
          )}

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
            className="w-full bg-[#7B3B99] hover:bg-purple-700 text-white py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          >
            Submit Dispute
          </button>
        </form>
      </div>
    </div>
  );
};

export default DisputePage;

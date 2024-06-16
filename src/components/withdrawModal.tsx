import React from 'react'

function withdrawModal() {
   
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded shadow-lg w-1/3">
      <h2 className="text-xl mb-4 font-semibold">Submit New Dispute</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Client ID</label>
          <input
            type="number"
            name="clientId"
            value={id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="content"
            value={newDispute.content}
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
  )
}

export default withdrawModal
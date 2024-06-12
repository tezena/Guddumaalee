// reviewData.ts
export const reviewData = [
    {
      id: 1,
      lawyerId: 1,
      clientName: "John Doe",
      rating: 4,
      comment: "Great lawyer, very knowledgeable and helpful."
    },
    {
      id: 2,
      lawyerId: 1,
      clientName: "Jane Smith",
      rating: 5,
      comment: "Highly recommend! Excellent service."
    },
    {
      id: 3,
      lawyerId: 2,
      clientName: "John Doe",
      rating: 4,
      comment: "Great lawyer, very knowledgeable and helpful."
    },
    {
      id: 4,
      lawyerId: 3,
      clientName: "Jane Smith",
      rating: 5,
      comment: "Highly recommend! Excellent service."
    },
   
  ];

  export type Review  =  typeof reviewData
  
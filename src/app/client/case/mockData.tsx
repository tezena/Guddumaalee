export interface Case {
  id: number;
  title: string;
  description: string;
  date: string;
  price: string;
  lawyer: string;
  trials: number;
}

export const cases = {
  currentCase: {
    id: 1,
    title: "Current Case: Lorem Ipsum",
    description: "This is the description of the current case.",
    date: "2024-06-15",
    price: "$10,000",
    lawyer: "John Doe",
    trials: 3
  },
  recentCases: [
    {
      id: 2,
      title: "Recent Case 1: Dolor Sit Amet",
      description: "This is the description of a recent case.",
      date: "2024-05-10",
      price: "$8,500",
      lawyer: "Jane Smith",
      trials: 2
    },
    {
      id: 3,
      title: "Recent Case 2: Consectetur Adipiscing",
      description: "This is the description of another recent case.",
      date: "2024-04-22",
      price: "$9,200",
      lawyer: "Emily Johnson",
      trials: 1
    }
  ]
};

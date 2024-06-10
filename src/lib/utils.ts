import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-") // replaces all spaces with hyphens.
    .replace(/[^\w-]+/g, "") // remove all characters that are not letters, numbers, or hyphens.
    .replace(/--+/g, "-"); // collapses any consecutive hyphens into a single hyphen.
}

export function isMacOs() {
  if (typeof window === "undefined") return false;

  return window.navigator.userAgent.includes("Mac");
}

export async function saveOnlocalStorage(data: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("idSre", data.student.id);
    localStorage.setItem("phone_noSre", data.student.phone_number);
  }
}

export async function getFromLocalStorage() {
  let phoneNo = typeof window !== "undefined" ? localStorage.getItem("id") : "";
  return phoneNo;
}

export const getDate = () => {
  const today = new Date();
  console.log(today.getDate());

  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
    0,
    0,
    0
  );

  return { today, startOfDay, endOfDay };
};

export function removeOneOccurrence(arr: any, element: any) {
  const index = arr.indexOf(element);

  if (index !== -1) {
    arr.splice(index, 1);
  }

  return arr;
}

export function countDuplicates(arr: any, element: any) {
  let count = 0;

  for (const item of arr) {
    if (item === element) {
      count++;
    }
  }

  return count;
}

export function calculateTotalPrice(data: any) {
  let totalPrice = 0;

  // Iterate through each item in the object
  for (const id in data) {
    if (data.hasOwnProperty(id)) {
      const item = data[id];
      totalPrice += item.count * item.price;
    }
  }

  return totalPrice;
}

export function reformatObject(data: any) {
  const reformattedArray = [];

  // Iterate through each item in the object
  for (const id in data) {
    if (data.hasOwnProperty(id)) {
      const item = data[id];
      const totalPrice = item.count * item.price;
      const name = item.name;

      // Create a new object with the desired format
      const newItem = {
        price_id: parseInt(id),
        quantity: item.count,
        price: totalPrice,
        name,
      };

      reformattedArray.push(newItem);
    }
  }

  return reformattedArray;
}

export const lawyerSpecialties = [
  {
    id: "1",
    specialty: "Corporate Law",
  },
  {
    id: "2",
    specialty: "Criminal Law",
  },
  {
    id: "3",
    specialty: "Family Law",
  },
  {
    id: "4",
    specialty: "Intellectual Property Law",
  },
  {
    id: "5",
    specialty: "Employment Law",
  },
  {
    id: "6",
    specialty: "Immigration Law",
  },
  {
    id: "7",
    specialty: "Real Estate Law",
  },
  {
    id: "8",
    specialty: "Environmental Law",
  },
  {
    id: "9",
    specialty: "Tax Law",
  },
  {
    id: "10",
    specialty: "Bankruptcy Law",
  },
];

export const languages = [
  {
    id: "1",
    language: "Amharic",
  },
  {
    id: "2",
    language: "Oromo",
  },
  {
    id: "3",
    language: "Tigrinya",
  },
  {
    id: "4",
    language: "Somali",
  },
  {
    id: "5",
    language: "Sidamo",
  },
  {
    id: "6",
    language: "Wolaytta",
  },
  {
    id: "7",
    language: "Gurage",
  },
  {
    id: "8",
    language: "Afar",
  },
  {
    id: "9",
    language: "Hadiyya",
  },
  {
    id: "10",
    language: "Gamo",
  },
];

export const courts = [
  { id: "1", label: "Supreme Court" },
  { id: "2", label: "Appellate Court" },
  { id: "3", label: "High Court" },
  { id: "4", label: "District Court" },
  { id: "9", label: "Small Claims Court" },
  { id: "10", label: "Administrative Court" },
];

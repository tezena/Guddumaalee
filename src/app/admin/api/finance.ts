import axios from "axios";

export async function getTransaction() {
  try {
    const response = await axios.get("http://localhost:3000/api/transaction");
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log('this is from finance',data);

    return data.data.transactionHistory;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}
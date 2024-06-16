import axios from 'axios';

export async function withdraw(amount: number) {
  try {
  const response = await axios.post(
  "http://localhost:3000/api/transaction/withdraw",
  JSON.stringify({ amount: amount }),
  );
  if (response.status < 200 || response.status >= 300) {
  throw new Error(` ${response.statusText}`);
  }
  console.log(response);
  return response.data; // Return response data if needed
  } catch (err) {
  console.error(err);
  throw err;
  }
  }

export async function getwithdraw() {
    try {
      const response = await axios.get("http://localhost:3000/api/transaction/withdraw");
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = response;
      console.log(data);
  
      return data.data.trials;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }
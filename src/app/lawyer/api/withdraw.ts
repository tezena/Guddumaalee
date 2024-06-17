import axios from 'axios';

export async function withdraw(amount: number) {
  try {
  const response = await axios.post(
  "/api/transaction/withdraw",
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
      const response = await axios.get("/api/transaction/withdraw/admin");
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = response;
      console.log(data);
  
      return data.data.withdrawalRequests;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }
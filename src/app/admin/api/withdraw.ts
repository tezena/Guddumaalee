import axios from "axios";

export async function getWithdraw() {
  try {
    const response = await axios.get(
      "/api/transaction/withdraw/admin"
    );
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log("this is from withdraw", data);

    return data.data;
  } catch (err) {
    console.error(err);
    throw err; 
  }
}

export async function pay(withdrawRequestId: number) {
  if (!withdrawRequestId) {
    throw new Error("Invalid withdraw request ID");
  }

  const payload = { withdrawRequestId }; 

  try {
    const response = await axios.post(
      "/api/transaction/withdraw/admin/pay",
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }

    console.log(response);
    return response.data; // Return response data if needed
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

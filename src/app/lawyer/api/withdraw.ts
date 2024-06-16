import axios from "axios";

export async function withdraw(data: number) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/",
      data
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }
    console.log(response);
    return response.data; // Return response data if needed
  } catch (err) {
    console.error(err);
    throw err;
  }
}
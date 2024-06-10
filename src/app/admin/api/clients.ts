import axios from "axios";

export async function getClients() {
  try {
    const response = await axios.get("http://localhost:3000/api/clients");
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log(data.data.clients);

    return data.data;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

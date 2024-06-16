import axios from "axios";

export async function getClientCaeses(id: number) {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/case/client/${id}`
      );
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = response;
      console.log(data);
  
      return data.data.cases;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }
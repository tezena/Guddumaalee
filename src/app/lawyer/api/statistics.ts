import axios from "axios";

export async function getStatistics() {
    try {
      const response = await axios.get("");
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = response;
      console.log(data);
  
      return data.data;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }
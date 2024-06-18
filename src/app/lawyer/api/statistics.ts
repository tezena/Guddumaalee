import axios from "axios";

export async function getStatistics() {
    try {
      const response = await axios.get("/api/dashboard/lawyer");
      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = response;
      console.log('from lawyer stat',data);
  
      return data.data.analytics;
    } catch (err) {
      console.error(err);
      throw err; // Ensure errors are propagated correctly
    }
  }
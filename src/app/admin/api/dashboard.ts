import axios from "axios";

export async function getCaseData() {
  try {
    const response = await axios.get("/api/dashboard/admin/cases");
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log('from dashboard ',data);

    return data.data.analytics;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

export async function getLawyerData() {
  try {
    const response = await axios.get("/api/dashboard/admin/lawyers");
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log('from dashboard lawyer',data);

    return data.data.analytics;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}


export async function getClientData() {
  try {
    const response = await axios.get("/api/dashboard/admin/clients");
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log('from dashboard client',data);

    return data.data.analytics;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}



export async function getAdminBalance() {
 
  try {
    const response = await axios.get(`/api/dashboard/admin/balance`);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log('this is from admin balance',data);

    return data.data.earning;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }

  
}
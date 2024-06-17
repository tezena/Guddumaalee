import axios from "axios";

export async function createOffer(data: object) {
  try {
    const response = await axios.post("/api/case", data);
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

export async function deliver(id: number) {
  try {
    const response = await axios.post(
      `/api/case/${id}/deliver`
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


export async function accept(id: number) {
  try {
    const response = await axios.post(
      `/api/case/${id}/accept`
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

export async function getLawyerCaeses(id: number) {
  try {
    const response = await axios.get(
      `/api/case/lawyer/${id}`
    );
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log('this is from lawyer case',data);

    return data.data.cases;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

export async function getCaesesById(id: number) {
  try {
    console.log(id);
    
    const response = await axios.get(
      `/api/case/${id}`
    );
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log('this is from case by id',data);

    return data.data.caseById;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

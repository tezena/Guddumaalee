import { postData } from "@/app/chat2/components/action";
import axios from "axios";

export async function createOffer(data: object) {
  try {
    const response = await axios.post("/api/case", data);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const newCase = response.data.newCase;

    const offerData = {
      recipient_id: newCase.client_id,
      message: newCase.id + "",
      messageType: "offer",
    };
    postData(undefined, offerData);
    return response.data; // Return response data if needed
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function deliver(id: number) {
  try {
    const response = await axios.post(`/api/case/${id}/deliver`);
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

export async function acceptDelivery(id: number) {
  try {
    const response = await axios.post(`/api/case/${id}/accept-delivery`);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.data; // Return response data if needed
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function acceptOffer(id: number) {
  try {
    const response = await axios.post(`/api/case/${id}/accept`);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.data; // Return response data if needed
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function rejectOffer(id: number) {
  try {
    const response = await axios.post(`/api/case/${id}/reject`);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.data; // Return response data if needed
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getLawyerCaeses(id: number) {
  try {
    const response = await axios.get(`/api/case/lawyer/${id}`);
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;

    return data.data.cases;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

export async function getCaesesById(id: number) {
  try {
    const response = await axios.get(`/api/case/${id}`);
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    return data.data.caseById;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

export async function getClientCaseById(id: number) {
  try {
    const response = await axios.get(`/api/case/client/${id}`);
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;

    return data.data;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

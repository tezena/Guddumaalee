import axios from "axios";

export async function getFaqs() {
  try {
    const response = await axios.get("/api/faq");
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log(data);

    return data.data.faqs;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

export async function answerFaq(id: number, reply: String) {
  try {
    const response = await axios.put(
      `/api/faq/${id}`,
      JSON.stringify({ reply })
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }

    console.log(response);
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

export async function askFaq(question: String) {
  try {
    const response = await axios.post(`/api/faq`, JSON.stringify({ question }));
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }
    console.log(response);
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

export async function getAnsweredFaqs() {
  try {
    const response = await axios.get(`/api/faq/answered`);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }

    console.log(response);
    return response.data.faqs;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

// async function getData() {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer ....",
//       },
//     };

//     const response = fetch(
//       "http://localhost:3000/api/lawyers",
//       options
//     )
//       .then((response) => response.json())
//       .catch((err) => console.error(err));

//     return response;
//   }

//   export default async function getLawyers() {
//     const data = await getData();
//     return data;
//   }

import axios from "axios";
async function getData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer ....",
    },
  };

  const response = fetch("http://localhost:3000/api/lawyers/verified", options)
    .then((response) => {
      console.log(response);

      response.json();
    })
    .catch((err) => console.error(err));

  return response;
}

export async function getNewLawyers() {
  try {
    const response = await axios.get("http://localhost:3000/api/lawyers");
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

export async function getVerifiedLawyers() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/lawyers/verified"
    );
    if (response.status !== 200) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log("this is from verifyd lawyers...", data);

    return data.data.lawyers;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }
}

export async function getLawyerById(id: any) {
 
  try {
    const response = await axios.get(`http://localhost:3000/api/lawyers/${id}`);
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = response;
    console.log(data);

    return data.data.user;
  } catch (err) {
    console.error(err);
    throw err; // Ensure errors are propagated correctly
  }

  
}

export async function verifyLawyer(id: any) {
  axios
    .put(`http://localhost:3000/api/lawyers/${id}/verify`)
    .then((res: any) => {
      console.log(res);

      return res;
    })
    .catch((err: any) => {
      console.log(err);

      return err;
    });
}

export function rejectLawyer(id: any) {
  axios
    .put(`http://localhost:3000/api/lawyers/${id}/reject`)
    .then((res: any) => {
      console.log(res);

      return res;
    })
    .catch((err: any) => {
      console.log(err);

      return err;
    });
}


export const authToken:string =process.env.NEXT_PUBLIC_VIDEO_AUTH_KEY


export const createMeeting = async ({ token }: { token: string }) => {
  console.log(authToken)
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId }: { roomId: string } = await res.json();
  return roomId;
};
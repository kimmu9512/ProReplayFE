import { auth, getFirebaseAuth } from "./firebase/firebase";

interface Summoner {
  summonerName: string;
  region: string;
}
interface User {
  idToken: string;
  displayName: string;
  email: string;
}
const registerBackend = async ({
  idToken,
  displayName,
  email,
}: User): Promise<boolean> => {
  const domain: string | undefined = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
  const path: string | undefined = process.env.NEXT_PUBLIC_REGISTER_PATH;
  if (!domain || !path) {
    console.error("Missing environment variable");
    return false;
  }
  const userData = {
    displayName,
    email,
  };
  try {
    const response = await fetch(`${domain}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken, userData }),
    });
    if (response.ok) {
      return true;
    } else {
      console.error("Failed to register: ", await response.text());
      return false;
    }
    console.log("Success in register to backend the response is: ");
    console.log(response);
  } catch (error) {
    console.log("Failure to register to backend the error is:");
    console.error(error);
    return false;
  }
};
const subscribeToSummoner = async ({
  summonerName,
  region,
}: Summoner): Promise<boolean> => {
  const domain: string | undefined = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
  const path: string | undefined = process.env.NEXT_PUBLIC_SUBSCRIBE_PATH;
  if (!domain || !path) {
    console.error("Missing environment variable");
    return false;
  }
  const user = auth.currentUser;
  if (!user) {
    return false;
  }
  const token = await user.getIdToken();
  try {
    alert(`${domain}${path}`);
    alert(`Summoner name is : ${summonerName}, and region is : ${region}`);
    alert(`Stringified body is : ${JSON.stringify({ summonerName, region })}`);
    alert(`Token is : ${token}`);
    const response = await fetch(`${domain}${path}`, {
      method: "POST",
      body: JSON.stringify({ summonerName, region }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      alert("Subscribed!");
      return true;
    } else {
      console.error("Failed to subscribe: ", await response.text());
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
const getSummoner = async (
  summonerName: string,
  region: string
): Promise<any> => {
  const domain: string | undefined = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
  const path: string | undefined = process.env.NEXT_PUBLIC_GET_SUMMONER_PATH;

  if (!domain || !path) {
    console.error("Missing environment variable");
    return false;
  }

  try {
    console.log(`${domain}${path}${region}/${summonerName}`);
    const response = await fetch(`${domain}${path}${region}/${summonerName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.error("Failed to retrieve summoner: ", data);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { subscribeToSummoner, registerBackend, getSummoner };

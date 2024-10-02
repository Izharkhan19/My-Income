import * as React from "react";
import axios from "axios";
import { basepath } from "../../../Services/Basepath";

const AdobeFile = () => {
  const [data, setData] = React.useState();

  const CLIENT_ID = "ats-75bad9d1-3b4a-4b31-8865-8612d5ac1247";
  // const glitch_URL = "https://melodic-faint-custard.glitch.me";
  const glitch_URL = "https://my-income-ui.vercel.app/adobefile";

  const getAccessToken = async (authCode) => {
    const authUrl = `${basepath.base_URL}api/v1/get-access-token`;

    try {
      const response = await axios.post(
        authUrl,
        { code: authCode },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("Access Token Response:", response.data); // Access token from backend
      return response;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  // UseEffect to handle the OAuth flow
  React.useEffect(() => {
    const fetchAccessToken = async () => {
      const urlSearchString = window.location.search;
      const params = new URLSearchParams(urlSearchString);
      const authCode = params.get("code");

      if (authCode) {
        const response = await getAccessToken(authCode); // Fetch access token using the auth code
        response;
        setData(response?.data?.access_token);

        console.log("Access Token Data:", response);
      }
    };

    fetchAccessToken();
  }, []);

  // Function to generate Adobe Sign authorization URL
  const getAuthUrl = () => {
    return `https://secure.in1.adobesign.com/public/oauth/v2?redirect_uri=${glitch_URL}&response_type=code&client_id=${CLIENT_ID}&scope=user_login:self+agreement_write:account`;
  };

  // Handle URL redirection to start the OAuth process
  const handleUrl = () => {
    const authUrl = getAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <>
      <div className="instructions">
        Hello Izhar
        <div dangerouslySetInnerHTML={{ __html: data }} />
        <button onClick={() => handleUrl()}>Open</button>
      </div>
    </>
  );
};

export default AdobeFile;

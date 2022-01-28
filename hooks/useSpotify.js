import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
//import SpotifyAPI from "../lib/spotify";

const SpotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      //console.log("yaser");
      //console.log(session.user);

      SpotifyAPI.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return SpotifyAPI;
}

export default useSpotify;

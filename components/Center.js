import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import Songs from "./Songs";

import { signOut } from "next-auth/react";

function Center() {
  const spotifyApi = useSpotify();

  const { data: session, status } = useSession();
  const [color, SetColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    setActive(!isActive);
  };
  const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
  ];

  useEffect(() => {
    SetColor(shuffle(colors).pop());
    console.log(playlistId);
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong!", err));
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide ">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => {
            signOut();
          }}
          className="flex items-center bg-black space-x-3
        opacity-90 hover:opacity-80 cursor-pointer
         rounded-full p-1 pr-2 text-white "
        >
          <img
            src={session?.user?.image}
            className="rounded-full w-10 h-10"
            alt=""
          />
          <h2 className="cursor-pointer">{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={` flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 
        text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt=""
          className="h-44 w-44 shadow-2xl"
        />
        <div>
          <p>PLAYSLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;

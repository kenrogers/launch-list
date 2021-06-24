import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

import Rocket from "../components/Rocket";
import RocketImage from "../components/RocketImage";
import Launchpad from "../components/Launchpad";

export default function Home() {
  const [launches, setLaunches] = useState([]);

  useEffect(async () => {
    const launchList = await axios.get(
      "https://api.spacexdata.com/v4/launches/upcoming"
    );
    setLaunches(launchList.data);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      {launches ? (
        <>
          <Head>
            <title>Launch List</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="flex flex-col items-center justify-center w-full flex-1 sm:px-10 md:px-20 text-center py-10">
            <h1 className="text-6xl font-bold">Launch List</h1>

            <h2 className="text-4xl font-bold mt-4">
              Upcoming SpaceX launches:
            </h2>
            <div className="flex w-full flex-wrap">
              {launches.map((launch) => {
                return (
                  <div
                    className="sm:w-full md:w-1/2 lg:w-1/3 flex-grow text-left bg-gray-100 shadow-lg rounded-lg m-5"
                    key={launch.name}
                  >
                    <RocketImage id={launch.rocket} />
                    <div className="p-8">
                      <h2 className="text-gray-800 text-3xl font-semibold">
                        {launch.name}
                      </h2>
                      <p className="text-xl mt-2 text-gray-600">
                        {format(new Date(launch.date_local), "MMMM d, yyy")}
                      </p>
                      <p className="text-xl mt-2 text-gray-600">
                        Rocket: <Rocket id={launch.rocket} />
                      </p>
                      <p className="text-xl mt-2 text-gray-600">
                        Launchpad: <Launchpad id={launch.launchpad} />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

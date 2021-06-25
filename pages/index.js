import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

import Rocket from "../components/Rocket";
import RocketImage from "../components/RocketImage";
import Launchpad from "../components/Launchpad";

export default function Home() {
  const [launches, setLaunches] = useState([]);
  const [timezones, setTimezones] = useState({});

  useEffect(async () => {
    const params = {
      query: {
        upcoming: true,
      },
      options: {
        populate: ["launchpad"],
        pagination: false,
      },
    };
    const launchList = await axios.post(
      "https://api.spacexdata.com/v4/launches/query",
      params
    );

    setLaunches(launchList.data.docs);

    // Create a unique array of timezones
    const timezoneList = [];
    launchList.data.docs.forEach((launch) => {
      timezoneList.push(launch.launchpad.timezone);
    });

    setTimezones([...new Set(timezoneList)]);
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
              Upcoming SpaceX launches by timezone:
            </h2>
            {timezones.length > 0
              ? timezones.map((timezone) => {
                  return (
                    <div key={timezone} className="text-left mb-8">
                      <h3 className="text-2xl m-4">{timezone}</h3>
                      <div className="flex w-full flex-wrap">
                        {launches.map((launch) => {
                          if (launch.launchpad.timezone === timezone)
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
                                    {format(
                                      new Date(launch.date_local),
                                      "MMMM d, yyy"
                                    )}
                                  </p>
                                  <p className="text-xl mt-2 text-gray-600">
                                    Rocket: <Rocket id={launch.rocket} />
                                  </p>
                                  <p className="text-xl mt-2 text-gray-600">
                                    Launchpad:{" "}
                                    <Launchpad id={launch.launchpad.id} />
                                  </p>
                                </div>
                              </div>
                            );
                        })}
                      </div>
                    </div>
                  );
                })
              : "Loading..."}
          </main>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

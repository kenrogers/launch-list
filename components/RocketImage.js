import { useState, useEffect } from "react";
import axios from "axios";

export default function RocketImage({ id }) {
  const [rocket, setRocket] = useState({});

  useEffect(async () => {
    const rocketData = await axios(
      `https://api.spacexdata.com/v4/rockets/${id}`
    );
    setRocket(rocketData.data);
    console.log(rocketData.data.flickr_images[0]);
  }, []);

  return rocket.flickr_images ? (
    <img src={rocket.flickr_images[0]} className="w-full rounded-t-lg" />
  ) : (
    ""
  );
}

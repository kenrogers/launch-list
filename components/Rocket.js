import { useState, useEffect } from "react";
import axios from "axios";

export default function Rocket({ id }) {
  const [rocket, setRocket] = useState({});

  useEffect(async () => {
    const rocketData = await axios(
      `https://api.spacexdata.com/v4/rockets/${id}`
    );
    setRocket(rocketData.data);
  }, []);

  return (
    <a
      target="_blank"
      href={rocket.wikipedia}
      className="text-blue-700 hover:text-blue-500"
    >
      <span>{rocket.name}</span>
    </a>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";

export default function Launchpad({ id }) {
  const [launchpad, setLaunchpad] = useState({});

  useEffect(async () => {
    const launchpadData = await axios(
      `https://api.spacexdata.com/v4/launchpads/${id}`
    );
    setLaunchpad(launchpadData.data);
  }, []);

  return <span>{launchpad.name}</span>;
}

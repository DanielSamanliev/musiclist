import { useEffect, useState } from "react";

export const ServerCheck = () => {
  const [serverStatus, setServerStatus] = useState<string>();

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch("http://localhost:4000/health");
        if (res.ok) {
          setServerStatus("ok");
        } else {
          setServerStatus("error");
        }
      } catch (err) {
        setServerStatus("error");
      }
    };

    checkHealth();
  }, []);

  return <div>Server status: {serverStatus}</div>;
};

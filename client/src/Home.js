import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState(null);

  const authenticateUser = async () => {
    try {
      const res = await axios.get("/api/user");
      console.log(res);
      if (res) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const logout = async () => {
    try {
      const res = await axios.get("/api/logout");
      console.log(res);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {user && (
        <div>
          <h1>{user.email}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useEffect } from "react";
import { getProfileService } from "../services/auth.service";

const Home = () => {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    await getProfileService()
      .then((response) => {
        console.log("User fetched successfully:", response);
        setUser(response.user);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <div className="flex justify-center mt-10">
      {user ? (
        <div className="border  rounded-lg p-6 shadow-md min-w-[300px] bg-white dark:bg-gray-900 text-slate-900 dark:text-slate-100"> 
          <h2 className="text-2xl font-semibold mb-2">
            {user.firstName} {user.lastName}
          </h2>
          <p className="mb-1">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="mb-1">
            <span className="font-medium">Role:</span> {user.role}
          </p>
        </div>
      ) : (
        <div>Loading user...</div>
      )}
    </div>
  );
};

export default Home;

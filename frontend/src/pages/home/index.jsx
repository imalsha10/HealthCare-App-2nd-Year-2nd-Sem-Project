import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import Laboratory from "./Laboratory";

const Home = () => {
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));
  //
  return (
    <>
      <Laboratory />
    </>
  );
};

export default Home;

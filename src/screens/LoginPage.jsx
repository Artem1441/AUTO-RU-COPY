import React, { useEffect } from "react";
import { Header } from "../components/header/Header";
import { Login } from "../components/login/Login";
import { Navbar } from "../components/navbar/Navbar";

export const LoginPage = () => {
  useEffect(() => {
    document.title = `Войти в систему`;
  }, []);

  return (
    <div>
      <Header showAuth={false} />
      <Navbar showAuth={false}/>
      <Login />
    </div>
  );
};

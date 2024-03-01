import React from "react";
import tree from "../images/tree.jpg";
const AuthLayout = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: ` url(${tree})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;

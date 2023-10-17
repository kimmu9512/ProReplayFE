"use client";
import { useEffect, useState } from "react";
import { auth, getFirebaseAuth } from "./firebase";
import Login from "../../components/Login";

const withAuth = (Component) => {
  const auth = getFirebaseAuth();
  return function AuthComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      });
    }, []);

    return <Component isAuthenticated={isAuthenticated} {...props} />;
  };
};

export default withAuth;

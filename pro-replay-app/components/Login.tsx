"use client";
import React, { useState } from "react";
import { auth, getFirebaseAuth } from "../lib/firebase/firebase";
import { registerBackend } from "../lib/backEndService";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const auth = getFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (stayLoggedIn) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      await signInWithEmailAndPassword(auth, email, password);

      alert("Logged in successfully!");
      // Redirect or perform any other action after successful login.
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (stayLoggedIn) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      const idToken = await user?.getIdToken();
      // think of a UI for this
      const displayName = "TEST";
      alert("display Name is : " + displayName);
      const backEndResponse = await registerBackend({
        idToken: idToken || "",
        displayName: displayName,
        email: email,
      });
      alert("HANDLED REGISTER");

      // Redirect or perform any other action after successful login.
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      alert("Logged in with Google!");
      // Redirect or perform any other action after successful login.
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className=" flex items-center rounded-md justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="text-2xl justify-center font-bold mb-4 text-black">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={stayLoggedIn}
              onChange={() => setStayLoggedIn(!stayLoggedIn)}
              className="mr-2"
            />
            <label className="text-sm">Stay logged in</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 focus:ring-opacity-50"
          >
            Login with Google
          </button>
        </div>
        <div className="mt-4">
          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

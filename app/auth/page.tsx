"use client";

import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/firebase/config";

import { useRouter } from "next/navigation";

export default function AuthPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {

    try {

      if (isLogin) {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      } else {

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      }

      router.push("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Authentication Failed");

    }

  };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">

          {isLogin ? "Login" : "Sign Up"}

        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={handleAuth}
            className="w-full bg-white text-black py-3 rounded-xl font-bold"
          >

            {isLogin ? "Login" : "Create Account"}

          </button>

        </div>

        <p className="text-gray-400 text-center mt-6">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-white font-semibold"
          >

            {isLogin ? "Sign Up" : "Login"}

          </button>

        </p>

      </div>

    </div>

  );
}
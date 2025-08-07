"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erreur de connexion :", error.message);
    } else {
      console.log("Connecté avec succès !");
      window.location.href = "/"; // Redirection après logout
    }
  };

  return (
    <>
      <Header />
      <form className="w-90 mx-auto max-w-lg">
        {/* Email + Passwords */}
        <div className="w-full md:w-1/2 px-3">
          <label
            htmlFor="email"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="w-full px-3">
          <label
            htmlFor="password"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Mot de passe
          </label>
          <p className="text-gray-600 text-xs italic"></p>
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            className="border-2 m-5 p-3"
            type="submit"
          >
            Connexion
          </button>
          Pas de compte?
          <button className="border-2 m-5 p-3" type="submit">
            <Link href="/Register">Inscription</Link>
          </button>
        </div>
      </form>
    </>
  );
}

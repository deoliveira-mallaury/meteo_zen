"use client";
import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Login() {
  const [userInfo, setUserInfo] = useState({
    name: "", // Prénom
    lastname: "", // Nom
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userInfo);



    try {
      const response = await fetch("/api/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
        }),
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) throw new Error(result.error);

      alert("Connexion réussie !");
      console.log("Données enregistrées :", result);
    } catch (err) {
      console.log("Erreur : " + err.message);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="w-90 mx-auto max-w-lg">
        {/* Email + Passwords */}
        <div className="w-full md:w-1/2 px-3">
          <label
            htmlFor="email"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jane.doe@example.com"
            value={userInfo.email}
            onChange={handleChange}
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
          <p className="text-gray-600 text-xs italic">
          </p>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            value={userInfo.password}
            onChange={handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="flex justify-center">
          <button className="border-2 m-5 p-3" type="submit">
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

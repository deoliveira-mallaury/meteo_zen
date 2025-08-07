"use client";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

export default function Register() {
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
    
    if (userInfo.password !== userInfo.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    ;
    try {
      const response = await fetch("/api/Profils", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userInfo.name,
          lastname: userInfo.lastname,
          email: userInfo.email,
          password: userInfo.password,
          city: userInfo.city,
          zip: userInfo.zip,
        }),
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) throw new Error(result.error);
      
      alert("Inscription réussie !");
      console.log("Données enregistrées :", result);
    } catch (err) {
      console.log("Erreur : " + err.message);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="w-90 mx-auto max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              htmlFor="name"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Prénom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jane"
              value={userInfo.name}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              htmlFor="lastname"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Nom
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Doe"
              value={userInfo.lastname}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        {/* Email + Passwords */}
        <div className="flex flex-wrap -mx-3 mb-6">
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
              Make it as long and as crazy as you'd like
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
          <div className="w-full px-3">
            <label
              htmlFor="confirmPassword"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Confirmer mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="******************"
              value={userInfo.confirmPassword}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        {/* Ville + Code Postal */}
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              htmlFor="city"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Ville
            </label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Saint-Quentin"
              value={userInfo.city}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              htmlFor="zip"
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            >
              Code postal
            </label>
            <input
              id="zip"
              name="zip"
              type="text"
              placeholder="02100"
              value={userInfo.zip}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button className="border-2 m-5 p-3" type="submit">
            S'inscrire
          </button>
        </div>
      </form>
    </>
  );
}

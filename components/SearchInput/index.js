"use client";
import { useEffect, useState } from "react";
import CustomSearch from "./../CustomSearch/index";

const SearchInput = () => {
    const [search, setSearch] = useState("");
    const { searchVal, loading, error } = CustomSearch(search);
  return (
    <>
      <form className="flex flex-col flex-wrap justify-center h-[12vh]">
        <label className="w-1/2 text-center ml-[5rem]" htmlFor="city">
          Veuillez saisir votre code postal
        </label>
        <input
          type="text"
          name="city"
          id="city"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Saisir votre code postal"
          className="w-1/2 h-6 mt-4 ml-[5rem] p-2 rounded-[10px] border border-[#2c74b3] bg-[#fdf9f3]"
        />
        <button
          className="border-none bg-transparent w-15 mt-auto ml-[-5rem]"
          href="#"
        >
          <img
            className="w-20 ml-[3rem] mt-[-1.5rem]"
            src="./icons/search.svg"
            alt="search"
          />
        </button>
      </form>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul className="autoCompleteList bg-white border border-gray-300 rounded-md shadow-md w-full max-w-md mt-2">
        {searchVal.map((d, index) => (
          <li
            key={index}
            className="px-4 py-2 hover:bg-blue-100 text-center cursor-pointer transition-colors duration-200"
          >
            {d.nom}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchInput;

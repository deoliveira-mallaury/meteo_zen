"use client";
import { useState } from "react";
import CustomSearch from "../CustomSearch"; // hook renommé

const SearchInput = ({ onSelectCity }) => {
  const [search, setSearch] = useState("");
  const { searchVal, loading, error } = CustomSearch(search);
  const [showList, setShowList] = useState(true);
  console.log(searchVal);

  const handleClick = (d) => {
    setShowList(false); // cache la liste
    onSelectCity({
      nom: d.nom,
      code: d.code,
      lon: d.centre.coordinates[0],
      lat: d.centre.coordinates[1],
    });
  };
  return (
    <>
      <form
        className="flex flex-col w-full max-w-lg p-4 m-auto"
        onSubmit={handleClick}
      >
        <label
          className="text-center mb-2 font-semibold text-shadow-blue-200"
          htmlFor="city"
        >
          Veuillez saisir votre code postal
        </label>

        <div className="flex items-center w-full">
          <input
            type="text"
            name="city"
            id="city"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowList(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setSearch(""); 
                setShowList(false); 
              }, 200);
            }}
            placeholder="Saisir votre code postal"
            className="flex-grow h-12 p-2 rounded-l-[50px] outline-none text-black bg-[#fdf9f3] focus:bg-[#c7ede6]"
            aria-describedby="search-instructions"
            aria-required="true"
          />

          <button
            type="button"
            onClick={handleClick}
            className="h-12 flex items-center justify-center rounded-[50px] ml-[-5%] border-2 border-[#c7ede6] bg-[#2c74b3] text-white hover:bg-[#1a5a8f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2c74b3] focus:ring-offset-2"
            aria-label="Rechercher"
          >
            <img
              className="w-[70%]"
              src="./icons/search.svg"
              alt="Icône de loupe"
              // pour éviter la double lecture par les lecteurs d'écran.
              role="presentation"
            />
          </button>
        </div>

        <p id="search-instructions " className="sr-only">
          Veuillez entrer un code postal à cinq chiffres.
        </p>
      </form>
      {loading && <p>Chargement…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showList && (
        <ul className="autoCompleteList ...">
          {searchVal.map((d, index) => (
            <li
              onClick={() => handleClick(d)}
              key={index}
              className="cursor-pointer text-center"
            >
              {d.nom}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchInput;

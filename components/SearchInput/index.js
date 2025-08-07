"use client";
import { useState } from "react";
import useCustomSearch from "../CustomSearch"; // hook renommé

const SearchInput = ({ onSelectCity }) => {
  const [search, setSearch] = useState("");
  const { searchVal, loading, error } = useCustomSearch(search);
  const [showList, setShowList] = useState(true);
  console.log(searchVal);
  const handleChange = (e) => {
    setSearch(e.target.value);
    setShowList(true); //
  };
  //   const lon = searchVal.centre.coordinates[0];
  //   const lmat = searchVal.centre.coordinates[1];

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
        className="flex flex-col flex-wrap justify-center h-[12vh]"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="w-1/2 text-center ml-[5rem]" htmlFor="city">
          Veuillez saisir votre code postal
        </label>
        <input
          type="text"
          name="city"
          id="city"
          value={search}
          onChange={handleChange}
          placeholder="Saisir votre code postal"
          className="w-1/2 h-6 mt-4 ml-[5rem] p-2 rounded-[10px] border border-[#2c74b3] bg-[#fdf9f3]"
        />
        <button
          type="button"
          className="border-none bg-transparent w-15 mt-auto ml-[-5rem]"
          tabIndex={-1}
        >
          <img
            className="w-20 ml-[3rem] mt-[-1.5rem]"
            src="./icons/search.svg"
            alt="search"
          />
        </button>
      </form>
      {loading && <p>Chargement…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {showList && (
        <ul className="autoCompleteList ...">
          {searchVal.map((d, index) => (
            <li onClick={() => handleClick(d)} key={index} className="...">
              {d.nom}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchInput;

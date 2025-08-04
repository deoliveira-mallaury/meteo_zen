"use client";
import { useEffect, useState } from "react";

const CustomSearch =  (search) => {
  const [searchVal, setSearchVal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!search) return;

    setLoading(true);

    fetch(
      `https://geo.api.gouv.fr/communes?codePostal=${search}&fields=code,nom,centre,codesPostaux`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => setSearchVal(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search]);

  return { searchVal, loading, error };
};
export default CustomSearch;

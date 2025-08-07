"use client";
import { useEffect, useState } from "react";

export default function ProfilList({ nouveauProfil }) {
  const [profils, setProfils] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger au montage
  useEffect(() => {
    const fetchProfils = async () => {
      const res = await fetch("/api/Profils");
      const data = await res.json();
      setProfils(data);
      setLoading(false);
    };
    fetchProfils();
  }, []);

  // Ajouter nouveau profil en haut
  useEffect(() => {
    if (nouveauProfil) {
      setProfils((prev) => [nouveauProfil, ...prev]);
    }
  }, [nouveauProfil]);

  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-xl font-semibold">Profils enregistrés</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="space-y-2">
          {profils.map((profil) => (
            <li key={profil.id} className="border p-3 rounded">
              <p className="font-bold">{profil.nom}</p>
              <p className="text-gray-700">{profil.bio}</p>
              <p className="text-sm text-gray-400">
                {new Date(profil.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

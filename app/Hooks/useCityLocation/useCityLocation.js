import { useState, useEffect } from "react";
import AuthStatus from "../AuthStatus";
// Adapte l'import selon ta structure réelle

/**
 * Hook personnalisé pour gérer la localisation.
 * Tente de trouver la correspondance exacte Code Postal + Nom si disponible.
 */
export default function useCityLocation() {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [cityHandler, setCityHandler] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const session = AuthStatus();

  const handleCitySelect = ({ nom, code, lon, lat }) => {
    setCityHandler(`${nom} - ${code}`);
    if (lat && lon) {
      setCoords({ lat, lon });
    }
  };

  // Fonction utilitaire pour comparer des noms de villes sans se soucier des accents/majuscules
  const normalizeString = (str) => {
    return str
      ? str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .trim()
      : "";
  };

  useEffect(() => {
    const userMetadata = session?.user?.user_metadata;
    const controller = new AbortController();

    const initCity = async () => {
      if (!userMetadata) {
        setIsLoading(false);
        return;
      }

      const defaultCityName = userMetadata.city;
      const defaultCityZip = userMetadata.zip;

      if (defaultCityZip) {
        try {
          // On récupère TOUTES les communes de ce code postal
          const res = await fetch(
            `https://geo.api.gouv.fr/communes?codePostal=${defaultCityZip}&fields=code,nom,centre,codesPostaux`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Erreur API Gouv");

          const data = await res.json();

          if (data && data.length > 0) {
            let cityData = data[0]; // Fallback : on prend le premier par défaut

            // LOGIQUE AJOUTÉE : Si on a un nom, on cherche la correspondance exacte dans la liste
            if (defaultCityName) {
              const targetName = normalizeString(defaultCityName);

              const exactMatch = data.find(
                (city) => normalizeString(city.nom) === targetName
              );

              if (exactMatch) {
                cityData = exactMatch;
              }
            }

            // Construction des données finales
            const nomComplet = `${cityData.nom} - ${defaultCityZip}`; // On utilise le nom officiel de l'API
            const lon = cityData.centre.coordinates[0];
            const lat = cityData.centre.coordinates[1];

            setCityHandler(nomComplet);
            setCoords({ lat, lon });
          } else {
            setCityHandler(defaultCityName || "Ville introuvable");
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Erreur récupération ville:", error);
            setCityHandler(defaultCityName || "Erreur");
          }
        }
      } else if (defaultCityName) {
        // Cas où on a seulement le nom et pas de zip (moins précis, pas de fetch ici selon ta logique)
        setCityHandler(defaultCityName);
      }

      setIsLoading(false);
    };

    initCity();

    return () => controller.abort();
  }, [session]);

  return {
    coords,
    cityHandler,
    session,
    handleCitySelect,
    isLoading,
  };
}

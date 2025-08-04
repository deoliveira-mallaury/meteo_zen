"use client";
import { useEffect, useState } from "react";

const FetchWeather = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!lat || !lon) return;

    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=f6fed325385bde59b45bd6ba4d528e13`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => setWeatherData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  if (loading) return <p>Chargement des données météo...</p>;
  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;
  if (!weatherData) return null;

  return (
    <div>
      <p>Température actuelle : {weatherData.list[0].main.temp}°C</p>
      <p>Temps : {weatherData.list[0].weather[0].description}</p>
      {/* Affiche plus de détails selon besoin */}
    </div>
  );
};

export default FetchWeather;

"use client";
import useCityLocation from "@/app/Hooks/useCityLocation/useCityLocation";
import { useEffect, useState } from "react";

const weatherDescriptionMap = {
  "clear sky": "Ciel dégagé",
  "few clouds": "Quelques nuages",
  "scattered clouds": "Nuages dispersés",
  "broken clouds": "Nuages fragmentés",
  "shower rain": "Averses",
  rain: "Pluie",
  thunderstorm: "Orages",
  snow: "Neige",
  mist: "Brume",
  "partly cloudy": "Partiellement nuageux",
  "overcast clouds": "Ciel couvert",
  default: "Météo",
};

const FetchWeather = () => {
  // Hook pour récupérer les coordonnées et l'état de chargement localisation
  const {
    coords,
    isLoading: isLocationLoading,
    cityHandler,
  } = useCityLocation();

  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [error, setError] = useState("");

  const getFrenchDescription = (description) => {
    const normalizedDescription = description ? description.toLowerCase() : "";
    if (
      normalizedDescription.includes("cloud") &&
      !normalizedDescription.includes("broken")
    ) {
      return weatherDescriptionMap["partly cloudy"];
    }
    return (
      weatherDescriptionMap[normalizedDescription] || normalizedDescription
    );
  };

  const formatHour = (dt) => {
    const date = new Date(dt * 1000);
    return date.getHours() + "h";
  };

  useEffect(() => {
    if (!coords.lat || !coords.lon) return;

    setWeatherLoading(true);
    setError("");

    // 🚨 RAPPEL SÉCURITÉ : Idéalement, appeler ici un endpoint interne: /api/weather?lat=...
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=f6fed325385bde59b45bd6ba4d528e13`;
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(
            `Erreur de chargement des données météo. Code: ${res.status}`
          );
        }

        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Erreur de récupération de la météo:", err);
        setError(err.message || "Impossible de charger les données météo.");
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchData();
  }, [coords.lat, coords.lon]);

  // Gestion des états de chargement
  if (isLocationLoading || weatherLoading)
    return (
      <p className="text-center p-8 text-gray-400 animate-pulse" role="status">
        {isLocationLoading
          ? "Localisation en cours..."
          : "Chargement de la météo..."}
      </p>
    );

  if (error)
    return (
      <p className="text-center p-8 text-red-500" role="alert">
        Erreur : {error}
      </p>
    );

  if (!coords.lat && !isLocationLoading) {
    return (
      <div className="text-center p-8 text-gray-400">
        Localisation impossible. Veuillez vérifier votre profil.
      </div>
    );
  }

  if (!weatherData || !weatherData.list || weatherData.list.length === 0) {
    return (
      <div className="text-center p-8 text-gray-400">
        Aucune donnée météo disponible.
      </div>
    );
  }
const date = new Date();

const currentDate = new Intl.DateTimeFormat('fr-FR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
}).format(date)
  
  
  const current = weatherData.list[0];
  const currentTemp = Math.round(current.main.temp);
  const feelsLikeTemp = Math.round(current.main.feels_like);
  const description = getFrenchDescription(current.weather[0].description);
  const humidity = current.main.humidity;
  const windSpeedKmh = Math.round(current.wind.speed * 3.6);
  const iconCode = current.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const hourlyForecast = weatherData.list.slice(1, 8).map((item) => ({
    time: formatHour(item.dt),
    temp: Math.round(item.main.temp),
    icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
  }));

  // On utilise le nom de la ville de l'API météo, ou celui du hook en fallback
  const cityName = weatherData.city.name || cityHandler;

  return (
    <div className="container mx-auto max-w-xl p-4 sm:p-6 md:p-8">
      {/* Nom de la Ville */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-100">
          {cityName} - {currentDate}
        </h3>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center">
          <span className="text-8xl font-light">{currentTemp}°</span>
          <div className="ml-4 flex flex-col items-center">
            <img
              src={iconUrl}
              alt={`Icône météo: ${description}`}
              className="w-20 h-20"
            />
            <p className="text-lg text-gray-300 capitalize mt-[-10px] whitespace-nowrap">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex overflow-x-auto justify-start sm:justify-center space-x-4 pb-4 border-b border-gray-700 mb-8"
        role="list"
        aria-label="Prévisions pour les prochaines heures"
      >
        {hourlyForecast.map((hour, index) => (
          <div
            key={index}
            className="flex-shrink-0 text-center bg-gray-800 p-3 rounded-xl shadow-lg transition duration-300 hover:bg-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" // Ajout focus ring pour navigation clavier
            role="listitem"
            tabIndex={0}
            aria-label={`À ${hour.time}, température de ${hour.temp} degrés`}
          >
            <p
              className="text-sm font-semibold text-gray-400"
              aria-hidden="true"
            >
              {hour.time}
            </p>
            <img
              src={hour.icon}
              alt=""
              className="w-8 h-8 mx-auto my-1"
              aria-hidden="true"
            />
            <p className="text-md font-bold" aria-hidden="true">
              {hour.temp}°
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div
          className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl shadow-lg"
          role="region"
          aria-label={`Vitesse du vent : ${windSpeedKmh} km/h`}
        >
          <p className="text-sm text-gray-400 mb-1" aria-hidden="true">
            Vent
          </p>
          <p className="text-md font-semibold" aria-hidden="true">
            {windSpeedKmh} km/h
          </p>
        </div>

        <div
          className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl shadow-lg"
          role="region"
          aria-label={`Humidité : ${humidity} pourcent`}
        >
          <p className="text-sm text-gray-400 mb-1" aria-hidden="true">
            Humidité
          </p>
          <p className="text-md font-semibold" aria-hidden="true">
            {humidity}%
          </p>
        </div>

        <div
          className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-xl shadow-lg"
          role="region"
          aria-label={`Température ressentie : ${feelsLikeTemp} degrés`}
        >
          <p className="text-sm text-gray-400 mb-1" aria-hidden="true">
            Ressenti
          </p>
          <p className="text-md font-semibold" aria-hidden="true">
            {feelsLikeTemp}°
          </p>
        </div>
      </div>
    </div>
  );
};

export default FetchWeather;

"use client";
import { useEffect, useState } from "react";

const FetchWeather = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  useEffect(() => {
    if (!lon || !lat) return;

    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lon}&lon=${lat}&units=metric&appid=f6fed325385bde59b45bd6ba4d528e13`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erreur de chargement");
        return res.json();
      })
      .then((data) => {
        const groupedData = {};

        data.list.forEach((entry) => {
          const parsedDate = new Date(entry.dt_txt);
          const dateKey = parsedDate.toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          const time = parsedDate.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Europe/Paris",
          });

          const weatherEntry = {
            time,
            weather: entry.weather[0].description,
            temp: entry.main.temp,
          };

          if (!groupedData[dateKey]) {
            groupedData[dateKey] = [];
          }

          groupedData[dateKey].push(weatherEntry);
        });

        setWeatherData(groupedData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [lat, lon]);

  const handleClick = (entry) => {
    alert(`Température : ${entry.temp}°C\nTemps : ${entry.weather}`);
  };

  const availableDates = Object.keys(weatherData);
  const selectedDate = availableDates[selectedDayIndex];

  if (loading) return <p>Chargement des données météo...</p>;
  if (error) return <p style={{ color: "red" }}>Erreur : {error}</p>;
  if (!selectedDate) return <p>Aucune donnée disponible</p>;

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        {availableDates.map((date, index) => (
          <button
            key={date}
            onClick={() => setSelectedDayIndex(index)}
            style={{
              marginRight: "0.5rem",
              backgroundColor: index === selectedDayIndex ? "#007bff" : "#ccc",
              color: "white",
              padding: "0.5rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {date}
          </button>
        ))}
      </div>

      <h3>{selectedDate}</h3>
      <ul>
        {weatherData[selectedDate].map((entry, index) => (
          <li onClick={() => handleClick(entry)} key={index}>
            {entry.time} - {entry.weather} - {entry.temp}°C
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchWeather;
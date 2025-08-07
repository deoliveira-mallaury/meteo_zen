"use client";
import Header from "@/components/Header";
import SearchInput from "../components/SearchInput";
import { useState } from "react";
import FetchWeather from "@/components/FetchWeather";
import Login from "./Register/page";
import AuthStatus from "@/app/Hooks/AuthStatus";

export default function Home() {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [cityHandler, setCityHandler] = useState("");

  const handleCitySelect = ({ nom, code, lon, lat }) => {
    setCityHandler(`${nom} - ${code}`);
    if (lat && lon) {
      setCoords({ lat, lon });
    }
  };
  const session = AuthStatus();
  console.log(session ?? "null");

  return (
    <>
      <Header />
      <div className="p-4 text-center">
        {session ? (
          <p className="text-green-600 font-semibold">
            Bienvenue {session.user.email}
          </p>
        ) : (
          <></>
        )}
      </div>

      <SearchInput onSelectCity={handleCitySelect} />
      <h2 className="text-center">{cityHandler}</h2>
      {/* N'affiche FetchWeather que si coordonnées valides */}
      {coords.lat && coords.lon && (
        <FetchWeather lat={coords.lat} lon={coords.lon} />
      )}
      {/* <Login/> */}
    </>
  );
}

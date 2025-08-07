"use client";
import Logo from "@/components/Header";
import SearchInput from "../components/SearchInput";
import { useState } from "react";
import FetchWeather from "@/components/FetchWeather";

export default function Home() {
  const [coords, setCoords] = useState({ lon: null, lat: null });
  const [cityHandler, setCityHandler] = useState("");

  const handleCitySelect = ({ nom, code, lon,lat }) => {    
    setCityHandler(`${nom} - ${code}`);
    if (lat && lon) {
      setCoords({ lat, lon });
    }
  };

  return (
    <>
      <Logo />
      <SearchInput onSelectCity={handleCitySelect} />
      <h2 className="text-center">{cityHandler}</h2>

      {coords.lat && coords.lon && (
        <FetchWeather lat={coords.lat} lon={coords.lon} />
      )}
    </>
  );
}

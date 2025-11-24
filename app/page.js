"use client";

import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import FetchWeather from "@/components/FetchWeather";
import TogglerFavory from "@/components/TogglerFavory";
import useCityLocation from "@/app/Hooks/useCityLocation/useCityLocation";

export default function Home() {
  const { coords, cityHandler, handleCitySelect, session, isLoading } =
    useCityLocation();
  const userName =session? session.user.user_metadata.pseudo:null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center p-4 w-full max-w-4xl mx-auto">
        <div className="mb-6 text-center min-h-[1.5rem]">
          {session?.user ? (
            <p className="text-green-400 font-semibold animate-fade-in">
              Bienvenue {userName}
            </p>
          ) : (
            <span aria-hidden="true" className="invisible">
              Bienvenue
            </span>
          )}
        </div>

        <div className="w-full max-w-md mb-6">
          <SearchInput onSelectCity={handleCitySelect} />
        </div>

        <section
          className="text-center flex justify-center items-center gap-3 mt-4 mb-8 min-h-[2rem]"
          aria-live="polite"
        >
          {isLoading ? (
            <span className="text-gray-500 animate-pulse">
              Chargement de la localisation...
            </span>
          ) : cityHandler ? (
            <>
              <h2 className="text-xl sm:text-2xl font-semibold text-green-400">
                {cityHandler}
              </h2>
              {session && (
                <div className="mt-1">
                  <TogglerFavory />
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-400 italic">
              Veuillez sélectionner une ville
            </p>
          )}
        </section>

        {coords.lat && coords.lon && (
          <div className="w-full animate-slide-up">
            <FetchWeather lat={coords.lat} lon={coords.lon} />
          </div>
        )}
      </main>
    </div>
  );
}

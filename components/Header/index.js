import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="flex w-full flex-wrap justify-center">
        <a href="/">
          <div className="flex flex-col m-4  items-center w-20 h-20 border-[5px] rounded-full ">
            <p className="text-[#2c74b3] text-center font-bold text-[1.1em] absolute top-7 z-[2]">
              Meteo
            </p>
            <div className="relative w-full h-full bg-[#2c74b3] rounded-full shadow-inner overflow-hidden wave-animation">
              <p className="text-white text-center font-bold text-[1.1em] absolute top-10 left-4 z-[2]">
                Zen
              </p>
            </div>
          </div>
        </a>
        <nav className="w-full flex justify-evenly items-center">
          <a>Accueil</a>
          <a>Pricing</a>
          <Link href="/Login">
            <img className="w-15" src="./icons/account.svg" />
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;

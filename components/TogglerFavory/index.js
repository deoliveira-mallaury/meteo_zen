"use client";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const TogglerFavory = ({ city, zip, userId }) => {
  const [active, setActive] = useState(false);

  const toggleStar = async () => {
    const newState = !active;
    setActive(newState);

    if (newState) {
      const res = await fetch("/api/favories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, zip, user_id: userId }),
      });

      const result = await res.json();
      if (res.status !== 201) {
        console.error(result.error);
        setActive(false);
      }
    }
  };

  return (
    <i
      className={`bi ${active ? "bi-star-fill text-yellow-400" : "bi-star text-gray-400"} cursor-pointer text-xl`}
      onClick={toggleStar}
    ></i>
  );
};

export default TogglerFavory;
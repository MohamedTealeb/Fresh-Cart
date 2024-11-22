import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContextProvider";
import { Link } from "react-router-dom";
import RaitingStars from "../RaitingStars/RaitingStars";
import { addproducttocart } from "../../CartServies";

export default function Categorydet({ categ }) {
  return (
    <>
      <div className="max-w-2xl mx-auto ">
        <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700  flex flex-col">
          <Link>
            <img
              className="rounded-t-lg   p-8 h-100"

              src={categ.image}
              alt={categ.name}
            />
          </Link>
          <div className="px-5 pb-5  ">
            <Link>
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-black line-clamp-1">
                {categ.name}
              </h3>
            </Link>
          </div>
        </div>
      </div>
      
    </>
  );
}

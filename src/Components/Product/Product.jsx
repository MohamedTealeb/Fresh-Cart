import React, { useContext } from "react";
import RaitingStars from "../RaitingStars/RaitingStars";
import { Link } from "react-router-dom";

import { AuthContext } from "./../../Contexts/AuthContextProvider";

import { addproducttocart } from "../../CartServies";

export default function Product({ product }) {
  let { userToken } = useContext(AuthContext);

  return (
    <>
      <div className="max-w-2xl mx-auto ">
        <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
          <Link to={"/Productdet/" + product._id}>
            <img
              className="rounded-t-lg p-8"
              src={product.imageCover}
              alt={product.title}
            />
          </Link>
          <div className="px-5 pb-5">
            <Link to={"/Productdet/" + product._id}>
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-black line-clamp-1">
                {product.title}
              </h3>
              <p className="line-clamp-1">{product.description}</p>
            </Link>
            <RaitingStars rating={product.ratingsAverage} />
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-black">
                ${product.price}
              </span>
              <button
                onClick={() => addproducttocart(product._id, userToken)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

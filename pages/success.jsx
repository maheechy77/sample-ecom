import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";
import { runFireWorks } from "../lib/utils";

const Success = () => {
  const { setCartitems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartitems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireWorks();

    return () => {
      second;
    };
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order</h2>
        <p className="email-msg">Check your email inbox for the recipt.</p>
        <p className="description">
          If you have any question please email
          <a className="email" href="mailto:sample@outlook.com">
            sample@outlook.com
          </a>
          <Link href={"/"}>
            <button type="button" width="300px" className="btn">
              Continue Shopping
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Success;

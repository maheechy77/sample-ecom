import Link from "next/link";
import React, { useRef, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import Cart from "./Cart";

const Navbar = () => {
  const [showChildNavItem, setShowChildNavItem] = useState(false);
  const { setShowCart, showCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href={"#"}>Ecommerce Store</Link>
      </p>
      <div className="nav-items">
        <nav>
          <p
            className="parent-nav-item"
            onClick={() => setShowChildNavItem((prev) => !prev)}
          >
            Categories
            {showChildNavItem && (
              <span className="child-nav-item">Electronics</span>
            )}
          </p>
        </nav>
      </div>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;

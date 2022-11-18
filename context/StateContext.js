import React, { createContext, useContext, useState, useEffect } from "react";

import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartitems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const addToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevQuantities) => prevQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id)
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
      });

      setCartitems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartitems([...cartItems, { ...product }]);
    }

    toast.success(`${quantity} ${product.name} added to the Cart`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    let newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prev) => prev - foundProduct.quantity);
    setCartitems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    let newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartitems([
        ...newCartItems,
        {
          ...foundProduct,
          quantity: foundProduct.quantity + 1,
        },
      ]);

      setTotalPrice((prevPrice) => prevPrice + foundProduct.price);
      setTotalQuantities((prevQuantities) => prevQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartitems([
          ...newCartItems,
          {
            ...foundProduct,
            quantity: foundProduct.quantity - 1,
          },
        ]);
        setTotalPrice((prev) => prev - foundProduct.price);
        setTotalQuantities((prev) => prev - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => (prevQty === 1 ? (prevQty = 1) : prevQty - 1));
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        setCartitems,
        setTotalPrice,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        addToCart,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

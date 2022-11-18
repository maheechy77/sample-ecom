import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";

import { Product } from "../../components/index";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, products }) => {
  const { image, price, details, name } = product;
  const [index, setIndex] = useState(0);
  const { qty, incQty, decQty, addToCart, onAdd, setShowCart } =
    useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-details-container">
        ProductDetails
        <div>
          <div className="image-container">
            <img
              className="product-detail-image"
              src={image && urlFor(image[index])}
            />
          </div>

          <div className="small-image-container">
            {image.map((item, i) => (
              <img
                alt={i}
                key={i}
                src={urlFor(item)}
                className={`small-image ${i === index ? "selected-image" : ""}`}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>

          <div className="product-detail-desc">
            <h1>{name}</h1>
            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
            </div>

            <h4>Details:</h4>
            <p>{details}</p>
            <p className="price">${price}</p>
            <div className="quantity">
              <h3>Quantity</h3>
              <p className="quantity-desc">
                <span className="minus" onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </p>
            </div>

            <div className="buttons">
              <button
                type="button"
                className="add-to-cart"
                onClick={() => addToCart(product, qty)}
              >
                Add to Cart
              </button>
              <button type="button" className="buy-now" onClick={handleBuyNow}>
                Buy Nown
              </button>
            </div>
          </div>
        </div>
        <div className="maylike-products-wrapper">
          <h2>You may also Like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item, index) => (
                <Product key={index} product={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "product"]{...,category->}`;

  const product = await client.fetch(productQuery);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;

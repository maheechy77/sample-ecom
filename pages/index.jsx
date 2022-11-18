import React from "react";
import { FooterBanner, HeroBanner, Product } from "../components/index";
import { client } from "../lib/client";

const Home = ({ products, categories, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={!!bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={!!bannerData.length && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]{...,category->}';
  const categoryQuery = '*[_type == "category"]{...,product[]->}';
  const bannerQuery = '*[_type == "banner"]';

  const products = await client.fetch(productQuery);
  const categories = await client.fetch(categoryQuery);
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, categories, bannerData },
  };
};

export default Home;

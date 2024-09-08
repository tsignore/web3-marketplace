import React from "react";
import ProductList from "../../components/ProductList";
import ProductForm from "../../components/ProductForm";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1>Marketplace</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default Home;

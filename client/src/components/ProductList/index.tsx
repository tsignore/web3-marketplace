import React, { useEffect, useState } from "react";
import Product from "../Product";
import { getProducts } from "../../services/productService";
import styles from "./ProductList.module.scss";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = () => {
    fetchProducts(); // Обновление списка продуктов после удаления
  };

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <Product
          key={product._id}
          id={product._id}
          name={product.name}
          price={product.price}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;

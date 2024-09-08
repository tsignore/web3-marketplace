import React from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../services/productService";
import { sendPayment } from "../../services/blockchain"; // Импортируем функцию отправки платежа
import styles from "./Product.module.scss";

interface ProductProps {
  id: string;
  name: string;
  price: string;
  onDelete?: () => void; // Обратный вызов для обновления списка продуктов после удаления
}

const Product: React.FC<ProductProps> = ({ id, name, price, onDelete }) => {
  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      alert("Product deleted successfully!");
      // Если передан обратный вызов, вызовите его для обновления списка продуктов
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  const handleBuy = async () => {
    try {
      // Отправка платежа на блокчейн с указанием цены товара
      const receipt = await sendPayment(price);
      // Если платеж успешно завершен, выведите сообщение об успешной покупке
      if (receipt.status === 1) {
        alert("Purchase successful!");
      } else {
        // Если платеж не завершен успешно, выведите сообщение об ошибке
        throw new Error("Transaction failed");
      }
    } catch (error) {
      // Вывод сообщения об ошибке в случае неудачной покупки
      console.error("Error purchasing product:", error);
      alert("Error purchasing product");
    }
  };

  return (
    <div className={styles.product}>
      <h2>{name}</h2>
      <p>{price}</p>
      <div>
        <Link to={`/product/${id}`}>View Details</Link>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleBuy}>Buy</button>{" "}
        {/* Добавляем кнопку "Купить" */}
      </div>
    </div>
  );
};

export default Product;

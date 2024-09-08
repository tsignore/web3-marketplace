import React, { useState } from "react";
import { createProduct } from "../../services/productService";

const ProductForm: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({ name, price, description });
      alert("Product created successfully!");
      // Очистка полей формы после успешного создания продукта
      setName("");
      setPrice("");
      setDescription("");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;

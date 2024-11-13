// src/components/ProductForm.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Asegúrate de que la importación esté correcta

function ProductForm({ selectedProduct, onAddProduct, onUpdateProduct }) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [error, setError] = useState("");

  // Efecto para cargar datos si hay un producto seleccionado para editar
  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.name);
      setProductPrice(selectedProduct.price);
    }
  }, [selectedProduct]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de campos
    if (!productName || !productPrice) {
      setError("Por favor, llena todos los campos.");
      return;
    }

    try {
      if (selectedProduct) {
        // Si se está editando, actualizamos el producto
        await db.collection("Productos").doc(selectedProduct.id).update({
          name: productName,
          price: parseFloat(productPrice),
        });
        onUpdateProduct(); // Llamar a la función para actualizar la lista de productos
      } else {
        // Si no hay un producto seleccionado, es un nuevo producto
        await db.collection("Productos").add({
          name: productName,
          price: parseFloat(productPrice),
        });
        onAddProduct(); // Llamar a la función para agregar un nuevo producto
      }

      // Limpiar los campos después de agregar o editar el producto
      setProductName("");
      setProductPrice("");
      setError("");
    } catch (error) {
      setError("Error al guardar el producto: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <h2>{selectedProduct ? "Editar Producto" : "Agregar Producto"}</h2>
        {error && <p className="text-danger">{error}</p>}
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio:</label>
          <input
            type="number"
            className="form-control"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {selectedProduct ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;

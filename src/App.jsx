// src/App.js
import React, { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Función que maneja la selección de un producto para editar
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = () => {
    // Función que podría actualizar la lista de productos
  };

  const handleUpdateProduct = () => {
    setSelectedProduct(null); // Limpiar el producto seleccionado después de editar
  };

  return (
    <div>
      <ProductForm
        selectedProduct={selectedProduct}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
      />
      <ProductList onSelectProduct={handleSelectProduct} /> {/* Pasa la función aquí */}
    </div>
  );
}

export default App;

// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Asegúrate de que la importación esté correcta

function ProductList({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener los productos de Firestore
  const fetchProducts = async () => {
    try {
      const snapshot = await db.collection("Productos").get();
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener productos: ", error);
      setLoading(false);
    }
  };

  // Eliminar un producto de Firestore
  const deleteProduct = async (id) => {
    try {
      await db.collection("Productos").doc(id).delete();
      fetchProducts(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Llamar para cargar los productos al montar el componente
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Lista de Productos</h2>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{product.name} - ${product.price}</span>
            <div>
              <button
                onClick={() => deleteProduct(product.id)}
                className="btn btn-danger btn-sm me-2"
              >
                Eliminar
              </button>
              <button
                onClick={() => onSelectProduct(product)} // Asegúrate de que esta función exista
                className="btn btn-warning btn-sm"
              >
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;

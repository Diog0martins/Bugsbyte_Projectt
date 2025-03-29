import { useEffect, useState } from 'react';

function ProductsList() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://127.0.0.1:5000/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Product Prices</h1>
      <ul>
        {Object.entries(products).map(([productName, productInfo]) => (
          <li key={productName}>
            {productName}: ${productInfo.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;

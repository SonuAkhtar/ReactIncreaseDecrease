import { useEffect, useState } from "react";
import "./productsList.css";

const ProductsList = () => {
  const [products, setProducts] = useState();
  const [order, setOrder] = useState("asc");

  const fetchProductData = async () => {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();

    data = data.sort((a, b) => {
      if (order === "asc") return a.price - b.price;
      else return b.price - a.price;
    });

    setProducts(data);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  useEffect(() => {
    fetchProductData();
  }, [order]);

  return (
    <div className="product__container">
      <select name="price" onChange={handleOrderChange}>
        <option value="" hidden>
          Select Price order
        </option>
        <option value="asc">Ascending</option>
        <option value="dsc">Descending</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Title</th>
            <th>Category</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((prod, index) => (
            <tr key={prod.id}>
              <td>{prod.price}</td>
              <td>{prod.title}</td>
              <td>{prod.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;

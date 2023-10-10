import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Loading from "../Loading";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";

export default function Products() {
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const filterProducts = () => {
    if (!data) return [];

    const filtered = data.data.data
      .sort((a, b) => b.ratingsAverage - a.ratingsAverage)
      .slice(0, 10)
      .filter((product) => {
        const search = product.title.split(" ").slice(0, 2).join(" ");
        return search.toLowerCase().includes(query.toLowerCase().trim());
      });

    return filtered;
  };

  const { data, isLoading } = useApi("products", "products");

  useEffect(() => {
    if (data) {
      const filtered = filterProducts();
      setFilteredProducts(filtered);
    }
  }, [data, query]);

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleQueryChange}
          className="form-control"
        />
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-lg-2 col-md-3 col-sm-6" key={product._id}>
            <div className="product p-3 cursor-pointer">
              <Link to={`productdetails/${product._id}`}>
                <img src={product.imageCover} className="w-100" alt="img" />
                <p className="text-main">{product.category.name}</p>
                <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                <div className="product-box d-flex justify-content-between">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fa-solid fa-star rating-color"></i>{" "}
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Products page</title>
      </Helmet>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [
    dispatch,
    alert,
    error,
    keyword,
    currentPage,
    price,
    category,
    rating,
    navigate,
  ]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Home Page" />
          <div className="container container-fluid">
            <h1 id="products_heading">Latest Products</h1>
            <section id="products" className="container mt-3">
              <div className="row">
                {keyword ? (
                  <>
                    <div className="col-6 col-md-3 my-5">
                      <div className="px-5">
                        <Slider
                          range
                          marks={{
                            1: `$1`,
                            1000: `$1000`,
                          }}
                          min={1}
                          max={1000}
                          defaultValue={[1, 1000]}
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{
                            placement: "top",
                            visisble: true,
                          }}
                          value={price}
                          onChange={(price) => setPrice(price)}
                        />

                        <hr className="my-5" />

                        <div className="mt-5">
                          <h4 className="mb-3">Categories</h4>

                          <ul className="pl-0">
                            {categories.map((category) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={category}
                                onClick={() => setCategory(category)}
                              >
                                {category}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-5">
                          <h4 className="mb-3">Ratings</h4>

                          <ul className="pl-0">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <li
                                style={{
                                  cursor: "pointer",
                                  listStyleType: "none",
                                }}
                                key={star}
                                onClick={() => setRating(star)}
                              >
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${star * 20}%`,
                                    }}
                                  ></div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products &&
                          products.map((product) => (
                            <Product
                              product={product}
                              key={product._id}
                              col={4}
                            />
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  products &&
                  products.map((product) => (
                    <Product product={product} key={product._id} col={3} />
                  ))
                )}
              </div>
            </section>
            {resPerPage <= count ? (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

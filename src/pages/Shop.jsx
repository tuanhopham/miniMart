import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { CommonSection } from "../components/UI/CommonSection";
import Helmet from "./../components/Helmet/Helmet";
import "../styles/shop.css";
import { useDebounce } from "use-debounce";
import products from "./../assets/data/products";
import { ProductsList } from "./../components/UI/ProductsList";
import { categorys } from "./../assets/data/category";

export const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const [categoryOption, setCategoryOption] = useState("");

  const [searchValue, setSearchValue] = useState("");

  const [sortOption, setSortOption] = useState("");
  const [debounceSearchValue] = useDebounce(searchValue, 1000);

  const handleFilter = (e) => {
    setCategoryOption(e.target.value);
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    let sortedProducts = [...products];

    if (categoryOption || searchValue) {
      sortedProducts = sortedProducts.filter(
        (item) =>
          item.productName
            .toLowerCase()
            .includes(debounceSearchValue.toLowerCase()) &&
          (categoryOption ? item.category === categoryOption : true)
      );
    }
    if (sortOption !== "")
      sortedProducts.sort((a, b) =>
        sortOption === "ascending" ? a.price - b.price : b.price - a.price
      );

    setProductsData(sortedProducts);
  }, [categoryOption, debounceSearchValue, sortOption, products, searchValue]);

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select value={categoryOption} onChange={handleFilter}>
                  <option value="">Filter By Category</option>
                  {categorys.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select value={sortOption} onChange={handleSort}>
                  <option value="">Sort By </option>

                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  value={searchValue}
                  placeholder="Search..........."
                  onChange={handleSearch}
                />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className='text-center fs-4'>{`No product have name "${debounceSearchValue}" are found!`}</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

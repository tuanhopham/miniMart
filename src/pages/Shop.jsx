import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { useDebounce } from "use-debounce";
import { CommonSection } from "../components/UI/CommonSection";
import "../styles/shop.css";
import Helmet from "./../components/Helmet/Helmet";
import { ProductsList } from "./../components/UI/ProductsList";
export const Shop = () => {
  const products = useSelector((state) => state.products.productsList);
  const categorys = useSelector((state) => state.products.categorys);
  const [productsData, setProductsData] = useState([]);

  const [categoryOption, setCategoryOption] = useState("");

  const [searchValue, setSearchValue] = useState("");

  const [sortOption, setSortOption] = useState("");

  const [materialsList, setMaterialsList] = useState(null);
  const [typeList, setTypeList] = useState(null);
  const [sizeList, setSizeList] = useState(null);
  const [sortMaterial, setSortMaterial] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortSize, setSortSize] = useState("");
  const [debounceSearchValue] = useDebounce(searchValue, 1000);
  //filter cấp 2
  const handleFilterSize = (e) => {
    setSortSize(e.target.value);
  };
  const handleFilterMaterial = (e) => {
    setSortMaterial(e.target.value);
  };

  const handleFilterType = (e) => {
    setSortType(e.target.value);
  };
  //khi chọn type thì update filer cấp 2
  const handleFilterCategory = (e) => {
    setCategoryOption(e.target.value);
    //nếu giá trị = "" cho tất cả filter = null để không hiện thị
    if (e.target.value === "") {
      setMaterialsList(null);
      setTypeList(null);
      setSizeList(null);
    }
    setMaterialsList(
      categorys.find((item) => item.name === e.target.value).material
    );
    setTypeList(
      categorys.find((item) => item.name === e.target.value).category
    );
    setSizeList(categorys.find((item) => item.name === e.target.value).size);
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    let sortedProducts = [...products];

    if (categoryOption || searchValue || sortMaterial || sortType || sortSize) {
      sortedProducts = sortedProducts.filter((item) => {
        let isMatch = true;
        if (categoryOption) {
          isMatch = item.category === categoryOption;
        }
        if (debounceSearchValue) {
          isMatch =
            isMatch &&
            item.productName.toLowerCase().includes(debounceSearchValue.toLowerCase());
        }
        if (sortMaterial) {
          isMatch = isMatch && item.material === sortMaterial;
        }
        if (sortType) {
          isMatch = isMatch && item.type === sortType;
        }
        if (sortSize) {
          isMatch = isMatch && item.size === sortSize;
        }
        return isMatch;
      });
    }
    if (sortOption !== "") {
      sortedProducts.sort((a, b) =>
        sortOption === "ascending" ? a.price - b.price : b.price - a.price
      );
    }

    setProductsData(sortedProducts);
  }, [categoryOption, debounceSearchValue, sortOption, products, searchValue, sortMaterial, sortType, sortSize]);

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select value={categoryOption} onChange={handleFilterCategory}>
                  <option value="">Filter By Category</option>
                  {categorys.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
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
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
          <Row className="mt-2">
            {typeList && (
              <Col lg="2" md="3">
                <div className="filter__widget-sub ">
                  <select value={sortType} onChange={handleFilterType}>
                    <option value="">Type</option>
                    {typeList.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            )}
            {materialsList && (
              <Col lg="2" md="3">
                <div className="filter__widget-sub ">
                  <select value={sortMaterial} onChange={handleFilterMaterial}>
                    <option value="">Material</option>
                    {materialsList.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            )}
            {sizeList && (
              <Col lg="2" md="3">
                <div className="filter__widget-sub ">
                  <select value={sortSize} onChange={handleFilterSize}>
                    <option value="">Size</option>
                    {sizeList.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">{`No product have name "${debounceSearchValue}" are found!`}</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

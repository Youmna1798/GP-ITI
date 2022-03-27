import React , {useState} from "react";
// import { CartState } from "../context/Context";
import { useProductsContext } from "../context/products_context";
// import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import styled from "styled-components";
import {PaginationAllProducts} from "./Pagination";

const AllProducts = () => {
  const { all_products } = useProductsContext();

  let all_shoes = [];
  
  const [currentPage,setCurrentPage]=useState(1);
  const [productsPerPage]=useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProduct = all_products.slice(indexOfFirstProduct,indexOfLastProduct)
  const paginate = pageNumber => setCurrentPage(pageNumber);

  currentProduct.forEach((product) => {
      product.colors.forEach((obj) => all_shoes.push({...obj,code:product.code, name: product.name}));
    })

  return (
    <Wrapper>
      <div className="home">
        {/* <Filters /> */}
        <div className="productContainer">
          {currentProduct.map((prod) => (
            <SingleProduct prod={prod} key={prod.code} />
          ))}
        </div>
      <PaginationAllProducts
       productsPerPage={productsPerPage}
        totalProducts={all_products.length}
        paginate={paginate}
        currentPage={currentPage}/>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .productContainer {
    display: flex !important;
    max-width: 60%;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content:space-evenly;
  }
`;

export default AllProducts;

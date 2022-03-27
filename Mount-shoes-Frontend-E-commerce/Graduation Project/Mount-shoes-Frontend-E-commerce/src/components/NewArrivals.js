import React , {useState , useEffect} from "react";
import SingleProduct from "./SingleProduct";
import styled from "styled-components";
import axios from "axios";
import {PaginationNewArrivals} from "./Pagination";

const NewArrivals = () => {

  const [products, setProducts] = useState([]);

  useEffect(async () => {
    let res = await axios.get("http://localhost:8000/api/New/");
    setProducts(res.data.results);
  }, []);


  let all_shoes = [];
  
  const [currentPage,setCurrentPage]=useState(1);
  const [productsPerPage]=useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProduct = products.slice(indexOfFirstProduct,indexOfLastProduct)
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
      <PaginationNewArrivals
       productsPerPage={productsPerPage}
        totalProducts={products.length}
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

export default NewArrivals;

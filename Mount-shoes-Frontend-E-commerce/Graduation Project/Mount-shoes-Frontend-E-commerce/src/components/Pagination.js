import React from "react";
import { useParams , Link } from 'react-router-dom';

export const PaginationAllProducts = ({productsPerPage , totalProducts , paginate ,currentPage}) =>{


 const { page } = useParams(); 
 const p = parseInt(page, currentPage);

const pageNumbers = [];

 for(let i=1 ; i <= Math.ceil(totalProducts / productsPerPage); i++){
pageNumbers.push(i);
}


return(
<nav>
<ul className="pagination d-flex justify-content-center" >
    { currentPage === 1 ?
        null :
        <li className="page-item">
         <Link to={`/allproducts/page=${1}`} onClick={() => paginate(1)} className="page-link active">
         &laquo;
        </Link>
        </li> 

    }

        { currentPage === 1 ?
        null :
    <li className="page-item">
         <Link to={`/allproducts/page=${pageNumbers[currentPage-1-1]}`} onClick={() => paginate(pageNumbers[currentPage-1-1])} className="page-link active">
         Previous
        </Link>
        </li> 

    }
    
    {pageNumbers.map(number => (
        <li key={number} className="page-item">
        <Link to={`/allproducts/page=${number}`} onClick={() => paginate(number)} className="page-link active">
        {number}
        </Link>
        </li>
    ))}


    { currentPage === pageNumbers[pageNumbers.length-1] ?
    null :
     <li className="page-item">
         <Link to={`/allproducts/page=${pageNumbers[currentPage+1-1]}`} onClick={() => paginate(pageNumbers[currentPage+1-1])} className="page-link active">
         Next
        </Link>
        </li> 
    }
     { currentPage === pageNumbers[pageNumbers.length-1] ?
        null :
        <Link to={`/allproducts/page=${pageNumbers[pageNumbers.length-1]}`} className="page-item">
         <p onClick={() => paginate(pageNumbers[pageNumbers.length-1])} className="page-link active">
         &raquo;
        </p>
        </Link> 

    }
</ul>

</nav>
)
}

export const PaginationNewArrivals = ({productsPerPage , totalProducts , paginate ,currentPage}) =>{


 const { page } = useParams(); 
 const p = parseInt(page, currentPage);

const pageNumbers = [];

 for(let i=1 ; i <= Math.ceil(totalProducts / productsPerPage); i++){
pageNumbers.push(i);
}


return(
<nav>
<ul className="pagination d-flex justify-content-center" >
    { currentPage === 1 ?
        null :
        <li className="page-item">
         <Link to={`/newarrivals/page=${1}`} onClick={() => paginate(1)} className="page-link active">
         &laquo;
        </Link>
        </li> 

    }

        { currentPage === 1 ?
        null :
    <li className="page-item">
         <Link to={`/newarrivals/page=${pageNumbers[currentPage-1-1]}`} onClick={() => paginate(pageNumbers[currentPage-1-1])} className="page-link active">
         Previous
        </Link>
        </li> 

    }
    
    {pageNumbers.map(number => (
        <li key={number} className="page-item">
        <Link to={`/newarrivals/page=${number}`} onClick={() => paginate(number)} className="page-link active">
        {number}
        </Link>
        </li>
    ))}


    { currentPage === pageNumbers[pageNumbers.length-1] ?
    null :
     <li className="page-item">
         <Link to={`/newarrivals/page=${pageNumbers[currentPage+1-1]}`} onClick={() => paginate(pageNumbers[currentPage+1-1])} className="page-link active">
         Next
        </Link>
        </li> 
    }
     { currentPage === pageNumbers[pageNumbers.length-1] ?
        null :
        <Link to={`/newarrivals/page=${pageNumbers[pageNumbers.length-1]}`} className="page-item">
         <p onClick={() => paginate(pageNumbers[pageNumbers.length-1])} className="page-link active">
         &raquo;
        </p>
        </Link> 

    }
</ul>

</nav>
)
}

export const PaginationBestSelling = ({productsPerPage , totalProducts , paginate ,currentPage}) =>{


 const { page } = useParams(); 
 const p = parseInt(page, currentPage);

const pageNumbers = [];

 for(let i=1 ; i <= Math.ceil(totalProducts / productsPerPage); i++){
pageNumbers.push(i);
}


return(
<nav>
<ul className="pagination d-flex justify-content-center" >
    { currentPage === 1 ?
        null :
        <li className="page-item">
         <Link to={`/bestselling/page=${1}`} onClick={() => paginate(1)} className="page-link active">
         &laquo;
        </Link>
        </li> 

    }

        { currentPage === 1 ?
        null :
    <li className="page-item">
         <Link to={`/bestselling/page=${pageNumbers[currentPage-1-1]}`} onClick={() => paginate(pageNumbers[currentPage-1-1])} className="page-link active">
         Previous
        </Link>
        </li> 

    }
    
    {pageNumbers.map(number => (
        <li key={number} className="page-item">
        <Link to={`/bestselling/page=${number}`} onClick={() => paginate(number)} className="page-link active">
        {number}
        </Link>
        </li>
    ))}


    { currentPage === pageNumbers[pageNumbers.length-1] ?
    null :
     <li className="page-item">
         <Link to={`/bestselling/page=${pageNumbers[currentPage+1-1]}`} onClick={() => paginate(pageNumbers[currentPage+1-1])} className="page-link active">
         Next
        </Link>
        </li> 
    }
     { currentPage === pageNumbers[pageNumbers.length-1] ?
        null :
        <Link to={`/bestselling/page=${pageNumbers[pageNumbers.length-1]}`} className="page-item">
         <p onClick={() => paginate(pageNumbers[pageNumbers.length-1])} className="page-link active">
         &raquo;
        </p>
        </Link> 

    }
</ul>

</nav>
)
}

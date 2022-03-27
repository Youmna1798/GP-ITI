import React, {useState , useEffect} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom'
import {  Col, ListGroup, Row } from "react-bootstrap";
import { Divider } from 'semantic-ui-react';


  
const OrdersHistory = () => {

const [orders, setOrders] = useState([]);

  useEffect(async () => {
       const id =localStorage.getItem('id')
        const config={
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization': `Token ${localStorage.getItem("token")}`,
            }
        }
        axios.get(`http://127.0.0.1:8000/api/users/${id}/orders`,config)
        .then(res=>{
           const data=res.data.results
         setOrders(data)
        })
  }, []);

  return (
<>

{ orders.length === 0 ? 
<>

<h3 className='text-center mt-5 wrapper'>No Orders Yet  <Link style={{color:"#bba14f",textDecoration:"none"}} to='/allproducts/page=1'>Shop Now </Link></h3>
</>
:
<ListGroup className={orders.length <= 2 ? "wrapper" : null} >
         {orders.map((item) => (
           <ListGroup.Item className='mb-5 mt-5' key={item.id}>
               <Row style={{fontWeight:"bold"}} >
               <Col  md={3} className="d-flex align-items-center">
               Order Number: {item.id} 
                </Col>   
                 <Col  md={3} className="d-flex align-items-center">
               Date: {item.created_at} 
                </Col>   
             <Col  md={3} className="d-flex align-items-center">
               Total Price: {item.total} EGP
                </Col>
                 <Col  md={3} className="d-flex align-items-center">
               Status: {item.status} 
                </Col>
               </Row>
               <Divider/>
               {item.items.map((i,index)=>(
                 <div key={index}>
           <Row key={index}>
            <Col  md={4} className="d-flex align-items-center">
             {i.item.name}
            </Col>
            <Col  md={2} className="d-flex align-items-center">
              Color:  {i.item.color}
            </Col>
            <Col  md={2} className="d-flex align-items-center">
               Size: {i.item.size}
            </Col>
             <Col  md={2} className="d-flex align-items-center">
              Price:  {i.item.price}
            </Col>
            <Col  md={2} className="d-flex align-items-center">
             Count:   {i.quantity} 
            </Col>
           </Row>
            <Divider/>
             </div>
              ))}
           </ListGroup.Item>
         ))}
       </ListGroup>
}


</>
  );
};


export default OrdersHistory;

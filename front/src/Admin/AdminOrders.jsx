import React, {useState, useEffect} from 'react';
import './CSS/AdminOrders.css';

const AdminOrders = () => {
    let [isLoading, setIsLoading] = useState(true);
    let [orders, setOrders] = useState([]);


    function fetchData(){
        fetch('//localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/order')
        .then(response => response.json())
        .then(data => {
            setOrders(data.orders);
            setIsLoading(false);
            console.log(data.orders);
        });
    }

    useEffect(() => {
        fetchData();

    }, []);


    function confirmOrder(id){
        const postURL = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/order';
        fetch(postURL, {
          method: 'PATCH',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {id: id,
            confirmed: true}
          ),
      }).then(()=>{
        fetchData();
      });

    }
    //classnames are too much, todo: better solution
  return (
    <div className='adminOrdersPage'>
        {!isLoading &&
        orders.map((order)=>(
            <div className='adminOrderSingle'>
                <div className='adminOrderUserName adminTextInfo'><span>Vardas: </span>{order.name}</div>
                <div className='adminOrderUserSurname adminTextInfo'><span>Pavardė: </span>{order.surname}</div>
                <div className='adminOrderUserTotal adminTextInfo'><span>Iš viso: </span>{order.total}€</div>
                <div className='adminOrderUserNumber adminTextInfo'><span>Tel. Numeris: </span>{order.number}</div>
                <div className='adminOrderUserAdress adminTextInfo'><span>Adresas: </span>{order.adress}</div>
                <div className='adminOrdersUserItems'>
                    {order.items.map((item)=>(
                        <div className='adminOrdersUserSingleItem'>
                        <div className='adminOrdersUserSingleItemName'>{item.name}</div>
                        <div className='adminOrdersUserSingleItemPrice'>{item.price}€</div>
                        </div>
                    ))}</div>
                <div className='adminOrdersUserConfirm'>
                {!order.confirmed?<button onClick={()=>{confirmOrder(order._id)}}>Patvirtinti užsakymą</button>: <span>Užsakymas patvirtintas</span>}
                </div>
                </div>
        ))}
    </div>
  )
}

export default AdminOrders
import React, {useState, useEffect} from 'react';
import './Order.css';
const Order = (props) => {
    let [name, setName] = useState("");
    let [surname, setSurname] = useState("");
    let [cart, setCart] = useState([]);
    let [total, setTotal] = useState(0);
    let [adress, setAdress] = useState("");
    let [number, setNumber] = useState("");
    let [method, setMethod] = useState("cash");


    useEffect(() => {
        let tempTotal = 0;
        setCart(props.cart);
        props.cart.forEach((item)=>{
            if (item.count > 0){
                tempTotal += +item.price * item.count;
            }else{
                tempTotal += +item.price;
            }
        });
        setTotal(tempTotal);
        console.log(tempTotal);
    }, [props.cart]);
    

    function submitOrder(e){
        e.preventDefault();
        let data = {
            name: name,
            surname: surname,
            number: number,
            items: cart,
            adress: adress,
            method: method,
            total: total.toFixed(2),
            confirmed: false

        };
        const postURL = 'http://localhost:3001/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/order';
        fetch(postURL, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            data
          ),
      });
      
        console.log(data);

    }
  return (
    <div className='orderPage'>
        <div className='orderTotalPrice'>
            <span>Iš viso:</span>
            <span>{total.toFixed(2)}€</span>
        </div>
        <form onSubmit={(e)=>{submitOrder(e)}} className="orderForm">
            <input type="text" placeholder='Vardas' onChange={(e)=>{setName(e.target.value)}} required></input>
            <input type="text" placeholder='Pavarde' onChange={(e)=>{setSurname(e.target.value)}}required></input>
            <input type="number" placeholder='Tel. Numeris' onChange={(e)=>{setNumber(e.target.value)}}required></input>
            <input type="text" placeholder='Adresas' onChange={(e)=>{setAdress(e.target.value)}}required></input>

            <select onChange={(e)=>{setMethod(e.target.value)}}>
                <option value="cash">Grynais</option>
                <option value="card">Kortele</option>
            </select>
            <input type="submit" value="Užsakyti" className='orderConfirmBtn'></input>
        </form>
    </div>
  )
}

export default Order
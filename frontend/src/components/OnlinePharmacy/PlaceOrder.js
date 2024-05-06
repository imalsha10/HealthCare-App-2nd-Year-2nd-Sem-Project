import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { useTotal } from './TotalContext';
import {loadStripe} from '@stripe/stripe-js' 
import axios from 'axios';



export default function PlaceOrder() {

  const { cart  } = React.useContext(CartContext);
  const {total} = useTotal();
  const [orderId, setOrderId] = React.useState(generateOrderId());
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoNumber, setPhoNumber] = React.useState("");
  const [healthCode, setHealthcode] = React.useState("");
  const [dateTime, setDateTime] = React.useState("")
  const [itemNames, setItemNames] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const formattedItems = cart.map(item => `${item.name}: ${item.qty}`).join('\n');
  const currentDateAndTime = new Date().toLocaleString();
  const formattedString = formattedItems.toString();
  const correctDateTime = currentDateAndTime.toString();



  React.useEffect(() => {
    setAmount(total);
    setItemNames(formattedString);
    setDateTime(correctDateTime);
  }, [total, formattedString,correctDateTime]);
  
  function sendData(e) {
    e.preventDefault();
    
   
    const newOrder = {
      orderId,
      firstname,
      lastname,
      address,
      phoNumber,
      healthCode,
      dateTime,
      itemNames,
      amount
    }

    axios.post("http://localhost:8070/neworders/place", newOrder).then(() =>{
       alert("Order Confirmed!");
    
       
    }).catch(()=>{
       alert("Order Failed!")
    })

}



   function generateOrderId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const orderIdLength = 10; 

    let result = 'ODR-';
    for (let i = 0; i < orderIdLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

   const makePayment = async ()=>{
      const stripe = await loadStripe("pk_test_51PCfLB01EEROzWWmKc6bBuS0lRoDHTNBle6RIahy7BPbEJqQ1e1BXrs2m7rD0yclsEn6s02dqUh9FNFJmtXyqXZv00zagj2vTa");

      const body = {
        products : cart
      }

      const headers = {
        "Content-Type" : "application/json"
      }

      const response =  await fetch("http://localhost:8070/create-checkout-session",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
      })

      const session = await response.json();  


      const result = stripe.redirectToCheckout({
        sessionId : session.id
      });

      if(result.error){
        console.log(result.error)
      }
  
   }

   const placeOrderAndPayment = (e) => {
    e.preventDefault();
    sendData(e);
    makePayment();
  }

   

    return(
        <div>
             <Box
               component="form"
               sx={{
                '& .MuiTextField-root': { m: 1},
              }}
               noValidate
               autoComplete="off"
               style={{marginLeft:'60px', marginTop:'40px'}}
             >
                 <h3 style={{fontWeight:'bold', fontFamily:'sans-serif',marginLeft:'6px'}}>Place Order</h3>
                <div>
                <TextField
                    disabled
                    id="outlined-disabled"
                    label="Order ID"
                    defaultValue=" "
                    value={orderId}
                    style={{width:'50ch', marginTop:'40px', marginBottom:'15px'}}
                    />
                </div>
                <div>
                    <TextField
                    required
                    id="outlined-required"
                    label="First Name" 
                    placeholder='Supun'
                    style={{width:'30ch', marginTop:'20px', marginBottom:'15px'}}
                    onChange={(e)=>{
                      setFirstname(e.target.value)
                    }}
                        />
                    <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    placeholder='Perera'
                    style={{width:'40ch', marginTop:'20px', marginBottom:'15px'}}
                    onChange={(e)=>{
                      setLastname(e.target.value)
                    }}
                     />
                   </div> 
                   <div>
                        <TextField
                        required
                        id="outlined-multiline-flexible"
                        label="Address"
                        multiline
                        maxRows={5}
                        helperText='Enter the Delivery Address'
                        style={{width:'50ch', marginTop:'20px', marginBottom:'15px'}}
                        onChange={(e)=>{
                          setAddress(e.target.value)
                        }}
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="Phone Number"
                        placeholder='07x-xxx-xxxx'
                        style={{width:'40ch', marginTop:'20px', marginBottom:'15px'}}
                        onChange={(e)=>{
                          setPhoNumber(e.target.value)
                        }}
                         /> 
                   </div> 
                    <div>
                            <TextField
                            required
                            id="outlined-required"
                            label="Health Code"
                            placeholder='SW0012'
                            style={{width:'40ch', marginTop:'20px', marginBottom:'15px'}}
                            helperText='* Enter the code if you have any previously bought packages'
                            onChange={(e)=>{
                              setPhoNumber(e.target.value)
                            }}
                            /> 
                   </div>
                   <div>
                        <TextField
                        disabled
                        id="outlined-disabled"
                        label="Date and Time"
                        style={{width:'40ch', marginTop:'20px', marginBottom:'20px'}}
                        value={currentDateAndTime}
                        />
                   </div>
                   <div>
                       <TextField
                        disabled
                        id="outlined-multiline-static"
                        label="Items Ordered"
                        multiline
                        rows={5} 
                        style={{width:'70ch', marginTop:'20px', marginBottom:'15px'}}
                        value={formattedItems}
                        /> 
                   </div> 
                   <div>
                        <TextField
                        disabled
                        id="outlined-disabled"
                        label="Amount"
                        style={{width:'40ch', marginTop:'20px', marginBottom:'20px'}}
                        value={`Rs.${total}`}
                        />
                   </div>
                   <div>
                   </div>
                   <Link>
                     <Button variant='contained' style={{backgroundColor:'#0047AB', marginLeft:'6px'}} onClick={placeOrderAndPayment}> Pay & Confirm</Button>
                   </Link> 
             </Box>           
        </div>
    )
}
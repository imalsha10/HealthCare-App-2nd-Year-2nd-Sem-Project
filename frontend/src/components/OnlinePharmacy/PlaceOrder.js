import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { useTotal } from './TotalContext';
import { v4 as uuidv4 } from 'uuid';



export default function PlaceOrder() {

  const { cart  } = React.useContext(CartContext);
  const {total} = useTotal();
  const [orderId, setOrderId] = React.useState(generateOrderId());

   console.log(total);
   console.log(cart);

   const formattedItems = cart.map(item => `${item.name}: ${item.qty}`).join('\n');

   function generateOrderId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const orderIdLength = 10; 

    let result = 'ODR-';
    for (let i = 0; i < orderIdLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
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
                        />
                    <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    placeholder='Perera'
                    style={{width:'40ch', marginTop:'20px', marginBottom:'15px'}}
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
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="Phone Number"
                        placeholder='07x-xxx-xxxx'
                        style={{width:'40ch', marginTop:'20px', marginBottom:'15px'}}
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
                        style={{width:'30ch', marginTop:'20px', marginBottom:'20px'}}
                        value={`Rs.${total}`}
                        />
                   </div>
                   <Link>
                     <Button variant='contained' style={{backgroundColor:'#0047AB', marginLeft:'6px'}}>Proceed for Payment</Button>
                   </Link> 
             </Box>           
        </div>
    )
}
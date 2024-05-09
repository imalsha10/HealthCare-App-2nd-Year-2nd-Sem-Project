import * as React from 'react' ;
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CartContext } from './CartContext';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useTotal } from './TotalContext';





export default function Cart() {

    const { cart , addToCart, removeFromCart } = React.useContext(CartContext);
    const { setTotal } = useTotal();

    const handleIncrement = (item) => {
        addToCart(item);
    };

    const handleDecrement = (item) => {
        removeFromCart(item);
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxRate = 0.5; 
    const taxes = subtotal * taxRate;
    const total = subtotal + taxes;

    const handleCalculateTotal  = () => {
       setTotal(total)
    }

             console.log(total)
             console.log(cart)


    return (
        <div style={{ marginLeft:'30px', marginRight:'30px', marginTop:'50px'}}>
                <TableContainer component={Paper}>
                    <Table aria-label="cart table">
                        <TableHead style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold'}}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="right">{item.price}</TableCell>
                                    <TableCell align="right" style={{padding: '10px'}}>
                                    <Button variant="contained" style={{backgroundColor:'#D22B2B',marginRight:'10px'}} onClick={() => handleDecrement(item)}>-</Button>
                                        {item.qty}
                                    <Button variant="contained" color="primary" onClick={() => handleIncrement(item)} style={{marginLeft:'10px'}}>+</Button>      
                                    </TableCell>
                                    <TableCell align="right">{item.price * item.qty}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={3} style={{width: '66%', backgroundColor: '#f2f2f2', fontWeight: 'bold'}}>Subtotal</TableCell>
                                <TableCell align="right" style={{backgroundColor: '#f2f2f2', fontWeight: 'bold'}}>Rs. {subtotal.toFixed(1)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3} style={{width: '66%', backgroundColor: '#f2f2f2', fontWeight: 'bold'}}>Delivery Charges ({(taxRate * 100).toFixed(1)}%)</TableCell>
                                <TableCell align="right" style={{backgroundColor: '#f2f2f2', fontWeight: 'bold'}}>Rs. {taxes.toFixed(1)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3} style={{width: '66%', backgroundColor: '#f2f2f2', fontWeight: 'bold'}}>Total</TableCell>
                                <TableCell align="right" style={{backgroundColor: '#f2f2f2', fontWeight: 'bold'}}>Rs. {total.toFixed(1)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
         <div style={{textAlign:'right', marginTop:'30px'}}>
            <Link to="/online-p/placeorder">
            <Button variant='contained' style={{backgroundColor:'#0047AB'}} onClick={ () => handleCalculateTotal()}>Place Order</Button>
            </Link>
         </div>       
        </div>
    );

    
    
}
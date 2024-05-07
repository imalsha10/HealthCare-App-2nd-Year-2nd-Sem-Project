import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios  from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Container } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


export default function ViewOrders() {

    const [orders, setOrders] = React.useState([]);

   /*React.useEffect(()=>{
      function allOrders() {
          axios.get("http://localhost:8070/neworders/vieworders").then((res)=>{
              console.log(res.data);
              setOrders(res.data);
          }).catch((err) => {
              alert(err.message);
          })
      }
      allOrders() 
   },[])*/

   React.useEffect(() => {
    fetchOrders();
    }, []);

   const fetchOrders = () => {
    axios.get("http://localhost:8070/neworders/vieworders")
        .then((res) => {
            console.log(res.data);
            setOrders(res.data);
        })
        .catch((err) => {
            alert(err.message);
        });
 };

   const handleDelete = async (orderId) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete Order ?");
      if(!confirmed){
        return;
      }

        await axios.delete(`http://localhost:8070/neworders/deleteorder/${orderId}`).then(()=>{
          alert("Order Deleted !");
          fetchOrders();
        });
    } catch (error) {
        console.error('Error deleting order:', error);
    }
 };

 const generateReport = () => {
  const doc = new jsPDF();
  doc.autoTable({
    head: [['Order ID', 'First Name', 'Last Name', 'Items Ordered', 'Date and Time', 'Phone No:']],
    body: orders.map(order => [order.orderId, order.firstname, order.lastname, order.itemNames, order.dateTime]),
  });
  doc.save('user_report.pdf');
};



    return (
        <Container>
         <TableContainer component={Paper} style={{display:'inline-block', marginTop:'20px'}}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell align="center">First Name</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">Date and Time</StyledTableCell>
            <StyledTableCell align="center">Items Ordered</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((orders) => (
            <StyledTableRow key={orders.id}>
              <StyledTableCell component="th" scope="row">
                {orders.orderId}
              </StyledTableCell>
              <StyledTableCell align="center">{orders.firstname}</StyledTableCell>
              <StyledTableCell align="center">{orders.address}</StyledTableCell>
              <StyledTableCell align="center">{orders.dateTime}</StyledTableCell>
              <StyledTableCell align="center">{orders.itemNames}</StyledTableCell>
              <StyledTableCell align="center">
                       <Button variant="contained" style={{background:'#29b6f6'}} onClick={() => handleDelete(orders.orderId)}>Delete</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{textAlign:'right', marginTop :'20px'}}>
        <Button  variant='contained' style={{background:'#0047AB'}} onClick={generateReport}>Generate Report</Button>
    </div>
    </Container>
     
    )


}
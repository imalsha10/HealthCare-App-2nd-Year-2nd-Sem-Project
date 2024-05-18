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
import { Link } from 'react-router-dom';

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



export default function ViewAddedDrugs() {


   const [drugs, setDrugs] = React.useState([]);

   React.useEffect(()=>{
      function allDrugs() {
          axios.get("http://localhost:8070/newdrugs/").then((res)=>{
              console.log(res.data);
              setDrugs(res.data);
          }).catch((err) => {
              alert(err.message);
          })
      }
      allDrugs() 
   },[])


  return (
    <TableContainer component={Paper} style={{display:'inline-block', maxWidth:'650px', marginTop:'20px'}}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name Of Drug</StyledTableCell>
            <StyledTableCell align="center">Quantity(Boxes or Cards)</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drugs.map((drugs) => (
            <StyledTableRow key={drugs.id}>
              <StyledTableCell component="th" scope="row">
                {drugs.name}
              </StyledTableCell>
              <StyledTableCell align="center">{drugs.quantity}</StyledTableCell>
              <StyledTableCell align="center">
                       <Link to={{ pathname:`/onlinepharmacy/updateDrug/${drugs._id}`, state :{drugs}}}>
                       <Button variant="contained" style={{background:'#29b6f6'}}>Edit</Button>
                       </Link>       
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
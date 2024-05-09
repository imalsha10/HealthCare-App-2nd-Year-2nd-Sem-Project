import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';


export default function AddDrugBtn() {

  return (
    <Container style={{ marginTop:'40px' , marginLeft:'12px',justifyContent:'center'}}>
        <div  style={{marginLeft:'7px', justifyContent:'center'}}>
         <Typography variant='h7' paragraph='true' color='textSecondary' style={{justifyContent:'center'}}>Add Medicine which are available for the user to buy , 
              view recently added items and manage customer Orders...
         </Typography>
          <Stack spacing={2} direction="row" style={{justifyContent:'center'}}>
            <Link to="/onlinepharmacy/addDrug">
               <Button variant="contained">Add Drug</Button>
            </Link>
            <Link to="/onlinepharmacy/viewDrug">
               <Button variant="contained" style={{backgroundColor:'#D22B2B'}}>View Recently Added</Button>
            </Link>
            <Link to="/onlinepharmacy/viewOrders">
               <Button variant="contained" style={{backgroundColor:'#D22B2B',marginLeft:'400px'}}>View Orders</Button>
            </Link>
          </Stack>
        </div>
        <div style={{justifyContent:'center'}}>
         <Outlet/>
        </div>
    </Container>
    
   
  );
}
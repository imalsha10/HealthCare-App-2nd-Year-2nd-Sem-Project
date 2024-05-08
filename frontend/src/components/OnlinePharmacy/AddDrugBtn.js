import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router-dom';


export default function AddDrugBtn() {

  return (
    <Container style={{ marginTop:'40px' , marginLeft:'12px'}}>
        <div  style={{marginLeft:'7px'}}>
         <Typography variant='h7' paragraph='true' color='textSecondary'>Add Medicine which are available for the user to buy Or <br/>
              view recently added items.
         </Typography>
          <Stack spacing={2} direction="row">
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
        <Outlet/>
    </Container>
    
   
  );
}
import * as React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';

export default function PaySuccess() {
    return(
         
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Box
                    sx={{
                    display: 'flex',
                    marginTop:'0px',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 500,
                    height: 200,
                    borderRadius: 4,
                    bgcolor: '#A0A0A0',
                    '&:hover': {
                        bgcolor: '#C0C0C0',
                    },
                    }}
                >
                <Typography variant='h4' style={{fontWeight:'bold', marginBottom:'20px'}}>Payment Success!</Typography>
                <Link to='/onlinepharmacyP/land'>
                  <Button size="large" variant='contained' style={{alignSelf:'center',height:'50px', width:'200px'}} >Home</Button>
                </Link>
                </Box>
            </div>
    )
}
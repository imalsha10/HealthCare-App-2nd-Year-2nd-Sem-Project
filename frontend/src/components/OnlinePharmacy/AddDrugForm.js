import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


export default function AddDrugForm (){


    return (
       <Box style={{marginLeft:'0px', marginTop:'20px'}}
            component="form"
            sx={{
                display:'flex',
                flexDirection:'column',
                gap:'16px',
                '& .MuiTextField-root': { m: 1, width: '30%' },
            }}
            noValidate
            autoComplete="off"
       >
                
                    <TextField
                    id="outlined-textarea"
                    label="Name of the Drug"
                    placeholder="eg : paracetamol"
                    multiline
                    />
                    <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    helperText="Enter a brief description about the drug"
                    />
                    <TextField
                    id="outlined-textarea"
                    label="Price per Unit"
                    placeholder="Rs 100.00"
                    type='number'
                    multiline
                    />

                    <TextField
                    id="outlined-number"
                    label="Quantity"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min : "1"
                    }}
                    />
                    <Container style={{marginLeft:'0px'}}>
                       <Button variant="contained" style={{backgroundColor:'#29b6f6'}}>Add To Database</Button>
                    </Container>
                  
                
       </Box>
    
    )
}
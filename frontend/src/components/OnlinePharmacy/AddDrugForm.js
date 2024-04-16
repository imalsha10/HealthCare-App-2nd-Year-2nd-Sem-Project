import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import axios from 'axios';


export default function AddDrugForm (){


    const[name, setName] = React.useState("");
    const[description, setDescription] = React.useState("");
    const[price, setPrice] = React.useState("");
    const[quantity, setQuantity] = React.useState("");

    function sendData(e) {
       e.preventDefault();
       
       const newDrug = {
          name,
          description,
          price,
          quantity  
       }

       axios.post("http://localhost:8070/newdrugs/add", newDrug).then(() =>{
          alert("Drug Added successfully!");
         
            setName(() => "");
            setDescription("");
            setPrice("");
            setQuantity("");
          
          
       }).catch(()=>{
          alert("Failed")
       })

    }


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

                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                    <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    helperText="Enter a brief description about the drug"

                    onChange={(e)=>{
                        setDescription(e.target.value);
                    }}
                    />
                    <TextField
                    id="outlined-textarea"
                    label="Price per Unit"
                    placeholder="Rs 100.00"
                    type='number'
                    multiline

                    onChange={(e)=>{
                        setPrice(e.target.value);
                    }}
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

                    onChange={(e)=>{
                        setQuantity(e.target.value);
                    }}
                    />
                    <Container style={{marginLeft:'0px'}}>
                       <Button variant="contained" style={{backgroundColor:'#29b6f6'}} onClick={sendData}>Add To Database</Button>
                    </Container>
                  
                
       </Box>
    
    )
}
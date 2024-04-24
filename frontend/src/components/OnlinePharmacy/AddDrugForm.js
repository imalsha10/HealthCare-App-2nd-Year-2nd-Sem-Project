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

    const [errors, setErrors] = React.useState({});

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;
    
        if (!name.trim()) {
            errors.name = 'Name is required';
            formIsValid = false;
        }
    
        if (!description.trim()) {
            errors.description = 'Description is required';
            formIsValid = false;
        }
    
        if (!price.trim()) {
            errors.price = 'Price is required';
            formIsValid = false;
        } else if (isNaN(price)) {
            errors.price = 'Price must be a number';
            formIsValid = false;
        }
    
        if (!quantity.trim()) {
            errors.quantity = 'Quantity is required';
            formIsValid = false;
        } else if (isNaN(quantity)) {
            errors.quantity = 'Quantity must be a number';
            formIsValid = false;
        }
    
        setErrors(errors);
        return formIsValid;
    };

    function sendData(e) {
       e.preventDefault();
       
       if(validateForm()) {
       const newDrug = {
          name,
          description,
          price,
          quantity  
       }

       axios.post("http://localhost:8070/newdrugs/add", newDrug).then(() =>{
          alert("Drug Added successfully!");
         
            setName("");
            setDescription("");
            setPrice("");
            setQuantity("");
          
          
       }).catch(()=>{
          alert("Failed")
       })

    }

}


    return (
       <Box style={{marginLeft:'0px', marginTop:'20px', marginBottom:'20px'}}
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
                    error={!!errors.name}
                    helperText={errors.name}
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                    <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    error={!!errors.description}
                    value={description}
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
                    helperText={errors.price}
                    error={!!errors.price}
                    value={price}
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
                    helperText={errors.quantity}
                    error={!!errors.quantity}
                    value={quantity}
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
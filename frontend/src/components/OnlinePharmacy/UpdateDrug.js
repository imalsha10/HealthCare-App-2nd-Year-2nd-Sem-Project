import * as React from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useParams, useLocation, Link } from "react-router-dom";


export default function UpdateDrug() {

    const location = useLocation();
    const [formData, setFormData] = React.useState(location.state || []);
    const [drugID, setDrugId] = React.useState(null);
    const [error, setError] = React.useState(null);
    const  { id } = useParams();


  
    React.useEffect(() => {
      if (location.state) {
        setFormData(location.state);
        setDrugId(location.state._id);
      } else {
        setDrugId(id);
      }
    }, [location.state, id]);
  
    React.useEffect(() => {
      const fetchDrugData = async () => {
        try {
          const response = await axios.get(`http://localhost:8070/newdrugs/getdrug/${id}`);
          setFormData(response.data.drugs); 
        } catch (error) {
          console.error("Error fetching Drug data:", error);
          setError("An error occurred while fetching drug data.");
        }
      };
  
      if (drugID) {
        fetchDrugData();
      }
    }, [drugID]);
  
    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleConfirm = async () => {
      if (!drugID) {
        setError("Drug ID is missing. Please try again later.");
        return;
      }
  
      if (window.confirm("Are you sure you want to update the data?")) {
        try {
          const response = await axios.put(`http://localhost:8070/newdrugs/update/${drugID}`, formData);
          if (response.data.status === "Drug details Updated") {
            alert("Drug updated successfully!");
          } else {
            setError("Update failed!");
          }
        } catch (error) {
          console.error("Error updating drug data:", error);
          if (error.response) {
            console.log("Response data:", error.response.data);
            console.log("Response status:", error.response.status);
            console.log("Response headers:", error.response.headers);
          }
          setError("An error occurred. Please try again later.");
        }
      }
    };
  

    return(
        <Box style={{marginLeft:'0px', marginTop:'20px'}}
        component="form"
        sx={{
            display:'flex',
            flexDirection:'column',
            gap:'16px',
            '& .MuiTextField-root': { m: 1, width: '50%' },
        }}
        noValidate
        autoComplete="off"
   >
            
                <TextField
                disabled
                id="outlined-disabled"
                helperText="Name of Drug"
                value={formData.name || ''}
                onChange={handleChange}
                />
                <TextField
                disabled
                id="outlined-disabled"
                helperText="Description"
                multiline
                value={formData.description}
                onChange={handleChange}
                />
                <TextField
                required
                id="outlined-textarea"
                multiline
                helperText="Add new price of drug"
                value={formData.price || ''}
                onChange={handleChange}
                name='price'
                />
                <TextField
                required
                id="outlined-number"
                label="Quantity"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    min : "1"
                }}
                value={formData.quantity}
                onChange={handleChange}
                name='quantity'
                />
                <Container style={{marginLeft:'0px'}}>
                   <Button variant="contained" style={{backgroundColor:'#29b6f6'}} onClick={handleConfirm}>Edit Details</Button>
                </Container>
              
            
   </Box>
    )


  
}

import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import AddDrugBtn from './components/OnlinePharmacy/AddDrugBtn';
import AddDrugForm from './components/OnlinePharmacy/AddDrugForm';
import SearchBar from './components/OnlinePharmacy/SearchBar';
import ViewAddedDrugs from './components/OnlinePharmacy/ViewAddedDrugs';

//Dental
import AllPatients from './components/Dental/AllPatients';
import AddPatient from './components/Dental/AddPatient';
import DeletePatient from './components/Dental/DeletePatient';
import UpdatePatient from './components/Dental/UpdatePatient';
import Dental from './components/Dental/Dental';
import TimeSlotSelection from './components/Dental/TimeSlots';
import SubmissionSuccessful from './components/Dental/SubmissionSuccessful';
import AddService from './components/Dental/AddService';
import AllServices from './components/Dental/AllServices';


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';





function App() {
  return (
    <Router>
      <div className="App">
          <Header/>
          <NavBar/>
        
          <Routes>
            <Route path='/onlinepharmacy' element={<AddDrugBtn/>}>
               <Route path='addDrug' element={<AddDrugForm/>}/>
               <Route path='viewDrug' element={<ViewAddedDrugs/>}/>
            </Route>
          </Routes>

          <Routes>
               <Route path='/onlinepharmacyP' element={<SearchBar/>}></Route>
          </Routes>

          <Routes>
            <Route path='/home' element={<Dental/>}/>
            <Route path='/add' element={<AddPatient/>}/>
            <Route path='/times' element={<TimeSlotSelection/>}/>
            <Route path='/delete/:patientId' element={<DeletePatient/>}/>
            <Route path='/update/:id' element={<UpdatePatient/>}/>
            <Route path='/success' element={<SubmissionSuccessful/>}/>
            <Route path='/' element={<AllPatients/>}/>
            <Route path='/addService' element={<AddService/>}/>
            <Route path='/services' element={<AllServices/>}/>
          </Routes>
        
      </div>

    </Router>
    
  );
}

export default App;

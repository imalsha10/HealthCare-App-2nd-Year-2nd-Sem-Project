
import Adddoctor from './components/ConsultantCare/Adddoctor';
import AppointmentDetails from './components/ConsultantCare/AppointmentDetails';
import CreateAppointment from './components/ConsultantCare/CreateAppointment';
import DoctorView from './components/ConsultantCare/DoctorView';
import UpdateAppointment from './components/ConsultantCare/UpdateAppointment';
import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import AddDrugBtn from './components/OnlinePharmacy/AddDrugBtn';
import AddDrugForm from './components/OnlinePharmacy/AddDrugForm';
import SearchBar from './components/OnlinePharmacy/SearchBar';
import ViewAddedDrugs from './components/OnlinePharmacy/ViewAddedDrugs';



import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';





function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <NavBar />

        <Routes>
          <Route path="/" element={<DoctorView />} />
          <Route path="/add" element={<Adddoctor />} />
          <Route path="/addapp" element={<CreateAppointment />} />
           <Route path="/updateAppointment/:id"element={<UpdateAppointment/>}></Route>
          <Route path="/appointmentDetails/:id"element={<AppointmentDetails />}></Route>
          <Route path="/onlinepharmacy" element={<AddDrugBtn />}>
            <Route path="addDrug" element={<AddDrugForm />} />
            <Route path="viewDrug" element={<ViewAddedDrugs />} />
          </Route>
        </Routes>

        <Routes>
          <Route path="/onlinepharmacyP" element={<SearchBar />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

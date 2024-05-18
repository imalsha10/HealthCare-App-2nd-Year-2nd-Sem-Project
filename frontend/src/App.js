
import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import AddBlog from './components/HealthBlog/AddBlog';
import AddCusForm from './components/HealthBlog/AddCusForm';
import AddDrugBtn from './components/OnlinePharmacy/AddDrugBtn';
import AddDrugForm from './components/OnlinePharmacy/AddDrugForm';
import Cart from './components/OnlinePharmacy/Cart';
import DisplayDrugs from './components/OnlinePharmacy/DisplayDrugs';
import PaySuccess from './components/OnlinePharmacy/PaySuccess';
import PlaceOrder from './components/OnlinePharmacy/PlaceOrder';
import SearchBar from './components/OnlinePharmacy/SearchBar';
import SearchResult from './components/OnlinePharmacy/SearchResult';
import ViewAddedDrugs from './components/OnlinePharmacy/ViewAddedDrugs';
import ConfirmCus from './components/HealthBlog/ConfirmCus';
import Updateevent from "./components/HealthBlog/UpdateCus";
import ViewCus from "./components/HealthBlog/ViewCus";
import ViewPage from "./components/HealthBlog/ViewPage";
import OrderDrugs from './components/PrescribedMed/OrderDrugs';
import OrderHome from './components/PrescribedMed/OrderHome';
import Alluser from './components/PrescribedMed/Alluser';
import OrderDetails from './components/PrescribedMed/OrderDetails';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ViewOrders from './components/OnlinePharmacy/ViewOrders';
import AllBlogs from './components/HealthBlog/AllBlogs';
import GetInquiry from './components/Inquiries/getInquiry';
import ViewInquiries from './components/Inquiries/viewInquiry';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateDrug from './components/OnlinePharmacy/UpdateDrug';
import Landing from './components/OnlinePharmacy/Landing';


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
import UpdateService from './components/Dental/UpdateService';
import CosmeticDentistry from './components/Dental/CosmeticDentistry';
import DentalImplants from './components/Dental/DentalImplants'
import RootCanalTreatment from './components/Dental/RootCanalTreatment';

//Login
import Login from './components/Login/Login';
import Register from './components/Login/Register';












import Adddoctor from "./components/ConsultantCare/Adddoctor";
import DoctorView from "./components/ConsultantCare/DoctorView";
import CreateAppointment from "./components/ConsultantCare/CreateAppointment";
import Appointments from "./components/ConsultantCare/Appointments";
import AppointmentDetails from "./components/ConsultantCare/AppointmentDetails";
import UpdateAppointment from "./components/ConsultantCare/UpdateAppointment";





function App() {
  return (
    <Router>
      <div className="App">
          <Header/>
          <NavBar/>
        
          <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>

            <Route path='/onlinepharmacy' element={<AddDrugBtn/>}>
               
               <Route path='addDrug' element={<AddDrugForm/>}/>
               <Route path='viewDrug' element={<ViewAddedDrugs/>}/>
               <Route path='viewOrders' element={<ViewOrders/>}/>
               <Route path='updateDrug/:id' element={<UpdateDrug/>}/>
            </Route>
            <Route path='/onlinepharmacyP'element={<>
               <SearchBar/>
               <SearchResult/>
            </>}>
               <Route path='displayDrugs' element={<DisplayDrugs/>}></Route>
               <Route path='land' element={<Landing/>}></Route>
            </Route>
            <Route path='/displayCart' element={<Cart/>}></Route>
            <Route path='/online-p/placeorder' element={<PlaceOrder/>}></Route>
            <Route path='/online-p/paysuccess' element={<PaySuccess/>}></Route>
            



            <Route path="/blog/add" element={<AddBlog />} />
            <Route path="/blog/addcus/:eventId" element={<AddCusForm/>} />
            <Route path="/blog/getcus/:id" element={<ConfirmCus/>} />
            <Route path="/blog/updatecus/:id" element={<Updateevent />} />
            <Route path="/blog/getevent/:id" element={<ViewPage />} />
            <Route path="/blog/get/:id" element={<ViewPage />} />
            <Route path="/blog/cus" element={<ViewCus/>} />
            <Route path="/blog/allblogs" element={<AllBlogs />} />




            <Route path="/inquiry-i/get" element={<GetInquiry />} />
            <Route path="/inquiry-i/add" element={<ViewInquiries />} />
            


          

            <Route path="/prescribed-m/Alluser" element={<Alluser />} />
            <Route path="/prescribed-m/add" element={<OrderDrugs />} />
            <Route path="/prescribed-m/OrderHome" element={<OrderHome />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />


            
            {/*Dental*/}
            <Route path='/dental/dentalHome' element={<Dental/>}/>
            <Route path='/dental/dentalAdd' element={<AddPatient/>}/>
            <Route path='/dental/dentalTimes' element={<TimeSlotSelection/>}/>
            <Route path='/dental/dentalDelete/:id' element={<DeletePatient/>}/>
            <Route path='/dental/dentalUpdate/:id' element={<UpdatePatient/>}/>
            <Route path='/dental/success' element={<SubmissionSuccessful/>}/>
            <Route path='/dental/dentalGet' element={<AllPatients/>}/>
            <Route path='/dental/dentalAddService' element={<AddService/>}/>
            <Route path='/dental/dentalServices' element={<AllServices/>}/>
            <Route path='/dental/dentalServiceUpdate/:id' element={<UpdateService/>}/>
            <Route path='/dental/cosmeticDentistry' element={<CosmeticDentistry/>}/>
            <Route path='/dental/dentalImplants' element={<DentalImplants/>}/>
            <Route path='/dental/rootCanalTreatment' element={<RootCanalTreatment/>}/>




            {/* Default route */}

            
             {/* Default route */}

            <Route path="*" element={<Alluser />} />
             
            

















            <Route path="/consultant/doctorview" element={<DoctorView />} />
            <Route path="/consultant/add" element={<Adddoctor />} />
            <Route path="/consultant/view" element={<Appointments />} />
            <Route path="/consultant/addapp" element={<CreateAppointment />} />
            <Route path="/consultant/updateAppointment/:id"element={<UpdateAppointment/>}></Route>
            <Route path="/consultant/appointmentDetails/:id"element={<AppointmentDetails />}></Route>

            
          </Routes>
          
        
        
      </div>

    </Router>
    
  );
}

export default App;


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
               <Route path='viewOrders' element={<ViewOrders/>}/>
            </Route>
            <Route path='/onlinepharmacyP'element={<>
               <SearchBar/>
               <SearchResult/>
            </>}>
               <Route path='displayDrugs' element={<DisplayDrugs/>}></Route>
            </Route>
            <Route path='/displayCart' element={<Cart/>}></Route>
            <Route path='/online-p/placeorder' element={<PlaceOrder/>}></Route>
            <Route path='/online-p/paysuccess' element={<PaySuccess/>}></Route>



            <Route path="/add" element={<AddBlog />} />
            <Route path="/addcus" element={<AddCusForm/>} />
            <Route path="/getcus/:id" element={<ConfirmCus/>} />
            <Route path="/updatecus/:id" element={<Updateevent />} />
            <Route path="/getevent/:id" element={<ViewPage />} />
            <Route path="/get/:id" element={<ViewPage />} />
            <Route path="/cus" element={<ViewCus/>} />
            <Route path="/" element={<AllBlogs />} />

          

            <Route path="/prescribed-m/Alluser" element={<Alluser />} />
            <Route path="/prescribed-m/add" element={<OrderDrugs />} />
            <Route path="/prescribed-m/OrderHome" element={<OrderHome />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
             {/* Default route */}
            <Route path="*" element={<Alluser />} />



            
          </Routes>
          
        
        
      </div>

    </Router>
    
  );
}

export default App;

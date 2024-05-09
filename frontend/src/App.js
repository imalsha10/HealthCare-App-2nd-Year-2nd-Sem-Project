
import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import AddDrugBtn from './components/OnlinePharmacy/AddDrugBtn';
import AddDrugForm from './components/OnlinePharmacy/AddDrugForm';
import Cart from './components/OnlinePharmacy/Cart';
import DisplayDrugs from './components/OnlinePharmacy/DisplayDrugs';
import PlaceOrder from './components/OnlinePharmacy/PlaceOrder';
import SearchBar from './components/OnlinePharmacy/SearchBar';
import SearchResult from './components/OnlinePharmacy/SearchResult';
import ViewAddedDrugs from './components/OnlinePharmacy/ViewAddedDrugs';
import OrderDrugs from './components/PrescribedMed/OrderDrugs';
import OrderHome from './components/PrescribedMed/OrderHome';
import Alluser from './components/PrescribedMed/Alluser';
import OrderDetails from './components/PrescribedMed/OrderDetails';


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
            <Route path='/onlinepharmacyP'element={<>
               <SearchBar/>
               <SearchResult/>
            </>}>
               <Route path='displayDrugs' element={<DisplayDrugs/>}></Route>
            </Route>
            <Route path='/displayCart' element={<Cart/>}></Route>
            <Route path='/online-p/placeorder' element={<PlaceOrder/>}></Route>

          

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

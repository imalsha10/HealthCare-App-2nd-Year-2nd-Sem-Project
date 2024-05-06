
import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import AddDrugBtn from './components/OnlinePharmacy/AddDrugBtn';
import AddDrugForm from './components/OnlinePharmacy/AddDrugForm';
import Cart from './components/OnlinePharmacy/Cart';
import DisplayDrugs from './components/OnlinePharmacy/DisplayDrugs';
import PaySuccess from './components/OnlinePharmacy/PaySuccess';
import PlaceOrder from './components/OnlinePharmacy/PlaceOrder';
import SearchBar from './components/OnlinePharmacy/SearchBar';
import SearchResult from './components/OnlinePharmacy/SearchResult';
import ViewAddedDrugs from './components/OnlinePharmacy/ViewAddedDrugs';



import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ViewOrders from './components/OnlinePharmacy/ViewOrders';



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

          
            



            
          </Routes>
          
        
        
      </div>

    </Router>
    
  );
}

export default App;


import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import AddBlog from './components/HealthBlog/AddBlog';
import AddCusForm from './components/HealthBlog/AddCusForm';
import AddDrugBtn from './components/OnlinePharmacy/AddDrugBtn';
import AddDrugForm from './components/OnlinePharmacy/AddDrugForm';
import Cart from './components/OnlinePharmacy/Cart';
import DisplayDrugs from './components/OnlinePharmacy/DisplayDrugs';
import PlaceOrder from './components/OnlinePharmacy/PlaceOrder';
import SearchBar from './components/OnlinePharmacy/SearchBar';
import SearchResult from './components/OnlinePharmacy/SearchResult';
import ViewAddedDrugs from './components/OnlinePharmacy/ViewAddedDrugs';
import ConfirmCus from './components/HealthBlog/ConfirmCus';
import Updateevent from "./components/HealthBlog/UpdateCus";
import ViewCus from "./components/HealthBlog/ViewCus";
import ViewPage from "./components/HealthBlog/ViewPage";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
            </Route>
            <Route path='/onlinepharmacyP'element={<>
               <SearchBar/>
               <SearchResult/>
            </>}>
               <Route path='displayDrugs' element={<DisplayDrugs/>}></Route>
            </Route>
            <Route path='/displayCart' element={<Cart/>}></Route>
            <Route path='/online-p/placeorder' element={<PlaceOrder/>}></Route>



            <Route path="/blog/add" element={<AddBlog />} />
            <Route path="/blog/addcus" element={<AddCusForm/>} />
            <Route path="/blog/getcus/:id" element={<ConfirmCus/>} />
            <Route path="/blog/updatecus/:id" element={<Updateevent />} />
            <Route path="/blog/getevent/:id" element={<ViewPage />} />
            <Route path="/blog/get/:id" element={<ViewPage />} />
            <Route path="/blog/cus" element={<ViewCus/>} />
            <Route path="/blog/allblogs" element={<AllBlogs />} />

          
            



            
          </Routes>
          
        
        
      </div>

    </Router>
    
  );
}

export default App;


import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import AddDrugBtn from './components/OnlinePharmacy/AddDrugBtn';
import AddDrugForm from './components/OnlinePharmacy/AddDrugForm';
import Cart from './components/OnlinePharmacy/Cart';
import DisplayDrugs from './components/OnlinePharmacy/DisplayDrugs';
import SearchBar from './components/OnlinePharmacy/SearchBar';
import SearchResult from './components/OnlinePharmacy/SearchResult';
import ViewAddedDrugs from './components/OnlinePharmacy/ViewAddedDrugs';



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
               <Route path='displayDrugs' element={<DisplayDrugs/>}/>
            </Route>
            <Route path='/displayCart' element={<Cart/>}></Route>

          
            



            
          </Routes>
          
        
        
      </div>

    </Router>
    
  );
}

export default App;

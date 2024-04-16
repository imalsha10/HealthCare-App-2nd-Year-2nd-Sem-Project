
import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import AddDrugBtn from './components/OnlinePharmacy/AddDrugBtn';
import AddDrugForm from './components/OnlinePharmacy/AddDrugForm';
import SearchBar from './components/OnlinePharmacy/SearchBar';
import ViewAddedDrugs from './components/OnlinePharmacy/ViewAddedDrugs';



import OrderDrugs from './components/OrderDrugs';
import Alluser from './components/Alluser';
import OrderDetails from './components/OrderDetails';



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




          //Prescribed-medication

          <Routes>
       <Route path="/" element = {<Alluser/>} />
       </Routes>
       <Routes>
       <Route path="/add" element = {<OrderDrugs/>} />
       </Routes>
       <Routes>
       <Route path="/order-details" element = {<OrderDetails/>} />
       </Routes>


       
        
      </div>

    </Router>
    
  );
}

export default App;

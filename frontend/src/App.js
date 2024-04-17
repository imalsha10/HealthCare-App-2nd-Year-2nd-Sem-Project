
import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import AddBlog from './components/HealthBlog/AddBlog';
import AddCusForm from './components/HealthBlog/AddCusForm';
import AllBlogs from './components/HealthBlog/AllBlogs';
import ConfirmCus from './components/HealthBlog/ConfirmCus';
import ViewCus from './components/HealthBlog/ViewCus';
import ViewPage from './components/HealthBlog/ViewPage';
import AddDrugBtn from './components/OnlinePharmacy/AddDrugBtn';
import AddDrugForm from './components/OnlinePharmacy/AddDrugForm';
import SearchBar from './components/OnlinePharmacy/SearchBar';
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
          </Routes>

          <Routes>
               <Route path='/onlinepharmacyP' element={<SearchBar/>}></Route>
          </Routes>
          
          <Routes>
          <Route path="/add" element={<AddBlog />} />
          <Route path="/" element={<AllBlogs />} />
          <Route path="/addcus" element={<AddCusForm/>} />
          <Route path="/getcus/:id" element={<ConfirmCus />} />
          <Route path="/getevent/:id" element={<ViewPage />} />
          <Route path="/get/:id" element={<ViewPage />} />
          <Route path="/cus" element={<ViewCus/>} />
          </Routes>

          
        
      </div>

    </Router>
    
  );
}

export default App;

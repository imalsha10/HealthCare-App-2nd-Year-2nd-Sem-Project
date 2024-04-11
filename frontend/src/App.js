
import Header from './components/Header/Header';
import NavBar from './components/Header/NavBar';
import NavBar2 from './components/Header/NavBar2';
import AddDrugBtn from './components/OnlinePharmacy/AddDrugBtn';


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



function App() {
  return (
    <Router>
      <div className="App">
          <Header/>
          <NavBar/>
        
        
      </div>

    </Router>
    
  );
}

export default App;

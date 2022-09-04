
import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import Contact from './component/Contact';
import About from './component/About';
import Error from './component/Error';
import Logout from './component/Logout';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="*" element={<Error/>}/>

        <Route path="/" element={<Home></Home>}></Route>

        <Route path="/login" element={<Login></Login>}></Route>

        <Route path="/contact" element={<Contact></Contact>}></Route>

        <Route path="/signup" element={<Signup></Signup>}></Route>

        <Route path="/about" element={<About></About>}></Route>

        <Route path="/logout" element={<Logout></Logout>}></Route>


      {/* <Route element={<Error></Error>}></Route> */}
       </Routes>
      
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;

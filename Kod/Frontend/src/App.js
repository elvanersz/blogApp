import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Auth from './components/auth/Auth';
import User from './components/user/User';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Home/>}>Home</Route>
          <Route exact path="/users/:userId" element={<User/>}></Route>
          <Route exact path="/auth" element={localStorage.getItem("currentUser") != null ? <Navigate to="/" />: <Auth/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

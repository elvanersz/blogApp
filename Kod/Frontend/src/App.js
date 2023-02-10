import './App.css';
import Navbar from './components/navbar/Navbar';
import User from './components/user/User';
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Home/>}>Home</Route>
          <Route exact path="/users/:userId" element={<User/>}>User</Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import Signin from './pages/Signin';
import Header from './components/Header';
import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UsersPage from './pages/UsersPage';
import Profile from './pages/Profile';  
import ResetPassword from "./pages/ResetPassword"

function App() {


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/admin" element={<UsersPage />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/admin" element={<UsersPage />}/>
        <Route path="/forget-password" element={<ResetPassword />}/>
      </Routes>
    </div>
  );
}

export default App;

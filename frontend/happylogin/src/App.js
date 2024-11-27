import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Success from './pages/Success/Success';
import ConfirmEmail from './pages/ConfirmEmail/ConfirmEmail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/email" element={<ConfirmEmail/>} />
      </Routes>
    </Router>
  );
}

export default App;

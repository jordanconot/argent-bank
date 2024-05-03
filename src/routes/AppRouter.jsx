import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/HomePage';
import SignIn from '../pages/SignInPage';
import Customer from '../pages/CustomerPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<Customer />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

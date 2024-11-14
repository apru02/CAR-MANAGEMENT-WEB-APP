import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import CreateCar from './pages/CreateCar';
import EditCar from './pages/EditCar';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PrivateRoute><CarList /></PrivateRoute>} />
              <Route path="/cars/create" element={<PrivateRoute><CreateCar /></PrivateRoute>} />
              <Route path="/cars/:id" element={<PrivateRoute><CarDetail /></PrivateRoute>} />
              <Route path="/cars/:id/edit" element={<PrivateRoute><EditCar /></PrivateRoute>} />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

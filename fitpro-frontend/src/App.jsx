import { BrowserRouter, Routes, Route, Navigate }
  from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import DietPlan from './pages/DietPlan';
import GymSearch from './pages/GymSearch';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';

const AppLayout = ({ children }) => (
  <div className="flex bg-background min-h-screen">
    <Sidebar />
    <main className="flex-1 ml-64 overflow-y-auto">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#F1F5F9',
            border: '1px solid #334155',
            borderRadius: '12px',
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout><Dashboard /></AppLayout>
          </ProtectedRoute>
        }/>
        <Route path="/workouts" element={
          <ProtectedRoute>
            <AppLayout><Workouts /></AppLayout>
          </ProtectedRoute>
        }/>
        <Route path="/diet" element={
          <ProtectedRoute>
            <AppLayout><DietPlan /></AppLayout>
          </ProtectedRoute>
        }/>
        <Route path="/gyms" element={
          <ProtectedRoute>
            <AppLayout><GymSearch /></AppLayout>
          </ProtectedRoute>
        }/>
        <Route path="/profile" element={
          <ProtectedRoute>
            <AppLayout><Profile /></AppLayout>
          </ProtectedRoute>
        }/>
        <Route path="*" element={
          <Navigate to="/" replace />
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
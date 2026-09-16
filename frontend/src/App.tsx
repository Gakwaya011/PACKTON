import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <-- Import the new footer
import Loader from './components/Loader';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Track from './pages/Track';
import Blog from './pages/Blog';
import Status from './pages/Status';
import NotFound from './pages/NotFound';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import NewDelivery from './pages/dashboard/NewDelivery';
import SavedAddresses from './pages/dashboard/SavedAddresses';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOrders from './pages/admin/AdminOrders';
import AdminRiders from './pages/admin/AdminRiders';
import AdminPayments from './pages/admin/AdminPayments';
import AdminManifests from './pages/admin/AdminManifests';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import RiderLayout from './pages/rider/RiderLayout';
import Deliveries from './pages/rider/Deliveries';
import Earnings from './pages/rider/Earnings';
import ProofOfDelivery from './pages/rider/ProofOfDelivery';

// Sidebar-shell areas use a fixed, full-height sidebar (see DashboardSidebar) — a marketing
// footer sharing the same left edge would visually collide with it, so those areas skip it.
const SIDEBAR_SHELL_PREFIXES = ['/admin', '/dashboard', '/rider'];

function AppShell() {
  const location = useLocation();
  const isSidebarShell = SIDEBAR_SHELL_PREFIXES.some((prefix) => location.pathname.startsWith(prefix));

  return (
    <>
      <Loader />
      {/* We use flex-col and min-h-screen to ensure the footer is always pushed to the bottom */}
      <div className="min-h-screen flex flex-col bg-brand-white font-sans text-brand-dark antialiased">
        <Navbar />

        {/* Main Content Area (flex-grow pushes the footer down) */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/track/:orderId" element={<Track />} />
            <Route path="/status" element={<Status />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="deliveries/new" element={<NewDelivery />} />
              <Route path="addresses" element={<SavedAddresses />} />
            </Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['ADMIN']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminOrders />} />
              <Route path="riders" element={<AdminRiders />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="manifests" element={<AdminManifests />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>
            <Route
              path="/rider"
              element={
                <ProtectedRoute roles={['RIDER']}>
                  <RiderLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Deliveries />} />
              <Route path="earnings" element={<Earnings />} />
            </Route>
            <Route
              path="/rider/orders/:id/pod"
              element={
                <ProtectedRoute roles={['RIDER']}>
                  <ProofOfDelivery />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isSidebarShell && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppShell />
      </Router>
    </AuthProvider>
  );
}

export default App;

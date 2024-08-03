import "./App.css";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { AppProvider } from "./contexts";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import DashboardPage from "./pages/Dashboard";
import ScheduleAppointmentPage from "./pages/ScheduleAppointment";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <AppProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<DashboardPage />} />
            </Route>
            <Route path="/book-appointment" element={<ProtectedRoute />}>
              <Route
                path="/book-appointment/"
                element={<ScheduleAppointmentPage />}
              />
            </Route>
          </Routes>
        </AppProvider>
      </Router>
    </>
  );
}

export default App;

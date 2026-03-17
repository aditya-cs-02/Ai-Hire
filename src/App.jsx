import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import PrivateRoute from "./Components/PrivateRoute"; // Import PrivateRoute
import PublicRoute from "./Components/PublicRoute"; // Import PublicRoute
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import JobPage from "./Pages/Job/JobPage";
import JobDetailsPage from "./Pages/JobDetailsPage/JobDetailsPage";
import HRExtractionPage from "./Pages/HRExtraction/HRExtractionPage";
import EmailOutreachPage from "./Pages/AutoReach/EmailOutreachPage";
import ResumeAnalyzePage from "./Pages/ResumeAnalyze/ResumeAnalyzePage";
import SettingPage from "./Pages/Setting/SettingPage";
import LandingPage from "./LandingPage/LandingPage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import DashboardContent from "./Components/DashboardContent";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import { ToastContainer } from "react-toastify"; // Add this
import "react-toastify/dist/ReactToastify.css"; // Add this

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap Routes with AuthProvider */}
        <Routes>
          {/* Public Routes - Only accessible when not logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage type="signin" />} />
            <Route path="/signup" element={<AuthPage type="signup" />} />
          </Route>

          {/* Protected Routes - Only accessible when logged in */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route index element={<DashboardContent />} />
              <Route path="jobs" element={<JobPage />} />
              <Route path="details-page" element={<JobDetailsPage />} />
              <Route path="hr" element={<HRExtractionPage />} />
              <Route path="email-outreach" element={<EmailOutreachPage />} />
              <Route path="resume-analyze" element={<ResumeAnalyzePage />} />
              <Route path="setting" element={<SettingPage />} />
              {/* Catch-all for /dashboard/* */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
          {/* Catch-all for root-level routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;
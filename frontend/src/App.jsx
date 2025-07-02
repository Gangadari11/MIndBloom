
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import Media from "./pages/Media"
import Practice from "./pages/Practice"
import BoxBreathing from "./pages/BoxBreathing"
import BodyScan from "./pages/BodyScan"
import LovingKindness from "./pages/LovingKindness"
import MindfulWalking from "./pages/MindfulWalking"
import GratitudeReflection from "./pages/GratitudeReflection"
import VisualizationMeditation from "./pages/VisualizationMeditation"
import Counselors from "./pages/Counselors"
import ConnectCounselors from "./pages/ConnectCounselors"
import CounselorDetail from "./pages/CounselorDetail"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/30">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/media" element={<Media />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/box-breathing" element={<BoxBreathing />} />
            <Route path="/practice/body-scan" element={<BodyScan />} />
            <Route path="/practice/loving-kindness" element={<LovingKindness />} />
            <Route path="/practice/mindful-walking" element={<MindfulWalking />} />
            <Route path="/practice/gratitude-reflection" element={<GratitudeReflection />} />
            <Route path="/practice/visualization-meditation" element={<VisualizationMeditation />} />
            <Route path="/counselors" element={<Counselors />} />
            <Route path="/connect-counselors" element={<ConnectCounselors />} />
            {/* Fixed: Changed from /counselors/:counselorId to /counselor/:counselorId */}
            <Route path="/counselor/:counselorId" element={<CounselorDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Optional: Add a catch-all route for debugging */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                  <p className="text-gray-600">The page you're looking for doesn't exist.</p>
                </div>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
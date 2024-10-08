import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/ui/Navbar';
import { ThemeProvider } from './components/ui/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Sidebar } from './components/ui/Sidebar';
import HomePage from './pages/home';
import { LoginForm } from './pages/login';
import { RegisterForm } from './pages/register';
import { Dashboard } from './pages/dashboard';
import { OAuthCallback } from './pages/OAuthCallback';
import Services from './pages/services';
import Pricing from './pages/pricing';
import Team from './pages/team';
import ServicesVitrine from './pages/services-vitrine';
import NewWorkflow from './pages/new-workflow';
import Profile from './pages/profile';

function Layout() {
    const location = useLocation();
    const showNavbar = ["/", "/register", "/login", "/oauth-callback", "/pricing", "/team", "/services-vitrine", "/profile"].includes(location.pathname);
    const showSidebar = ["/services", "/dashboard", "/new-workflow"].includes(location.pathname);

    return (
        <div className="flex h-screen">
            {showSidebar && <Sidebar />}
            <div className={`flex flex-1 flex-col ${showSidebar ? 'ml-80' : ''}`}>
                {showNavbar && <Navbar />}
                <div className="flex flex-1 items-center justify-center">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/oauth-callback" element={<OAuthCallback />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/services-vitrine" element={<ServicesVitrine />} />
                        <Route path="/new-workflow" element={<NewWorkflow />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Router>
                <Layout />
                <Toaster />
            </Router>
        </ThemeProvider>
    );
}

export default App;

// hooks
import { setAppTitle } from "./hooks/useRefreshTitle";


// components
import AppBar from "./components/layout/AppBar/AppBar"
import Footer from "./components/layout/Footer/Footer"
import { Navigate, Route, Routes } from "react-router-dom"


// pages
import HomePage from "./pages/HomePage";
import WriterPage from "./pages/WriterPage";
import BlogsPage from "./pages/BlogPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import Zen from "./pages/Zen";
import ScrollToTop from "./components/layout/ScrollToTop";


// styles


// app component
function App() {
    setAppTitle("night notes");

    return (
        <>
            <AppBar />
                <ScrollToTop />

                <Routes>
                    <Route path="/" element={ <HomePage/> } />
                    <Route path="/home" element={ <Navigate to="/" replace /> } />

                    <Route path="/writer" element={ <WriterPage /> } />
                    <Route path="/about" element={ <AboutPage /> } />

                    <Route path="/blogs" element={ <HomePage/> } />
                    <Route path="/blogs/:postSlug" element={ <BlogsPage /> } />

                    <Route path="/writers/:authorSlug" element={ <BlogsPage /> } />

                    <Route path="/zen" element={ <Zen /> } />

                    <Route path="/*" element={ <NotFoundPage /> } />
                </Routes>

            <Footer />
        </>
    )
}

export default App;
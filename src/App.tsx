import React from "react";
import Layout from "./Components/Layout/Layout";
import UserPage from "./Pages/UserPage/UserPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Departure from "./Components/Departure/Departure";
import TourPackages from "./Pages/TourPackages/TourPackages";
import Trips from "./Pages/Trips/Trips";
import CarRental from "./Pages/CarRental/CarRental";
import Hotel from "./Pages/Hotel/Hotel";
import Settings from "./Pages/Settings/Settings";
import Analytics from "./Pages/Analytics/Analytics";
import Banners from "./Pages/Banners/banners";
import Testimonials from "./Pages/Testimonials/Testimonials";
import Destinations from "./Pages/Destinations/Destinations";
import CarBookings from "./Pages/CarBookings";
import Login from "./Pages/Login";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
        },
    },
});

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="" element={<Dashboard />} />
                        <Route path="users" element={<UserPage />} />
                        <Route path="departure" element={<Departure />} />
                        <Route path="packages" element={<TourPackages />} />
                        <Route path="trips" element={<Trips />} />
                        <Route path="banners" element={<Banners />} />
                        <Route path="carRental" element={<CarRental />} />
                        <Route path="carbookings" element={<CarBookings />} />
                        <Route path="hotel" element={<Hotel />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="testimonials" element={<Testimonials />} />
                        <Route path="destinations" element={<Destinations />} />
                    </Route>
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
};

export default App;

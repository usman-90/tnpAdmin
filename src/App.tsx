import React from "react";
import Layout from "./Components/Layout/Layout";
import UserPage from "./Pages/UserPage/UserPage";

// import LastTrips from './Components/LastTrips/LastTrips';
// import UserPage from './Pages/UserPage/UserPage';
import Dashboard from "./Pages/Dashboard/Dashboard";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
// import Price from './Components/Price/Price';
import Departure from "./Components/Departure/Departure";
import TourPackages from "./Pages/TourPackages/TourPackages";
import Trips from "./Pages/Trips/Trips";
import CarRental from "./Pages/CarRental/CarRental";
import Hotel from "./Pages/Hotel/Hotel";
import Settings from "./Pages/Settings/Settings";
import Analytics from "./Pages/Analytics/Analytics";

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
                    <Route path="/" element={<Layout />}>
                        <Route path="" element={<Dashboard />} />
                        <Route path="users" element={<LastTrips />} />
                        <Route path="users2" element={<UserPage />} />
                    </Route>
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
};

export default App;

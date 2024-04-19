import React from 'react';
import Layout from './Components/Layout/Layout';
import UserPage from './Pages/UserPage/UserPage';
import User from './Pages/User/User';
import LastTrips from './Components/LastTrips/LastTrips';
// import UserPage from './Pages/UserPage/UserPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";


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

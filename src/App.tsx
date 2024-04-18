import React from 'react';
import Layout from './Components/Layout/Layout';
// import UserPage from './Pages/UserPage/UserPage';
import Dashboard from './Pages/Dashboard/Dashboard';



const App: React.FC = () => {
  return (
 <Layout>
   {/* <UserPage/> */}
   <Dashboard/>
 
    </Layout>
  );
};

export default App;

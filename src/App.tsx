import React from 'react';
import Layout from './Components/Layout/Layout';
import UserPage from './Pages/UserPage/UserPage';
import User from './Pages/User/User';
import LastTrips from './Components/LastTrips/LastTrips';



const App: React.FC = () => {
  return (
 <Layout>
  <LastTrips/>
  {/* <UserPage/> */}
 
    </Layout>
  );
};

export default App;

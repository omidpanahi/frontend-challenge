import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from './containers/Home/Home';
import Signup from './containers/Signup/Signup';
import Dashboard from './containers/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AuthProvider from './stores/auth/AuthProvider';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Route path="/" exact><Home /></Route>
          <Route path="/signup" ><Signup /></Route>
          <PrivateRoute path="/dashboard"><Dashboard /></PrivateRoute>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;

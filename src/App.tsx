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

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <Route path="/" exact><Home /></Route>
        <Route path="/signup" ><Signup /></Route>
        <PrivateRoute path="/dashboard"><Dashboard /></PrivateRoute>
      </Router>
    </ChakraProvider>
  );
}

export default App;

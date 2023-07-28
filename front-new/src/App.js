import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import CustomerList from './components/Customer/CustomerList';
import CustomerForm from './components/Customer/CustomerForm';
import CustomerDetails from './components/Customer/CustomerDetails';
import ActionForm from './components/Action/ActionForm';
import LoginForm from './components/Auth/LoginForm';
import PrivateRoute from './components/Auth/PrivateRoute';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/login">Strona logowania</Link>
              </li>
              <li>
                <Link to="/">Strona główna</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <PrivateRoute exact path="/" component={CustomerList} />
            <PrivateRoute exact path="/add-customer" component={CustomerForm} />
            <PrivateRoute exact path="/customer/:customerId" component={CustomerDetails} />
            <PrivateRoute exact path="/add-action/:customerId" component={ActionForm} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;

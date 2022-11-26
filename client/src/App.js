import React, {useState} from 'react';
import { Container, Navbar,Button,Form } from 'react-bootstrap'; 
import { LinkContainer } from 'react-router-bootstrap'; 
import { Link, Route, Switch,Redirect } from 'react-router-dom';
import axios from 'axios';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import './App.css';





function App () {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem('taxi.auth') !== null;
  });
  const logIn = async (username, password) => {
    const url = '/api/log_in/';
    try {
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem(
        'taxi.auth', JSON.stringify(response.data)
      );
      setLoggedIn(true);
      return { response, isError: false };
    }
    catch (error) {
      console.error(error);
      return { response: error, isError: true };
    }
  };
  
  return (
    <>
      <Navbar bg='light' expand='lg' variant='light'>
        <LinkContainer to='/'>
          <Navbar.Brand className='logo'>Taxi</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {
            isLoggedIn && <Form inline className='ml-auto'><Button>Logout</Button></Form>
          }
        </Navbar.Collapse>
      </Navbar>
      <Container className='pt-3'>
        <Switch>
          <Route exact path='/' render={() => (
            <div className='middle-center'>
              <h1 className='landing logo'>Taxi</h1>
              {
                !isLoggedIn &&
                <Link
                  id='signUp'
                  className='btn btn-success'
                  to='/sign-up'>Sign up</Link>
              }
              {
                !isLoggedIn &&
                <Link
                  id='logIn'
                  className='btn btn-dark'
                  to='/log-in'>Log In</Link>
              }          
            </div>
          )} />
          <Route path='/sign-up' render={() => isLoggedIn?
            (<Redirect to='/'/>):
            (<SignUp/>)
            } />
          <Route path='/log-in' render={() => (isLoggedIn ?
            (<Redirect to='/' />) : 
            (<LogIn logIn={logIn} />))} 
          />        
      </Switch>
      </Container>
    </>
  );
}

export default App;
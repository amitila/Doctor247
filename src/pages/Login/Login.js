import React, { Component } from 'react';
import './../../App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import logo from './../../assets/logo.jpg';

class Login extends Component {

  render() {
      return (
        <div className="App">
          <div className="landing">
            <div className="dark-overlay">
              <div className="landing-inner">
                <div>
                  <img
                    src={logo}
                    className='rounded-circle logo-border'
                    alt='logo'
                    width={150}
                    height={150}
                  />
                </div>
                <h1>Online Medical Treatment System</h1>
                <Form>
                  <Form.Group>
                    <Form.Control type='text' placeholder='Username' name='username' required />
                  </Form.Group>
                  <br />
                  <Form.Group>
                    <Form.Control type='text' placeholder='Password' name='password' required />
                  </Form.Group>
                  <br />
                  <Button variant='success' type='submit'>Login</Button>
                </Form>
                <br />
                <p>
                  <Link to='/forgotPassword'>
                    Forgot password ?
                  </Link>
                </p>
                <p>
                  Don't have an account? &nbsp;
                  <Link to='/register'>
                    <Button variant='info' size='sm' className='ml-2'>Register</Button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Login;

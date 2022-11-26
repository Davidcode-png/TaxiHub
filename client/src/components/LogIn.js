import React,{useState} from 'react';
import { Link,Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert,Breadcrumb, Card, Col, Row , Form, Button} from 'react-bootstrap';

function LogIn (props) {
  // const [isSubmitted,setSubmitted] = useState(false);
  const onSubmit = async (values, actions) => {
    try {
      const { response, isError } = await props.logIn(
        values.username,
        values.password
      );
      if (isError) {
        const data = response.response.data;
        for (const value in data) {
          actions.setFieldError(value, data[value].join(' '));
        }
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      actions.setSubmitting(false);
    }
  }
  // if(isSubmitted){
  //   return <Redirect to = '/' />;
  // }
  return (
    <Row>
      <Col lg={12}>
        <Breadcrumb>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Log in</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>Log in</Card.Header>
          <Card.Body>
          <Formik initialValues={{
            username: '',
            password:''
          }}
            onSubmit={onSubmit}>
              {({errors,handleChange,handleSubmit,isSubmitting,values}) => (
                <>
                {
                    '__all__' in errors &&
                    <Alert variant='danger'>
                      { errors['__all__'] }
                    </Alert>
                  }
                <Form noValidate onSubmit = {handleSubmit}>
                  <Form.Group controlId='username'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control name='username' onChange={handleChange} value={values.username}/>
                  </Form.Group>
                  <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control name='password' type='password'  onChange={handleChange} value={values.password}/>
                  </Form.Group>
                  <Button block type='submit' variant='danger' className='mt-4'>Log in</Button>
                </Form>
                </>
              )}
            </Formik>
          </Card.Body>
          <p className='mt-3 text-center'>
            Don't have an account? <Link to='/sign-up'>Sign up!</Link>
          </p>
        </Card>
      </Col>
    </Row>
  );
}

export default LogIn;
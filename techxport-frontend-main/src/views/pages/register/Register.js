/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/j2

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/j2/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import { useNavigate } from 'react-router-dom'

// reactstrap components
import {
  Button,
  Card,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap'

// core components

function Register() {
  const navigate = useNavigate()
  return (
    <>
      <div
        className="section section-image"
        style={{
          padding: 0,
        }}
      >
        <Container style={{ margin: 0, padding: 0 }}>
          <Row>
            <Col className="mx-auto" lg="12" md="12">
              <Card
                className="card-register"
                style={{
                  maxWidth: '100%',
                  margin: 0,
                  padding: 0,
                  background: 'rgb(37, 176, 108,0.7)',
                }}
              >
                <h3 className="title mx-auto" style={{ marginTop: 10, marginBottom: 10 }}>
                  Login
                </h3>

                <Form className="register-form" style={{ padding: 10 }}>
                  <label>Email</label>
                  <InputGroup className="form-group-no-border">
                    <Input placeholder="Email" type="email" />
                  </InputGroup>
                  <label>Password</label>
                  <InputGroup className="form-group-no-border">
                    <Input placeholder="Password" type="password" />
                  </InputGroup>
                  <label>Confirm password</label>
                  <InputGroup className="form-group-no-border">
                    <Input placeholder="Password" type="password" />
                  </InputGroup>
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                    style={{ background: 'rgb(37, 176, 108,0.7)', borderColor: 'white' }}
                  >
                    Register
                  </Button>
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    type="button"
                    onClick={navigate('login')}
                    style={{ background: 'rgb(37, 176, 108,0.7)', borderColor: 'white' }}
                  >
                    login
                  </Button>
                </Form>
                <div className="forgot">
                  <Button
                    style={{}}
                    className="btn-link"
                    color="danger"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>{' '}
    </>
  )
}

export default Register

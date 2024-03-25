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
import React, { useEffect, useState } from 'react'
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
import ApiServices from 'src/services/apiservices'
import { login, register, verifyOtp, resendOtp, resetPassword } from '../../../action/auth'
import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_MESSAGE, DELETE_TEMP } from 'src/action/type'
import AuthService from 'src/services/auth'
// core components
// login

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

function Login() {
  const navigate = useNavigate()
  const [showedPage, setShowedPage] = useState('Login')
  const [errmessage, setMessage] = useState('')
  const [forgot1, setForgot1] = useState(false)
  const [forgot, setForgot] = useState({
    mail_id: '',
    otp: '',
    password: '',
    confirmpassword: '',
  })
  const [loginForm, setLoginForm] = useState({
    mail_id: '',
    password: '',
  })
  const [registerForm, setRegisterForm] = useState({
    mail_id: '',
    password: '',
    confirmPassword: '',
  })
  const [verify, setverifyOtp] = useState({
    mail_id: '',
    Otp: '',
  })
  const { isLoggedIn, gotoVerifyed, refresh, sendType, UpdatePasswordSuccess, resendMail } =
    useSelector((state) => state.auth)
  const { message } = useSelector((state) => state.message)

  const dispatch = useDispatch()

  useEffect(() => {
    setShowedPage('Login')
  }, [])
  useEffect(() => {
    if (gotoVerifyed) {
      setverifyOtp({
        mail_id: registerForm.mail_id,
        otp: '',
      })
      setShowedPage('Verify Mail')
      setMessage('')
    }
    if (sendType == 'forgotPassword' && !UpdatePasswordSuccess) {
      setForgot1(true)
      setMessage('')
    }
    if (resendMail && loginForm.mail_id != '') {
      handleOTPResend(loginForm.mail_id, '')
      setverifyOtp({
        mail_id: loginForm.mail_id,
        otp: '',
      })
      setShowedPage('Verify Mail')
      setMessage('')
    }
    setTimeout(() => {
      setMessage(message)
    }, 1000)
  }, [message])

  useEffect(() => {
    if (UpdatePasswordSuccess) {
      setShowedPage('Success')

      // setMessage()
    }
  }, [UpdatePasswordSuccess])

  let handleLoginSubmit = (email, password) => {
    if (email != '' && password != '') {
      dispatch(login(email, password))
        .then((data) => {
          setLoginForm({
            mail_id: '',
            password: '',
          })
          setTimeout(() => {
            if (AuthService.isLoggedIn) {
              // window.location.reload()
              navigate("/default/dashboard");
            }
          }, 1000)
          // window.location.reload()
        })
        .catch(() => {})
    } else {
      setMessage('Password and Email required')
    }
  }
  let handleRegisterSubmit = (email, password, cpassword) => {
    // return
    if (password == cpassword) {
      dispatch(register(email, password))
        .then((data) => {
        })
        .catch(() => {
          setMessage(message)
        })
    } else {
      setMessage('Password and Confirm password must be same')
    }
  }
  let handleOTPSubmit = (email, otp) => {
    dispatch(verifyOtp(email, verify.Otp))
      .then(() => {
        setverifyOtp({
          mail_id: '',
          Otp: '',
        })
        setMessage(message)
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1000)
      })
      .catch(() => {
        setMessage(message)
      })
  }
  let handleResetPassword = (forgot) => {
    if (forgot.password == forgot.confirmpassword && forgot.password != '') {
      dispatch(resetPassword(forgot.mail_id, forgot.password, forgot.otp))
        .then(() => {
          setMessage(message)
        })
        .catch(() => {
          setMessage(message)
        })
    } else {
      setMessage('Password and Confirm password must be same')
    }
  }
  let handleOTPResend = (email, otp, type = 'Resend') => {
    dispatch(resendOtp(email, otp, type))
      .then(() => {
        setMessage(message)
      })
      .catch(() => {
        setMessage(message)
      })
  }

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
                  maxWidth: "100%",
                  margin: 0,
                  padding: 0,
                  background: "#ffffff",
                }}
              >
                {showedPage && !refresh && (
                  <h3
                    className="title mx-auto"
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      color: "rgba(0,0,0) !important",
                      fontWeight: 600,
                    }}
                  >
                    {showedPage}
                  </h3>
                )}
                {showedPage == "Verify Mail" && refresh && (
                  <h3
                    className="title mx-auto"
                    style={{ marginTop: 10, marginBottom: 10 }}
                  >
                    {"Success"}
                  </h3>
                )}

                {showedPage == "Login" && (
                  <Form
                    className="register-form"
                    style={{
                      padding: 10,
                      paddingTop: 0,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    <h4
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                        color: "red",
                        marginTop: 0,
                      }}
                    >
                      {errmessage}
                    </h4>
                    <label
                      style={{ color: "#000", marginLeft: 10, marginBottom: 5 }}
                    >
                      Email Address
                    </label>
                    <InputGroup className="form-group-no-border">
                      <Input
                        placeholder="Email Address"
                        type="email"
                        validations={[required]}
                        style={{
                          border: "1px solid rgba(0,0,0,0.1) !important",
                        }}
                        onChange={(event) => {
                          setLoginForm({
                            mail_id: event.target.value,
                            password: loginForm.password,
                          });
                        }}
                        value={loginForm.mail_id}
                      />
                    </InputGroup>
                    <label
                      style={{ color: "#000", marginLeft: 10, marginBottom: 5 }}
                    >
                      Password
                    </label>
                    <InputGroup className="form-group-no-border">
                      <Input
                        placeholder="Password"
                        type="password"
                        validations={[required]}
                        onChange={(event) => {
                          setLoginForm({
                            mail_id: loginForm.mail_id,
                            password: event.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                    <Button
                      block
                      className="btn-round btn2"
                      color="primary"
                      type="button"
                      onClick={() => {
                        handleLoginSubmit(
                          loginForm.mail_id,
                          loginForm.password
                        );
                      }}
                    >
                      <span style={{ textTransform: "capitalize" }}>Login</span>
                    </Button>
                    <Button
                      block
                      className="btn-round btn2"
                      color="danger"
                      type="button"
                      onClick={() => {
                        setShowedPage("Register");
                      }}
                      style={{
                        background: "rgb(37, 176, 108,0.7)",
                        borderColor: "white",
                        width: "auto !important",
                        marginTop: 5,
                      }}
                    >
                      <span style={{ textTransform: "capitalize" }}>
                        Register
                      </span>
                    </Button>
                  </Form>
                )}
                {showedPage == "Register" && (
                  <Form
                    className="register-form"
                    style={{ padding: 10, paddingTop: 0, marginTop: 0 }}
                  >
                    <h4
                      style={{
                        fontSize: 12,
                        textAlign: "center",
                        color: "red",
                        marginTop: 0,
                      }}
                    >
                      {errmessage}
                    </h4>
                    <label>Email</label>
                    <InputGroup className="form-group-no-border">
                      <Input
                        placeholder="Email"
                        type="email"
                        validations={[required]}
                        onChange={(event) => {
                          setRegisterForm({
                            mail_id: event.target.value,
                            password: registerForm.password,
                            confirmPassword: registerForm.confirmPassword,
                          });
                        }}
                        value={registerForm.mail_id}
                      />
                    </InputGroup>
                    <label>Password</label>
                    <InputGroup className="form-group-no-border">
                      <Input
                        placeholder="Password"
                        type="password"
                        validations={[required]}
                        onChange={(event) => {
                          setRegisterForm({
                            mail_id: registerForm.mail_id,
                            password: event.target.value,
                            confirmPassword: registerForm.confirmPassword,
                          });
                        }}
                      />
                    </InputGroup>
                    <label>Confirm Password</label>
                    <InputGroup className="form-group-no-border">
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        validations={[required]}
                        onChange={(event) => {
                          setRegisterForm({
                            mail_id: registerForm.mail_id,
                            password: registerForm.password,
                            confirmPassword: event.target.value,
                          });
                        }}
                      />
                    </InputGroup>
                    <Button
                      block
                      className="btn-round btn2"
                      color="danger"
                      type="button"
                      style={{
                        background: "rgb(37, 176, 108,0.7)",
                        borderColor: "white",
                      }}
                      onClick={() => {
                        handleRegisterSubmit(
                          registerForm.mail_id,
                          registerForm.password,
                          registerForm.confirmPassword
                        );
                      }}
                    >
                      <span
                        style={{ textTransform: "capitalize", fontSize: 18 }}
                      >
                        {" "}
                        Register
                      </span>
                    </Button>
                    <Button
                      block
                      className="btn-round btn2"
                      color="danger"
                      type="button"
                      onClick={() => {
                        setShowedPage("Login");
                      }}
                      style={{
                        background: "rgb(37, 176, 108,0.7)",
                        borderColor: "white",
                      }}
                    >
                      <span
                        style={{ textTransform: "capitalize", fontSize: 18 }}
                      >
                        Back to Login
                      </span>
                    </Button>
                  </Form>
                )}

                {showedPage == "Forgot Password" && (
                  <>
                    <Form
                      className="register-form"
                      style={{ padding: 10, paddingTop: 0, marginTop: 0 }}
                    >
                      <h4
                        style={{
                          fontSize: 12,
                          textAlign: "center",
                          color: "red",
                          marginTop: 0,
                        }}
                      >
                        {errmessage}
                      </h4>
                      <label>Email</label>
                      <InputGroup className="form-group-no-border">
                        <Input
                          placeholder="Email"
                          type="email"
                          validations={[required]}
                          onChange={(event) => {
                            setForgot({
                              mail_id: event.target.value,
                            });
                          }}
                          disabled={forgot1}
                        />
                      </InputGroup>
                      {forgot1 && (
                        <>
                          <InputGroup className="form-group-no-border">
                            <Input
                              placeholder="OTP"
                              type="OTP"
                              validations={[required]}
                              onChange={(event) => {
                                setForgot({
                                  mail_id: forgot.mail_id,
                                  otp: event.target.value,
                                  password: forgot.password,
                                  confirmpassword: forgot.confirmpassword,
                                });
                              }}
                              disabled={!forgot1}
                            />
                          </InputGroup>

                          <InputGroup className="form-group-no-border">
                            <Input
                              placeholder="Password"
                              type="password"
                              validations={[required]}
                              onChange={(event) => {
                                setForgot({
                                  mail_id: forgot.mail_id,
                                  otp: forgot.otp,
                                  password: event.target.value,
                                  confirmpassword: forgot.confirmpassword,
                                });
                              }}
                              disabled={!forgot1}
                            />
                          </InputGroup>
                          <InputGroup className="form-group-no-border">
                            <Input
                              placeholder="Confirm Password"
                              type="password"
                              validations={[required]}
                              onChange={(event) => {
                                setForgot({
                                  mail_id: forgot.mail_id,
                                  otp: forgot.otp,
                                  password: forgot.password,
                                  confirmpassword: event.target.value,
                                });
                              }}
                              disabled={!forgot1}
                            />
                          </InputGroup>
                        </>
                      )}
                      <Button
                        block
                        className="btn-round btn2"
                        color="danger"
                        type="button"
                        style={{
                          background: "rgb(37, 176, 108,0.7)",
                          borderColor: "white",
                        }}
                        onClick={() =>
                          forgot1
                            ? handleResetPassword(forgot)
                            : handleOTPResend(
                                forgot.mail_id,
                                "",
                                "forgotPassword"
                              )
                        }
                      >
                        <span
                          style={{ textTransform: "capitalize", fontSize: 18 }}
                        >
                          {" "}
                          {!forgot1 ? "Reset Password" : "Forgot"}{" "}
                        </span>
                      </Button>
                    </Form>
                  </>
                )}

                {showedPage == "Verify Mail" && (
                  <>
                    {!refresh && (
                      <p style={{ textAlign: "center", marginBottom: 0 }}>
                        Please enter otp recived on {verify.mail_id}
                      </p>
                    )}
                    {refresh && (
                      <p style={{ textAlign: "center", marginBottom: 0 }}>
                        {errmessage}
                      </p>
                    )}
                    <Form
                      className="register-form"
                      style={{ padding: 10, paddingTop: 0, marginTop: 0 }}
                    >
                      {!refresh && (
                        <>
                          <label>Otp</label>
                          <InputGroup className="form-group-no-border">
                            <Input
                              placeholder="Otp"
                              type="Otp"
                              validations={[required]}
                              onChange={(event) => {
                                setverifyOtp({
                                  Otp: event.target.value,
                                  mail_id: verify.mail_id,
                                });
                              }}
                              value={verify.Otp}
                            />
                          </InputGroup>
                        </>
                      )}
                      {!refresh && (
                        <>
                          <Button
                            block
                            className="btn-round btn2"
                            color="danger"
                            type="button"
                            style={{
                              background: "rgb(37, 176, 108,0.7)",
                              borderColor: "white",
                            }}
                            onClick={() => {
                              handleOTPSubmit(verify.mail_id, verify.otp);
                            }}
                          >
                            <span
                              style={{
                                textTransform: "capitalize",
                                fontSize: 18,
                              }}
                            >
                              {" "}
                              Verify{" "}
                            </span>
                          </Button>
                          <Button
                            block
                            className="btn-round btn2"
                            color="danger"
                            type="button"
                            style={{
                              background: "rgb(37, 176, 108,0.7)",
                              borderColor: "white",
                            }}
                            onClick={() => {
                              handleOTPResend(verify.mail_id, "");
                            }}
                          >
                            <span
                              style={{
                                textTransform: "capitalize",
                                fontSize: 18,
                              }}
                            >
                              {" "}
                              Resend{" "}
                            </span>
                          </Button>
                        </>
                      )}
                      {refresh && (
                        <Button
                          block
                          className="btn-round btn2"
                          color="danger"
                          type="button"
                          style={{
                            background: "rgb(37, 176, 108,0.7)",
                            borderColor: "white",
                          }}
                          onClick={() => {
                            setShowedPage("Login");
                            setMessage("");
                            dispatch({
                              type: DELETE_TEMP,
                            });
                          }}
                        >
                          <span
                            style={{
                              textTransform: "capitalize",
                              fontSize: 18,
                            }}
                          >
                            Login
                          </span>
                        </Button>
                      )}
                    </Form>
                  </>
                )}
                {showedPage == "Success" && (
                  <>
                    <p style={{ textAlign: "center", marginBottom: 0 }}>
                      {errmessage}
                    </p>
                    <Form
                      className="register-form"
                      style={{ padding: 10, paddingTop: 0, marginTop: 0 }}
                    >
                      <Button
                        block
                        className="btn-round btn2"
                        color="danger"
                        type="button"
                        style={{
                          background: "rgb(37, 176, 108,0.7)",
                          borderColor: "white",
                        }}
                        onClick={() => {
                          setMessage("");
                          setShowedPage("Login");
                          dispatch({
                            type: DELETE_TEMP,
                          });
                        }}
                      >
                        <span
                          style={{ textTransform: "capitalize", fontSize: 18 }}
                        >
                          Login
                        </span>
                      </Button>
                    </Form>
                  </>
                )}
                {(showedPage == "Login" || showedPage == "Register") && (
                  <div className="forgot">
                    <Button
                      style={{
                        marginTop: 0,
                        color: "white !important",
                        border: "none !important",
                      }}
                      className="btn-link btn-link2 forgotLink"
                      href="#pablo"
                      uppercase="false"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowedPage("Forgot Password");
                      }}
                    >
                      <span
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        Forgot password?
                      </span>
                    </Button>
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>{" "}
    </>
  );
}

export default Login

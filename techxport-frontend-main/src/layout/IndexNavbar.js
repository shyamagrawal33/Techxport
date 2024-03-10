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
// nodejs library that concatenates strings
import classnames from 'classnames'
// reactstrap components
import { Button, Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCol,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import Login from 'src/views/pages/login/Login'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'src/action/auth'
import AuthService from 'src/services/auth'
import { CLEAR_MESSAGE, DELETE_TEMP } from 'src/action/type'
import CIcon from '@coreui/icons-react'
import { cilX, cilXCircle } from '@coreui/icons'

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState('navbar-transparent')
  const [activeLink, setActiveLink] = React.useState(1)
  const [navbarCollapse, setNavbarCollapse] = React.useState(false)
  const [visible, setVisible] = useState(false)
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse)
    document.documentElement.classList.toggle('nav-open')
  }
  const { isLoggedIn } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let handleClick = () => {
    if (isLoggedIn) {
      navigate('/default')
    } else {
      openLogin()
    }
  }
  let openLogin = () => {
    console.log(isLoggedIn)
    if (isLoggedIn) {
      dispatch(logout())
      // isLoggedIn = false
    } else {
      setVisible(true)
      setActiveLink(6)
    }
  }
  React.useEffect(() => {
    console.log(isLoggedIn, 'fromlogout')
  }, [isLoggedIn])
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (document.documentElement.scrollTop > 299 || document.body.scrollTop > 299) {
        setNavbarColor('')
      } else if (document.documentElement.scrollTop < 300 || document.body.scrollTop < 300) {
        setNavbarColor('navbar-transparent')
      }
    }

    window.addEventListener('scroll', updateNavbarColor)

    return function cleanup() {
      window.removeEventListener('scroll', updateNavbarColor)
    }
  })
  return (
    <Navbar className={classnames('fixed-top', navbarColor)} expand="lg">
      <Container style={{ display: 'flex' }}>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            target="_blank"
            title="Coded by Creative Tim"
            style={{
              margin: 0,
              padding: 0,
              paddingLeft: 12,
            }}
          >
            <img alt="..." src={require('../assets/img/logo.png')} style={{ width: '8em' }} />
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames('navbar-toggler navbar-toggler', {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
            style={{ boxShadow: 'none !important' }}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse className="justify-content-end" navbar isOpen={navbarCollapse}>
          <Nav navbar>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="#"
                target="_blank"
                title="Follow us on Twitter"
              >
                <p
                  style={{ textTransform: 'capitalize' }}
                  className={'nav-item' + (activeLink === 1 ? ' active_item' : '')}
                  onClick={() => {
                    setActiveLink(1)
                  }}
                >
                  Home
                </p>
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink data-placement="bottom" href="#" target="_blank" title="Like us on Facebook">
                <p
                  className={'nav-item' + (activeLink === 2 ? ' active_item' : '')}
                  onClick={() => {
                    setActiveLink(2)
                  }}
                >
                  Products
                </p>
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="#"
                target="_blank"
                title="Follow us on Instagram"
              >
                <p
                  className={'nav-item' + (activeLink === 3 ? ' active_item' : '')}
                  style={{ textTransform: 'capitalize' }}
                  onClick={() => {
                    setActiveLink(3)
                    // setTimeout(() => {
                    const element = document.getElementById('company')
                    element.scrollIntoView({ behavior: 'smooth' })
                    // }, 1000)
                  }}
                >
                  Company
                </p>
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink data-placement="bottom" href="#" target="_blank" title="Star on GitHub">
                <p
                  className={'nav-item' + (activeLink === 4 ? ' active_item' : '')}
                  onClick={() => {
                    setActiveLink(4)
                  }}
                >
                  Pricing
                </p>
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="#" target="_blank">
                <p
                  className={'nav-item' + (activeLink === 5 ? ' active_item' : '')}
                  style={{ textTransform: 'capitalize' }}
                  onClick={() => {
                    setActiveLink(5)
                    // setTimeout(() => {
                    // 👇️ redirects to an external URL
                    window.location.replace('https://codefrontend.com')
                    // }, 3000)
                  }}
                >
                  Watch Demo
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" target="_blank">
                <p
                  className={'nav-item' + (activeLink === 6 ? ' active_item' : '')}
                  onClick={openLogin}
                  style={{ margin: 0, textTransform: 'capitalize' }}
                >
                  {isLoggedIn ? 'Logout' : 'Login'}
                </p>
              </NavLink>
            </NavItem>
            <NavItem>
              <Button
                className="btn-round2 btn-round"
                color="danger"
                onClick={handleClick}
                target="_blank"
              >
                <p
                  style={{
                    color: '#47E0FE',
                    fontWeight: 600,
                    fontSize: 12,
                    margin: 0,
                    textTransform: 'capitalize',
                  }}
                >
                  Get Started
                </p>
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
      {/* <CCol xs={12}> */}
      {/* <CButton onClick={() => setVisible(!visible)}>Launch static backdrop modal</CButton> */}
      <CModal
        visible={visible}
        onClose={() => {
          dispatch({
            type: DELETE_TEMP,
          })
          dispatch({
            type: CLEAR_MESSAGE,
          })
          setVisible(false)
        }}
      >
        <CModalBody style={{ padding: 0, position: 'relative' }}>
          <CButton
            onClick={() => setVisible(!visible)}
            style={{
              position: 'absolute',
              zIndex: 1000,
              right: '-15px',
              top: '-15px',
              marginRight: 0,
              padding: 5,
              height: 30,
              width: 30,
              borderRadius: '50%',
              border: '1px solid',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CIcon icon={cilX} height={20} />
          </CButton>
          <Login></Login>
        </CModalBody>
      </CModal>
      {/* </CCol> */}
    </Navbar>
  )
}

export default IndexNavbar

import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import UnAuthGuard from './guards/UnAuthGuards'
import AuthGuard from './guards/AuthGuards'
import AuthService from './services/auth'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const IndexPage = React.lazy(() => import('./layout/index'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const AuthRoutes = [
  <Route
    key="default"
    exact
    path="/default/*"
    name="Page 500"
    element={<AuthGuard component={<DefaultLayout />} />}
  />,
]

const UnAuthRoutes = [
  <Route key="Login" path="/login" element={<UnAuthGuard component={<Login />} />}></Route>,
  <Route key="*" path="/" name="Home" element={<UnAuthGuard component={<IndexPage />} />} />,
]
if (localStorage.getItem('user')) {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user.token) {
    AuthService.isLoggedIn = true
  } else {
    AuthService.isLoggedIn = false
  }
}
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            {AuthRoutes}
            {UnAuthRoutes}
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App

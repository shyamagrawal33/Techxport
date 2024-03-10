import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import AuthService from '../services/auth';
import PropTypes from 'prop-types'
import AuthService from 'src/services/auth'
const UnAuthGuard = ({ component }) => {
  const [status, setStatus] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    checkToken()
  }, [component])

  const checkToken = async () => {
    try {
      let user = await AuthService.getUser()
      //   let user = true
      if (!user) {
        localStorage.removeItem('token')
      } else {
        navigate(`/`)
      }
      setStatus(true)
    } catch (error) {
      navigate(`/`)
    }
  }

  return status ? <React.Fragment>{component}</React.Fragment> : <React.Fragment></React.Fragment>
}

UnAuthGuard.propTypes = {
  component: PropTypes.any,
}
export default UnAuthGuard

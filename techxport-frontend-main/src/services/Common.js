import { AuthInterceptor } from './AuthInterceptor'
import AuthService from './auth'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  HIDE_LOADING,
} from '../action/type.js'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ApiServices from './apiservices'

const Common = () => {}
Common.getErrors = (response, dispatch, navigate) => {
  if (
    response.data &&
    response.data.StatusCode == 0 &&
    (response?.data?.Status.includes('Invalid token') ||
      response?.data?.Status.includes('Token decoding failed') ||
      response?.data?.Status.includes('Signature expired. Please log in again.'))
  ) {
    ApiServices.logout()
    AuthService.isLoggedIn = false
    dispatch({
      type: LOGOUT,
      payload: { isLoggedIn: false },
    })
    setTimeout(() => {
      if (!AuthService.isLoggedIn) {
        navigate('/')
      }
    }, 100)
    return false
  }
  if (response.code == 'ERR_NETWORK') {
    alert('network Error please try again')
    dispatch({
      type: HIDE_LOADING,
    })
  }
  if (response.code == 'ERR_BAD_REQUEST') {
    alert(response.response.statusText)
    dispatch({
      type: HIDE_LOADING,
    })
  } else {
    return true
  }
}
export default Common

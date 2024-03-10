import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  OTP_VERIFYED_SUCCESS,
  OTP_VERIFYED_FAILED,
  OTP_SEND_SUCCESS,
  OTP_SEND_FAILED,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  DELETE_TEMP,
  COUNTRY_SUCCESS,
  FORMS_SUCCESS,
} from '../action/type'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        gotoVerifyed: true,
      }
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        gotoVerifyed: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        resendMail: payload.resendMail || false,
      }
    case OTP_VERIFYED_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        refresh: true,
      }
    case OTP_VERIFYED_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    case OTP_SEND_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        sendType: payload,
      }
    case OTP_SEND_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    case UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        UpdateSuccess: true,
      }
    case UPDATE_COMPANY_FAIL:
      return {
        ...state,
        isInvalidToken: payload.isInvalidToken,
      }
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        UpdatePasswordSuccess: true,
      }
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        UpdatePasswordSuccess: false,
      }
    case DELETE_TEMP: {
      if (state.auth) {
        delete state.auth['gotoVerifyed']
        delete state.auth['refresh']
        delete state.auth['sendType']
        delete state.auth['UpdateSuccess']
        delete state.auth['UpdatePasswordSuccess']
        delete state.auth['resendMail']
      } else {
        delete state['gotoVerifyed']
        delete state['refresh']
        delete state['sendType']
        delete state['UpdateSuccess']
        delete state['UpdatePasswordSuccess']
        delete state['resendMail']
      }
      return {
        ...state,
      }
    }
    case COUNTRY_SUCCESS: {
      return {
        ...state,
        country: payload,
      }
    }
    case FORMS_SUCCESS: {
      return {
        ...state,
        forms: payload,
      }
    }

    default:
      return state
  }
}

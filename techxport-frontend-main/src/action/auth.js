import ApiServices from 'src/services/apiservices'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  OTP_VERIFYED_SUCCESS,
  OTP_VERIFYED_FAILED,
  OTP_SEND_SUCCESS,
  OTP_SEND_FAILED,
  UPDATE_COMPANY_FAIL,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  HIDE_LOADING,
  SHOW_LOADING,
  COUNTRY_SUCCESS,
  COUNTRY_FAIL,
  STATE_SUCCESS,
  STATE_FAIL,
} from './type'
import AuthService from 'src/services/auth'

// import A from '../services/apiservices'
export const register = (email, password) => (dispatch) => {
  console.log(dispatch)
  dispatch({
    type: SHOW_LOADING,
  })
  return ApiServices.register(email, password).then(
    (response) => {
      dispatch({
        type: HIDE_LOADING,
      })
      console.log(response)
      if (response.data.StatusCode == 1) {
        dispatch({
          type: REGISTER_SUCCESS,
        })
      }
      console.log(response.data.Status)
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.Status,
      })
    },
    (error) => {
      dispatch({
        type: HIDE_LOADING,
      })
      const message =
        (error.response && error.response.data && error.response.data.Status) ||
        error.message ||
        error.toString()
      dispatch({
        type: REGISTER_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })
      return Promise.reject()
    },
  )
}

export const verifyOtp = (email, otp) => (dispatch) => {
  console.log(dispatch)
  dispatch({
    type: SHOW_LOADING,
  })
  return ApiServices.verifyOtp(email, otp).then(
    (response) => {
      dispatch({
        type: HIDE_LOADING,
      })
      if (response.data.StatusCode == 1) {
        dispatch({
          type: OTP_VERIFYED_SUCCESS,
        })
      }
      dispatch({
        type: SET_MESSAGE,
        payload: response.data.Status,
      })
    },
    (error) => {
      dispatch({
        type: HIDE_LOADING,
      })
      const message =
        (error.response && error.response.data && error.response.data.Status) ||
        error.message ||
        error.toString()
      dispatch({
        type: OTP_VERIFYED_FAILED,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })
      return Promise.reject()
    },
  )
}

export const getCountry = () => (dispatch) => {
  dispatch({
    type: SHOW_LOADING,
  })
  return ApiServices.getCountry().then(
    (response) => {
      dispatch({
        type: HIDE_LOADING,
      })
      if (response.data.StatusCode == 1) {
        dispatch({
          type: COUNTRY_SUCCESS,
          payload: response,
        })
      }
    },
    (error) => {
      dispatch({
        type: HIDE_LOADING,
      })
      const message =
        (error.response && error.response.data && error.response.data.Status) ||
        error.message ||
        error.toString()
      dispatch({
        type: COUNTRY_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })
      return Promise.reject()
    },
  )
}

export const getState = (country) => (dispatch) => {
  dispatch({
    type: SHOW_LOADING,
  })
  return ApiServices.getState(country).then(
    (response) => {
      dispatch({
        type: HIDE_LOADING,
      })
      if (response.data.StatusCode == 1) {
        dispatch({
          type: STATE_SUCCESS,
        })
      }
    },
    (error) => {
      dispatch({
        type: HIDE_LOADING,
      })
      const message =
        (error.response && error.response.data && error.response.data.Status) ||
        error.message ||
        error.toString()
      dispatch({
        type: STATE_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })
      return Promise.reject()
    },
  )
}

export const resendOtp =
  (mail_id, otp = '', type1) =>
  (dispatch) => {
    console.log(dispatch)
    dispatch({
      type: SHOW_LOADING,
    })
    return ApiServices.resendOtp(mail_id, otp).then(
      (response) => {
        dispatch({
          type: HIDE_LOADING,
        })
        if (response.data.StatusCode == 1) {
          dispatch({
            type: OTP_SEND_SUCCESS,
            payload: type1,
          })
        }
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.Status,
        })
      },
      (error) => {
        dispatch({
          type: HIDE_LOADING,
        })
        const message =
          (error.response && error.response.data && error.response.data.Status) ||
          error.message ||
          error.toString()
        dispatch({
          type: OTP_SEND_FAILED,
        })

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        })
        return Promise.reject()
      },
    )
  }
export const login =
  (email, password, showLoader = true) =>
  (dispatch) => {
    console.log(dispatch)
    dispatch({
      type: SHOW_LOADING,
    })
    return ApiServices.login(email, password).then(
      (response) => {
        dispatch({
          type: HIDE_LOADING,
        })
        console.log(response, 'response')
        if (response.StatusCode == 1) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: response },
          })
        } else {
          if (response.Status == 'Email Verification is not completed. Please verify otp first.') {
            dispatch({
              type: LOGIN_FAIL,
              payload: { resendMail: true },
            })
            dispatch({
              type: SET_MESSAGE,
              payload: response.Status,
            })
          } else {
            dispatch({
              type: SET_MESSAGE,
              payload: response.Status,
            })
          }
        }

        return Promise.resolve()
      },
      (error) => {
        dispatch({
          type: HIDE_LOADING,
        })
        const message =
          (error.response && error.response.data && error.response.data.Status) ||
          error.message ||
          error.toString()
        console.log(error)
        dispatch({
          type: LOGIN_FAIL,
        })

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        })
        return Promise.reject()
      },
    )
  }

export const updateCompany = (mail_id, password, otp) => (dispatch) => {
  dispatch({
    type: SHOW_LOADING,
  })
  return ApiServices.updateCompany(mail_id, password, otp).then(
    (response) => {
      dispatch({
        type: HIDE_LOADING,
      })
      console.log(response, 'response')
      if (response.data.StatusCode == 1) {
        dispatch({
          type: UPDATE_COMPANY_SUCCESS,
          payload: { UpdateSuccess: true },
        })
      } else {
        if (
          response.data.Status.includes('Invalid token') ||
          response.data.Status.includes('Token decoding failed') ||
          response.data.status.includes('Signature expired. Please log in again.')
        ) {
          //   alert(response.data.Status)
          dispatch({
            type: UPDATE_COMPANY_FAIL,
            payload: { isInvalidToken: true },
          })
          //   logout()
        } else {
          dispatch({
            type: SET_MESSAGE,
            payload: response.Status,
          })
        }
      }

      return Promise.resolve()
    },
    (error) => {
      dispatch({
        type: HIDE_LOADING,
      })
      const message =
        (error.response && error.response.data && error.response.data.Status) ||
        error.message ||
        error.toString()
      dispatch({
        type: UPDATE_COMPANY_FAIL,
        payload: { isInvalidToken: false },
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })
      return Promise.reject()
    },
  )
}

export const logout = () => (dispatch) => {
  ApiServices.logout()
  AuthService.isLoggedIn = false
  dispatch({
    type: LOGOUT,
    payload: { isLoggedIn: false },
  })
}
export const resetPassword = (mail, otp, password) => (dispatch) => {
  dispatch({
    type: SHOW_LOADING,
  })
  return ApiServices.resetPassword(mail, otp, password).then(
    (response) => {
      dispatch({
        type: HIDE_LOADING,
      })
      console.log(response, 'response')
      if (response.StatusCode == 1) {
        dispatch({
          type: UPDATE_PASSWORD_SUCCESS,
          payload: { UpdatePasswordSuccess: true },
        })
        dispatch({
          type: SET_MESSAGE,
          payload: response.Status,
        })
      } else {
        if (
          response.Status.includes('Invalid token') ||
          response.Status.includes('Token decoding failed')
        ) {
          //   alert(response.data.Status)
          dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: { UpdatePasswordSuccess: false },
          })
          //   logout()
        } else {
          dispatch({
            type: SET_MESSAGE,
            payload: response.Status,
          })
        }
      }

      return Promise.resolve()
    },
    (error) => {
      dispatch({
        type: HIDE_LOADING,
      })
      const message =
        (error.response && error.response.data && error.response.data.Status) ||
        error.message ||
        error.toString()
      dispatch({
        type: UPDATE_COMPANY_FAIL,
        payload: { isInvalidToken: false },
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })
      return Promise.reject()
    },
  )
}

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
} from '../action/type.js'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const ApiServices = {}
// const API_URL = 'http://3.21.170.188/'
const API_URL = 'http://localhost:5000/'
// const API_URL = 'https://5c75-2409-40d4-2b-911b-2ed7-6d28-4ce5-4205.ngrok-free.app/'
AuthInterceptor()
// ApiServices.getList = () => {
//   console.log(AuthService.authHeader())
//   fetch(BASE_URL + 'entries', {
//     method: 'GET',
//     headers: AuthService.authHeader(),
//   })
//     .then((response) => response.json())
//     .then((json) => console.log(json))
//     .catch((error) => console.error(error))
// }

ApiServices.register = (mail_id, password) => {
  return axios.post(API_URL + 'signup', {
    mail_id,
    password,
  })
}

ApiServices.verifyOtp = (mail_id, otp) => {
  return axios.post(API_URL + 'sent_and_verify_otp', {
    mail_id,
    otp,
  })
}
ApiServices.resendOtp = (mail_id, otp) => {
  return axios.post(API_URL + 'sent_and_verify_otp', {
    mail_id,
    otp,
  })
}
ApiServices.getContacts = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return axios.get(API_URL + 'contact/info', {
    headers: {
      'content-type': 'multipart/form-data',
      token: `${user.token}`,
    },
  })
}
ApiServices.deleteData = (id, type) => {
  const user = JSON.parse(localStorage.getItem('user'))
  let formData = new FormData()
  formData.append('ids', id)

  return axios.delete(API_URL + type + '/info', {
    headers: {
      'content-type': 'multipart/form-data',
      token: `${user.token}`,
    },
    data: {
      ids: JSON.stringify(id),
    },
  })
}
ApiServices.createContacts = (data) => {
  let formData = new FormData()
  formData.append('email', data.email)
  formData.append('company_name', data.company_name)
  formData.append('phone_no', data.phone_no)
  formData.append('address', data.address)
  formData.append('city', data.city)
  formData.append('state', data.state)
  formData.append('country', data.country)
  formData.append('pincode', data.pincode)
  formData.append('gst_no', data.gst_no)
  formData.append('logo', data.logo)
  if (data.optionalField) formData.append('optionalField', JSON.stringify(data.optionalField))
  const user = JSON.parse(localStorage.getItem('user'))
  return axios.post(API_URL + 'contact/info', formData, {
    headers: {
      'content-type': 'multipart/form-data',
      token: `${user.token}`,
    },
  })
}

ApiServices.updateContact = (data) => {
  let formData = new FormData()
  formData.append('id', data.id)
  formData.append('email', data.email)
  formData.append('company_name', data.company_name)
  formData.append('phone_no', data.phone_no)
  formData.append('address', data.address)
  formData.append('city', data.city)
  formData.append('state', data.state)
  formData.append('country', data.country)
  formData.append('pincode', data.pincode)
  formData.append('gst_no', data.gst_no)
  if (typeof data.logo != 'string') formData.append('logo', data.logo)
  if (data.optionalField) formData.append('optionalField', JSON.stringify(data.optionalField))
  const user = JSON.parse(localStorage.getItem('user'))
  return axios.put(API_URL + 'contact/info', formData, {
    headers: {
      'content-type': 'multipart/form-data',
      token: `${user.token}`,
    },
  })
}

ApiServices.getProducts = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return axios.get(API_URL + 'product/info', {
    headers: {
      'content-type': 'multipart/form-data',
      token: `${user.token}`,
    },
  })
}

ApiServices.getCountry = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return axios.get(API_URL + 'countries', {
    headers: {
      token: `${user.token}`,
    },
  })
}
ApiServices.getState = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return axios.get(API_URL + 'country/states', {
    headers: {
      token: `${user.token}`,
    },
  })
}
ApiServices.createProduct = (data) => {
  let formData = new FormData()
  formData.append('Hc_code', data.Hc_code)
  formData.append('description', data.description)
  formData.append('Unit_of_measurement', data.Unit_of_measurement)
  formData.append('net_weight', data.net_weight)
  formData.append('gross_weight', data.gross_weight)
  formData.append('number_of_packages', data.number_of_packages)
  formData.append('optionalField', JSON.stringify(data.optionalField))
  const user = JSON.parse(localStorage.getItem('user'))
  return axios.post(API_URL + 'product/info', formData, {
    headers: {
      'content-type': 'multipart/form-data',
      token: `${user.token}`,
    },
  })
}
ApiServices.updateProduct = (data) => {
  let formData = new FormData()
  formData.append('id', data.id)
  formData.append('Hc_code', data.Hc_code)
  formData.append('description', data.description)
  formData.append('Unit_of_measurement', data.Unit_of_measurement)
  formData.append('optionalField', JSON.stringify(data.optionalField))
  const user = JSON.parse(localStorage.getItem('user'))
  return axios.put(API_URL + 'product/info', formData, {
    headers: {
      'content-type': 'multipart/form-data',
      token: `${user.token}`,
    },
  })
}

ApiServices.updateCompany = (data) => {
  let formData = new FormData()
  formData.append('email', data.email)
  formData.append('company_name', data.company_name)
  formData.append('iec_code', data.iec_code)
  formData.append('mobile', data.mobile)
  formData.append('address', data.address)
  formData.append('city', data.city)
  formData.append('state', data.state)
  formData.append('county', data.county)
  formData.append('pincode', data.pincode)
  formData.append('pancard', data.pancard)
  formData.append('gstno', data.gstno)
  const user = JSON.parse(localStorage.getItem('user'))

  return axios.post(API_URL + 'company/info', formData, {
    headers: {
      'content-type': 'multipart/form-data',
      token: `${user.token}`,
    },
  })
}
ApiServices.getCompany = (data) => {
  const user = JSON.parse(localStorage.getItem('user'))

  return axios.get(API_URL + 'company/info', {
    headers: {
      token: `${user.token}`,
    },
  })
}
ApiServices.resetPassword = (mail, password, otp) => {
  console.log(mail, password, otp)
  return axios
    .post(API_URL + 'update/password', {
      mail_id: mail,
      new_password: password,
      otp: otp,
    })
    .then(
      (response) => {
        console.log(response)
        if (response.data.token) {
          //   localStorage.setItem('user', JSON.stringify(response.data))
          //   AuthService.isLoggedIn = true
        }

        return response.data
      },
      (error) => {
        console.log(error)
      },
    )
}

ApiServices.login = (mail_id, password) => {
  return axios
    .post(API_URL + 'signin', {
      mail_id,
      password,
    })
    .then(
      (response) => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
          AuthService.isLoggedIn = true
        }

        return response.data
      },
      (error) => {
        console.log(error)
      },
    )
}

ApiServices.logout = () => {
  localStorage.removeItem('user')
  AuthService.isLoggedIn = false
}

// Forms endpoints
ApiServices.getForms = () => {
  console.log('here')
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL + "forms", {
    headers: {
      "content-type": "application/json",
      token: `${user.token}`,
    },
  });
};
export default ApiServices

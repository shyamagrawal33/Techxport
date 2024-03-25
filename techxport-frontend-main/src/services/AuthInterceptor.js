// import { useDispatch } from 'react-redux'
import axios from 'axios'
export const AuthInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        // config.headers['Authorization'] = `Bearer ${user.token}`
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    },
  )
}

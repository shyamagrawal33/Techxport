import { SET_MESSAGE, CLEAR_MESSAGE, SHOW_LOADING, HIDE_LOADING } from '../action/type'

const initialState = {}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_MESSAGE:
      return { ...state, message: payload }

    case CLEAR_MESSAGE:
      return { ...state, message: '' }
    case SHOW_LOADING: {
      console.log('showLoading')
      return { ...state, showloading: true }
    }

    case HIDE_LOADING: {
      console.log('hideLoading')
      return { ...state, showloading: false }
    }
    default:
      return state
  }
}

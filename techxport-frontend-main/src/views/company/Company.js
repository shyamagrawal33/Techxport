import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CListGroup,
  CListGroupItem,
  CCard,
  CCardBody,
  CFormInput,
  CFormLabel,
  CForm,
  CFormSelect,
} from '@coreui/react'
import { Button } from '@coreui/coreui'
import { useDispatch, useSelector } from 'react-redux'
import { logout, updateCompany } from 'src/action/auth'
import AuthService from 'src/services/auth'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import ApiServices from 'src/services/apiservices'
import { HIDE_LOADING, LOGOUT, SHOW_LOADING } from 'src/action/type'
import Common from 'src/services/Common'
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

const Company = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'hindustan', label: 'Hindustan' },
  ]
  const { isInvalidToken, isLoggedIn, UpdateSuccess } = useSelector((state) => state.auth)
  const [dataLoad, setDataLoad] = useState(false)
  const [companyInfo, setCompanyInfo] = useState({
    email: '',
    company_name: '',
    iec_code: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    county: '',
    pincode: '',
    pancard: '',
    gstno: '',
  })
  let getData = () => {
    dispatch({
      type: SHOW_LOADING,
    })
    ApiServices.getCompany()
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
        })
        setDataLoad(true)
        console.log(response)
        if (response) {
          if (Common.getErrors(response, dispatch, navigate)) {
            // response.data.company_detail.county =
            //   response.data.company_detail.county.charAt(0).toUpperCase() +
            //   response.data.company_detail.county.substr(1).toLowerCase()

            setCompanyInfo(response.data.company_detail)

            setTimeout(() => {
              console.log(response.data.company_detail)
            }, 1000)
          }
        }
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  let validate = (type, fieldname, value) => {
    if (dataLoad) {
      if ((type = 'TEXT' && value == '')) {
        return fieldname + ' field is required'
      } else if (type == 'EMAIL') {
        if (value == '') {
          return fieldname + ' field is required'
        } else {
          const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          return reg.test(value) === false ? fieldname + ' Invalid Formate' : ''
        }
      } else if (type == 'PASSWORD') {
        return fieldname + ' field is required'
      } else if (type == 'NUMBER' && !isNaN(+value)) {
        return fieldname + ' is invaliid'
      } else if (type == 'FILE' && value.files.length < 1) {
        return fieldname + ' is invaliid'
      }
    }
    return ''
  }

  const navigate = useNavigate()
  useEffect(() => {
    console.log(isInvalidToken)
    if (isInvalidToken) {
      dispatch(logout())
      setTimeout(() => {
        console.log(AuthService.isLoggedIn)
        if (!AuthService.isLoggedIn) {
          navigate('/')
        }
      }, 100)
    }
    // console.log(UpdateSuccess)
    if (UpdateSuccess) {
      alert('company info update success')
    }
  }, [isInvalidToken, UpdateSuccess])
  let handleSubmit = () => {
    dispatch({
      type: SHOW_LOADING,
    })
    ApiServices.updateCompany(companyInfo)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
        })
        if (response) {
          if (Common.getErrors(response, dispatch, navigate)) {
            getData()
          }
        }
      })
      .catch((error) => {
        console.log(error)
        Common.getErrors(error, dispatch, navigate)
      })
  }
  return (
    <CForm>
      <CRow>
        <CCol xs={12} lg={6} xl={4}>
          <CButton
            type="submit"
            color="primary"
            onClick={() => {
              handleSubmit()
            }}
          >
            Update
          </CButton>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>Email</CFormLabel>
          <CFormInput
            type="text"
            validations={[required]}
            disabled
            onChange={(e) => setCompanyInfo({ ...companyInfo, ...{ email: e.target.value } })}
            value={companyInfo.email}
          ></CFormInput>

          {validate('EMAIL', 'Email', companyInfo.email) != '' && (
            <CFormLabel className="form_field_error">
              {validate('EMAIL', 'Email', companyInfo.email)}
            </CFormLabel>
          )}
        </CCol>
        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>Company name</CFormLabel>
          <CFormInput
            type="text"
            onChange={(e) =>
              setCompanyInfo({ ...companyInfo, ...{ company_name: e.target.value } })
            }
            value={companyInfo.company_name}
          ></CFormInput>
          {validate('TEXT', 'Company Name', companyInfo.company_name) != '' && (
            <CFormLabel className="form_field_error">
              {validate('TEXT', 'Company Name', companyInfo.company_name)}
            </CFormLabel>
          )}
        </CCol>
        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>IEC code</CFormLabel>
          <CFormInput
            type="text"
            onChange={(e) => setCompanyInfo({ ...companyInfo, ...{ iec_code: e.target.value } })}
            value={companyInfo.iec_code}
          ></CFormInput>
          {validate('NUMBER', 'IEC code', companyInfo.iec_code) != '' && (
            <CFormLabel className="form_field_error">
              {validate('NUMBER', 'IEC code', companyInfo.iec_code)}
            </CFormLabel>
          )}
        </CCol>
        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>Mobile</CFormLabel>
          <CFormInput
            type="text"
            onChange={(e) => setCompanyInfo({ ...companyInfo, ...{ mobile: e.target.value } })}
            value={companyInfo.mobile}
          ></CFormInput>
          {validate('NUMBER', 'Mobile', companyInfo.mobile) != '' && (
            <CFormLabel className="form_field_error">
              {validate('NUMBER', 'Mobile', companyInfo.mobile)}
            </CFormLabel>
          )}
        </CCol>
        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>Address</CFormLabel>
          <CFormInput
            type="text"
            onChange={(e) => setCompanyInfo({ ...companyInfo, ...{ address: e.target.value } })}
            value={companyInfo.address}
          ></CFormInput>
          {validate('TEXT', 'Address', companyInfo.address) != '' && (
            <CFormLabel className="form_field_error">
              {validate('TEXT', 'Address', companyInfo.address)}
            </CFormLabel>
          )}
        </CCol>
        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>Country</CFormLabel>
          {/* <CFormSelect aria-label="Default select example" data-coreui-search="true">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3" disabled>
              Three
            </option>
          </CFormSelect> */}

          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={options.filter((option) => option.value === companyInfo.count)}
            isDisabled={false}
            isLoading={false}
            isClearable={false}
            isRtl={false}
            isSearchable={true}
            name="color"
            options={options}
            value={options.filter((option) => option.value === companyInfo.county)}
            onChange={(e) => {
              setCompanyInfo({ ...companyInfo, ...{ county: e.value } })
            }}
          />

          {/* <CFormInput
            type="text"
            onChange={(e) => setCompanyInfo({ ...companyInfo, ...{ county: e.target.value } })}
            value={companyInfo.county}
          ></CFormInput> */}
          {validate('TEXT', 'Country', companyInfo.county) != '' && (
            <CFormLabel className="form_field_error">
              {validate('TEXT', 'Country', companyInfo.county)}
            </CFormLabel>
          )}
        </CCol>

        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>State</CFormLabel>
          <CFormInput
            type="text"
            onChange={(e) => setCompanyInfo({ ...companyInfo, ...{ state: e.target.value } })}
            value={companyInfo.state}
          ></CFormInput>
          {validate('TEXT', 'State', companyInfo.state) != '' && (
            <CFormLabel className="form_field_error">
              {validate('TEXT', 'State', companyInfo.state)}
            </CFormLabel>
          )}
        </CCol>

        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>City</CFormLabel>
          <CFormInput
            type="text"
            onChange={(e) => setCompanyInfo({ ...companyInfo, ...{ city: e.target.value } })}
            value={companyInfo.city}
          ></CFormInput>
          {validate('TEXT', 'City', companyInfo.city) != '' && (
            <CFormLabel className="form_field_error">
              {validate('TEXT', 'City', companyInfo.city)}
            </CFormLabel>
          )}
        </CCol>

        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>Pin code</CFormLabel>
          <CFormInput
            type="text"
            onChange={(e) => setCompanyInfo({ ...companyInfo, ...{ pincode: e.target.value } })}
            value={companyInfo.pincode}
          ></CFormInput>
          {validate('NUMBER', 'Pin code', companyInfo.pincode) != '' && (
            <CFormLabel className="form_field_error">
              {validate('NUMBER', 'Pin code', companyInfo.pincode)}
            </CFormLabel>
          )}
        </CCol>
        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>Pan card</CFormLabel>
          <CFormInput
            type="file"
            onChange={(e) => setCompanyInfo({ ...companyInfo, ...{ pancard: e.target.files[0] } })}
          ></CFormInput>
          {validate('FILE', 'Pan card', companyInfo.pancard) != '' && (
            <CFormLabel className="form_field_error">
              {validate('FILE', 'Pan card', companyInfo.pancard)}
            </CFormLabel>
          )}
        </CCol>
        <CCol xs={12} lg={6} xl={4}>
          <CFormLabel>Gst No</CFormLabel>
          <CFormInput
            type="file"
            onChange={(e) => setCompanyInfo({ ...companyInfo, ...{ gstno: e.target.files[0] } })}
          ></CFormInput>
          {validate('FILE', 'Gst No', companyInfo.gstno) != '' && (
            <CFormLabel className="form_field_error">
              {validate('FILE', 'Gst No', companyInfo.gstno)}
            </CFormLabel>
          )}
        </CCol>
      </CRow>
    </CForm>
  )
}
export default Company

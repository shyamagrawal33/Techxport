import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
// import { ProductService } from './service/ProductService'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CHeaderDivider,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { HIDE_LOADING, SHOW_LOADING } from 'src/action/type'
import ApiServices from 'src/services/apiservices'
import Common from 'src/services/Common'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCountry } from 'src/action/auth'

export default function ProductCreate() {
  const search = useLocation().search
  const data = JSON.parse(atob(search.substring(1)))
  console.log(data)
  useEffect(() => {
    if (data.prevdata) setNewProduct(data.prevdata)
    getCountryList()
    console.log(auth)
  }, [])
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [visible, setVisible] = useState(false)
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    button1: '',
    button2: '',
  })
  const auth = useSelector((state) => state.auth)
  const [create, setCreate] = useState(true)
  const [newProduct, setNewProduct] = useState({
    id: 0,
    hc_code: '',
    description: '',
    unit_of_measurement: '',
    number_of_packages: '',
    gross_weight: '',
    net_weight: '',
    optionalField: [],
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let getCountryList = () => {
    dispatch(getCountry())
  }
  let createNewProduct = (newProduct) => {
    dispatch({
      type: SHOW_LOADING,
    })
    ApiServices.createProduct(newProduct)
      .then((response) => {
        console.log(response)
        dispatch({
          type: HIDE_LOADING,
        })
        setTimeout(() => {
          if (Common.getErrors(response, dispatch, navigate)) {
            // getData()
            setCreate(false)
            navigate(-1)
          }
        }, 100)
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }
  let updateProduct = (newProduct) => {
    dispatch({
      type: SHOW_LOADING,
    })
    ApiServices.updateProduct(newProduct)
      .then((response) => {
        console.log(response)
        dispatch({
          type: HIDE_LOADING,
        })
        setTimeout(() => {
          if (Common.getErrors(response, dispatch, navigate)) {
            setCreate(false)
            navigate(-1)
          }
        }, 100)
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }

  return (
    <>
      <div className="card" style={{ transform: 'translateY(0px)' }}>
        <CModal
          backdrop="static"
          visible={create}
          onClose={() => {
            setCreate(false)
            navigate(-1)
          }}
        >
          <CModalHeader closeButton={false}>
            <div style={{ display: 'flex' }}>
              <CModalTitle>Create New Product</CModalTitle>
              <button
                type="button"
                onClick={() => {
                  setCreate(false)
                  navigate(-1)
                }}
                className="btn-close"
                style={{ border: 'none' }}
                aria-label="Close"
              ></button>
            </div>
          </CModalHeader>
          <CModalBody style={{ padding: 0 }}>
            <CForm style={{ borderRadius: 0, boxShadow: 'none', paddingTop: 0 }}>
              <div>
                <CFormLabel style={{ fontSize: 18, fontWeight: 700, marginTop: 0 }}>
                  Product
                </CFormLabel>
                <CHeaderDivider
                  style={{
                    height: 1,
                    background: 'rgba(0,0,0,0.1)',
                    marginBottom: 5,
                    marginTop: 5,
                  }}
                ></CHeaderDivider>
              </div>
              <CRow>
                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>HC Code</CFormLabel>
                  <CFormInput
                    type="text"
                    value={newProduct?.hc_code}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, ...{ hc_code: e.target.value } })
                    }
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>Description</CFormLabel>
                  <CFormInput
                    type="text"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, ...{ description: e.target.value } })
                    }
                    value={newProduct?.description}
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>Unit of measurmant</CFormLabel>
                  <CFormInput
                    type="email"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, ...{ unit_of_measurement: e.target.value } })
                    }
                    value={newProduct?.unit_of_measurement}
                  ></CFormInput>
                </CCol>

                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>Net weight</CFormLabel>
                  <CFormInput
                    type="text"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, ...{ net_weight: e.target.value } })
                    }
                    value={newProduct?.net_weight}
                  ></CFormInput>
                </CCol>

                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>Gross Weight</CFormLabel>
                  <CFormInput
                    type="email"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, ...{ gross_weight: e.target.value } })
                    }
                    value={newProduct?.gross_weight}
                  ></CFormInput>
                </CCol>

                <CCol xs={12} lg={6} xl={4}>
                  <CFormLabel>Number of Packages</CFormLabel>
                  <CFormInput
                    type="number"
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, ...{ number_of_packages: e.target.value } })
                    }
                    value={newProduct?.number_of_packages}
                  ></CFormInput>
                </CCol>
              </CRow>
              <CFormLabel style={{ fontSize: 18, fontWeight: 700 }}>Optional Fields</CFormLabel>
              <CHeaderDivider
                style={{
                  height: 1,
                  background: 'rgba(0,0,0,0.1)',
                  marginBottom: 5,
                  marginTop: 5,
                }}
              ></CHeaderDivider>
              {newProduct?.optionalField?.length < 2 && (
                <div
                  onClick={() => {
                    console.log('hello')
                    let opt = { ...newProduct }
                    opt?.optionalField.push({ fieldName: '', fieldValue: '' })
                    setNewProduct(opt)
                    console.log(opt)
                  }}
                >
                  + Add Optional Field
                </div>
              )}
              {newProduct?.optionalField?.map((el, index) => {
                return (
                  <CRow key={index}>
                    <CCol xs={12} lg={6} xl={6}>
                      <CFormLabel>Field{index + 1} Name</CFormLabel>
                      <CFormInput
                        value={newProduct.optionalField[index].fieldName}
                        onChange={(e) => {
                          let u = newProduct.optionalField
                          u[index].fieldName = e.target.value
                          setNewProduct({ ...newProduct, ...{ optionalField: u } })
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={6} xl={6}>
                      <CFormLabel>Field{index + 1} Value</CFormLabel>
                      <CFormInput
                        value={newProduct.optionalField[index].fieldValue}
                        onChange={(e) => {
                          let u = newProduct.optionalField
                          u[index].fieldValue = e.target.value
                          setNewProduct({ ...newProduct, ...{ optionalField: u } })
                        }}
                      ></CFormInput>
                    </CCol>
                  </CRow>
                )
              })}
            </CForm>
          </CModalBody>
          <CModalFooter>
            <Button
              color="primary"
              style={{ height: 40, margin: 20 }}
              onClick={() => {
                setCreate(false)
                navigate(-1)
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              style={{ height: 40, margin: 20 }}
              onClick={() => {
                if (newProduct.id != 0) {
                  updateProduct(newProduct)
                } else {
                  createNewProduct(newProduct)
                }
              }}
            >
              Save
            </Button>
          </CModalFooter>
        </CModal>
      </div>
    </>
  )
}

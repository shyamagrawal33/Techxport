import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputSwitch } from 'primereact/inputswitch'
import { Button } from 'primereact/button'
import { Alert } from '@coreui/coreui'
import Alerts from '../notifications/alerts/Alerts'
import { Tag } from 'primereact/tag'
import {
  CAvatar,
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
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Select from 'react-select'
import ApiServices from 'src/services/apiservices'
import AuthService from 'src/services/auth'
import { HIDE_LOADING, LOGOUT, SHOW_LOADING } from 'src/action/type'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Common from 'src/services/Common'
// import { ProductService } from './service/ProductService'

export default function Contacts() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [rowClick, setRowClick] = useState(true)
  const [visible, setVisible] = useState(false)
  const [create, setCreate] = useState(false)
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    button1: '',
    button2: '',
  })
  const [newContact, setNewContact] = useState({
    id: 0,
    logo: '',
    company_name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone_no: '',
    gst_no: '',
    optionalField: [],
  })

  let createSearchParams = (type = 'NEW', id = 0, prevdata = null) => {
    let data = {
      type: type,
      id: id,
      redirect: '/default/contacts',
      lastPage: 'Contact',
      prevdata: prevdata,
    }
    return btoa(JSON.stringify(data))
  }

  let getData = () => {
    dispatch({
      type: SHOW_LOADING,
    })
    ApiServices.getContacts()
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
        })
        if (Common.getErrors(response, dispatch, navigate)) {
          if (response.data.all_contact_details.optionalField) {
            response.data.all_contact_details.optionalField = JSON.parse(
              response.data.all_contact_details.optionalField,
            )
          } else {
            response.data.all_contact_details.optionalField = []
          }
          setProducts(response.data.all_contact_details)
        }
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  let createNewContact = (newContact) => {
    dispatch({
      type: SHOW_LOADING,
    })
    ApiServices.createContacts(newContact)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
        })
        setTimeout(() => {
          if (Common.getErrors(response)) {
            getData()
          }
        }, 100)
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }

  let updateContact = (newContact) => {
    dispatch({
      type: SHOW_LOADING,
    })
    ApiServices.updateContact(newContact)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
        })
        setTimeout(() => {
          if (Common.getErrors(response)) {
            getData()
          }
        }, 100)
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }
  let deleteContact = (id) => {
    dispatch({
      type: SHOW_LOADING,
    })
    ApiServices.deleteData(id, 'contact')
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
        })
        setTimeout(() => {
          if (Common.getErrors(response)) {
            getData()
          }
        }, 100)
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }
  const [image, setImage] = useState(null)

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]))
      setNewContact({ ...newContact, ...{ logo: event.target.files[0] } })
    }
  }
  let handleDelete = () => {
    setVisible(true)
    setModalData({
      title: 'Confirmation Alert',
      message: 'Are you sure you want to Delete these contact?',
      button1: 'Yes',
      button2: 'No',
    })
  }
  const options = [
    { value: 'chocolate', label: 'chocolate' },
    { value: 'strawberry', label: 'strawberry' },
    { value: 'vanilla', label: 'vanilla' },
  ]
  let handleConfirm = (type, btnClick) => {
    if (btnClick === modalData.button1 && type == 'Delete') {
      //   console.log(selectedProducts)
      let request = []
      selectedProducts.forEach((el) => {
        request.push(el.id)
      })
      //   console.log(udata)
      //   setProducts(udata)
      deleteContact(request)
    }
  }
  const imageBodyTemplate = (product) => {
    return (
      <img
        src={ApiServices.imageUrl + product.logo}
        alt={product.logo}
        className="w-6rem shadow-2 border-round"
        style={{ borderRadius: 12 }}
      />
    )
  }
  const viewBodyTemplate = (product) => {
    return (
      <Tag
        value={'View/Edit'}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          let index = products.findIndex((el) => {
            return el.id === product.id
          })
          if (typeof products[index].optionalField == 'string')
            products[index].optionalField = JSON.parse(products[index].optionalField)
          //   console.log(products[index])
          navigate({
            pathname: '/default/createcontact',
            search: createSearchParams('OLD', products[index].id, products[index]),
          })
        }}
      />
    )
  }
  return (
    <>
      <div className="card" style={{ transform: 'translateY(0px)' }}>
        <CModal
          visible={visible}
          onClose={(event) => {
            console.log(event)
            setVisible(false)
          }}
        >
          <CModalHeader closeButton={false}>
            <div style={{ display: 'flex' }}>
              <CModalTitle>{modalData.title}</CModalTitle>
              <button
                type="button"
                onClick={() => {
                  setVisible(false)
                }}
                className="btn-close"
                style={{ border: 'none' }}
                aria-label="Close"
              ></button>
            </div>
          </CModalHeader>
          <CModalBody>
            <p>{modalData.message}</p>
          </CModalBody>
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                handleConfirm('Delete', modalData.button2)
                setVisible(false)
              }}
            >
              {modalData.button2}
            </CButton>
            <CButton
              color="primary"
              onClick={() => {
                handleConfirm('Delete', modalData.button1)
                setVisible(false)
              }}
            >
              {modalData.button1}
            </CButton>
          </CModalFooter>
        </CModal>

        {/* <div className="flex justify-content-center align-items-center mb-4 gap-2">
        <InputSwitch
          inputId="input-rowclick"
          checked={rowClick}
          onChange={(e) => setRowClick(e.value)}
        />
        <label htmlFor="input-rowclick">Delete</label>
      </div> */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 15 }}>
          <Button
            style={{ width: 90, height: 40, marginRight: 10 }}
            onClick={() => {
              handleDelete()
            }}
            disabled={selectedProducts.length == 0}
          >
            Delete
          </Button>
          <Button
            style={{ width: 90, height: 40 }}
            onClick={() => {
              navigate({
                pathname: '/default/createcontact',
                search: createSearchParams(),
              })
            }}
          >
            Create
          </Button>
        </div>
        <DataTable
          value={products}
          paginator={products.length > 0}
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          selectionMode={'checkbox'}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column header="View" headerStyle={{ minWidth: '5rem' }} body={viewBodyTemplate}></Column>
          <Column
            field="logo"
            header="Logo"
            body={imageBodyTemplate}
            headerStyle={{ minWidth: '7rem' }}
          ></Column>
          <Column
            field="company_name"
            header="Company Name"
            headerStyle={{ minWidth: '10rem' }}
          ></Column>
          <Column field="email" header="Email"></Column>
          <Column field="address" header="Address"></Column>
          <Column field="city" header="City"></Column>
          <Column field="state" header="State"></Column>
          <Column field="pincode" header="PinCode"></Column>
          <Column field="country" header="Country"></Column>
          <Column field="gst_no" header="GST No"></Column>
        </DataTable>
      </div>
    </>
  )
}

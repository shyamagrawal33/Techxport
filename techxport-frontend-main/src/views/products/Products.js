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
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Products() {
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [visible, setVisible] = useState(false)
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    button1: '',
    button2: '',
  })
  const [create, setCreate] = useState(false)
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
  let getData = () => {
    dispatch({
      type: SHOW_LOADING,
    })
    ApiServices.getProducts()
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
        })
        if (Common.getErrors(response, dispatch, navigate)) {
          if (response.data.all_product_details.optionlField) {
            response.data.all_product_details.optionlField = JSON.parse(
              response.data.all_product_details.optionlField,
            )
          } else {
            response.data.all_product_details.optionlField = []
          }
          setProducts(response.data.all_product_details)
        }
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }
  useEffect(() => {
    getData()
  }, [])

  let createNewProduct = (newProduct) => {
    dispatch({
      type: SHOW_LOADING,
    })
    ApiServices.createProduct(newProduct)
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
        })
        setTimeout(() => {
          if (Common.getErrors(response, dispatch, navigate)) {
            getData()
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
        dispatch({
          type: HIDE_LOADING,
        })
        setTimeout(() => {
          if (Common.getErrors(response, dispatch, navigate)) {
            getData()
          }
        }, 100)
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }
  let deleteProducts = (id) => {
    dispatch({
      type: SHOW_LOADING,
    })
    ApiServices.deleteData(id, 'product')
      .then((response) => {
        dispatch({
          type: HIDE_LOADING,
        })
        setTimeout(() => {
          if (Common.getErrors(response, dispatch, navigate)) {
            getData()
          }
        }, 100)
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }

  let handleDelete = () => {
    setVisible(true)
    setModalData({
      title: 'Confirmation Alert',
      message: 'Are you sure you want to Delete these products?',
      button1: 'Yes',
      button2: 'No',
    })
  }
  let handleConfirm = (type, btnClick) => {
    if (btnClick === modalData.button1 && type === 'Delete') {
      let request = []
      selectedProducts.forEach((el) => {
        request.push(el.id)
      })
      deleteProducts(request)
    }
  }
  let createSearchParams = (type = 'NEW', id = 0, prevdata = null) => {
    let data = {
      type: type,
      id: id,
      redirect: '/default/products',
      lastPage: 'Product',
      prevdata: prevdata,
    }
    return btoa(JSON.stringify(data))
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
          setNewProduct(products[index])
          navigate({
            pathname: '/default/productcreate',
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
                pathname: '/default/productcreate',
                search: createSearchParams(),
              })
              // setCreate(true)
              // setNewProduct({
              //   id: 0,
              //   Hc_code: '',
              //   description: '',
              //   Unit_of_measurement: '',
              //   optionalField: [],
              // })
            }}
          >
            Create
          </Button>
        </div>
        <DataTable
          value={products}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          // selectionMode={rowClick ? null : 'checkbox'}
          selectionMode={'checkbox'}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column header="View" headerStyle={{ minWidth: '5rem' }} body={viewBodyTemplate}></Column>
          <Column field="hc_code" header="HC Code"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="unit_of_measurement" header="Unit of Measurement"></Column>
          <Column field="net_weight" header="Net Weight"></Column>
          <Column field="gross_weight" header="Gross Weight"></Column>
          <Column field="number_of_packages" header="Number Of Packages"></Column>
        </DataTable>
      </div>
    </>
  )
}

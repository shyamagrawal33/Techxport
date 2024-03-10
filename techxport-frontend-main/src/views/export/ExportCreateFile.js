import React, { useEffect, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { useLocation, useNavigate } from 'react-router-dom'
import 'react-tabs/style/react-tabs.css'
import moment from 'moment'
import CIcon from '@coreui/icons-react'
import { cilArrowThickToBottom, cilOptions, cilPencil, cilTrash } from '@coreui/icons'
import { OverlayPanel } from 'primereact/overlaypanel'
import { CButton, CCol, CFormCheck, CFormInput, CFormLabel, CRow } from '@coreui/react'
import Select from 'react-select/creatable'
import ApiServices from 'src/services/apiservices'
import Common from 'src/services/Common'
import { useDispatch } from 'react-redux'
const ExportCreateFile = () => {
  const search = useLocation().search
  const data = JSON.parse(atob(search.substring(1)))
  console.log(data)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [products, setProduct] = useState([])
  const [contacts, setContact] = useState([])
  const [formData, setFormData] = useState([
    [
      {
        type: '1. Shipment Information',
        value: [
          {
            label: 'Shipment Reference Number',
            type: 'text',
            value: 'test1',
          },
          {
            label: 'Invoice Number',
            type: 'text',
            value: 'test2',
          },
          {
            label: 'Incoterm',
            type: 'select',
            value: 'test1',
            options: [
              {
                value: 't1',
                label: 't1',
              },
              {
                value: 't2',
                label: 't2',
              },
            ],
          },
          {
            label: 'Place',
            type: 'text',
            value: '',
          },
          {
            label: 'Method of Dispatch',
            type: 'select',
            value: 'test1',
            options: [
              {
                value: 'Sea',
                label: 'Sea',
              },
              {
                value: 'Rail',
                label: 'Rail',
              },
              {
                value: 'Road',
                label: 'Road',
              },
              {
                value: 'Air',
                label: 'Air',
              },
            ],
          },
          {
            label: 'Type of Shipment',
            type: 'select',
            value: 'test1',
            options: [
              {
                value: 'Breakbulk',
                label: 'Breakbulk',
              },
              {
                value: 'FCL',
                label: 'FCL',
              },
              {
                value: 'LCL',
                label: 'LCL',
              },
            ],
          },
          {
            label: 'Port of Loading',
            type: 'select',
            value: 'test1',
            options: [
              {
                value: 't1',
                label: 't1',
              },
              {
                value: 't2',
                label: 't2',
              },
            ],
          },
          {
            label: 'Port of discharge',
            type: 'select',
            value: 'test1',
            options: [
              {
                value: 't1',
                label: 't1',
              },
              {
                value: 't2',
                label: 't2',
              },
            ],
          },
          {
            label: 'Final Destination',
            type: 'select',
            value: 'test1',
            options: [
              {
                value: 't1',
                label: 't1',
              },
              {
                value: 't2',
                label: 't2',
              },
            ],
          },
          {
            label: 'Country of Origin of Goods',
            type: 'select',
            value: 'test1',
            options: [
              {
                value: 't1',
                label: 't1',
              },
              {
                value: 't2',
                label: 't2',
              },
            ],
          },
          {
            label: 'Country of Final Destination',
            type: 'select',
            value: 'test1',
            options: [
              {
                value: 't1',
                label: 't1',
              },
              {
                value: 't2',
                label: 't2',
              },
            ],
          },
        ],
      },
      {
        type: '2. Parties',
        value: [
          {
            label: 'Exporter',
            type: 'select',
            value: '',
            placeholder: 'Find or add a contact',
            options: [],
            optionfrom: 'contactAPI',
          },
          {
            label: 'Consignee',
            type: 'select',
            value: '',
            placeholder: 'Find or add a contact',
            options: [],
            optionfrom: 'contactAPI',
          },
          {
            label: 'Buyer if not Consignee',
            type: 'select',
            value: '',
            placeholder: 'Find or add a contact',
            options: [],
            optionfrom: 'contactAPI',
          },
          {
            label: 'Logistics Provider',
            needRadio: true,
            radioOption: [
              {
                value: 'Freight Forwarder',
              },
              {
                value: 'Carrier',
              },
            ],
            type: 'select',
            value: '',
            placeholder: 'Find or add a contact',
            options: [],
            optionfrom: 'contactAPI',
          },
          {
            label: 'Notify Party',
            type: 'select',
            value: '',
            placeholder: 'Find or add a contact',
            options: [],
            optionfrom: 'contactAPI',
          },
        ],
      },
      {
        type: '3. Shipping Details',
        value: [
          {
            label: 'Date of Departure (ETD)',
            type: 'date',
          },
          {
            label: 'Est. Time of Arrival (ETA)',
            type: 'date',
          },
          {
            label: 'Vessel / Aircraft / Vehicle',
            type: 'text',
            value: 'test1',
          },
          {
            label: 'Voyage / Flight Number',
            type: 'text',
            value: 'test1',
          },
          {
            label: 'Bill of Lading Number',
            type: 'text',
            value: 'test1',
          },
          {
            label: 'Export Declaration Number',
            type: 'text',
            value: 'test1',
          },
          {
            label: 'Marine Cover Policy No.',
            type: 'text',
            value: '',
          },
          {
            label: 'Does this shipment contain Hazardous / Dangerous goods?',
            type: 'select',
            value: 'test1',
            options: [
              {
                value: 'Yes',
                label: 'Yes',
              },
              {
                value: 'No',
                label: 'No',
              },
            ],
          },
          {
            label: 'Is the shipment on a Letter of Credit?',
            type: 'select',
            value: 'test1',
            options: [
              {
                value: 'Yes',
                label: 'Yes',
              },
              {
                value: 'No',
                label: 'No',
              },
            ],
            extraInput: {
              label: 'Letter of Credit No.',
              type: 'text',
              value: '',
              isDisabled: true,
            },
          },
          {
            label: 'Special Instructions (to the Freight Forwarder or Carrier)',
            type: 'text',
            value: '',
          },
        ],
      },
      {
        type: '4. Products',
        value: [
          {
            label: 'Product Code',
            type: 'select',
            value: 'test1',
            options: [
              {
                value: 'Yes',
                label: 'Yes',
              },
              {
                value: 'No',
                label: 'No',
              },
            ],
          },

          {
            label: 'Description of Goods',
            type: 'text',
            value: 'test1',
          },
          {
            label: 'HS Code',
            type: 'text',
            value: 'test1',
          },
          {
            label: 'Quantity',
            type: 'text',
            value: '0',
          },
          {
            label: 'Unit of Measurement',
            type: 'text',
            value: 'test1',
          },
          {
            label: 'Unit Price',
            type: 'text',
            value: '0',
          },
          {
            label: 'Amount',
            type: 'text',
            value: 'test1',
            isDisabled: true,
          },
        ],
      },
    ],
  ])
  const [formData2, setFormData2] = useState([
    {
      type: 'SALES CONTRACT',
      value: [
        {
          label: 'Seller',
          type: 'text',
          value: 'test1',
          placeholder: 'Find or add a contact',
          options: [],
          optionfrom: 'contactAPI',
        },
        {
          label: 'Pages',
          type: 'Pages',
          value: 'test1',
        },
        {
          label: 'Invoice Number',
          type: 'text',
          value: '',
        },
        {
          label: 'Date',
          type: 'Date',
          value: '',
        },
        {
          label: 'Buyer',
          type: 'select',
          value: 'test1',
          placeholder: 'Find or add a contact',
          options: [],
          optionfrom: 'contactAPI',
        },
        {
          label: 'Delivery Date',
          type: 'Date',
          value: '',
        },
        {
          label: 'Method Of Dispatch',
          type: 'select',
          value: '',
          options: [
            { id: 2, value: 'Tax Invoice', label: 'Tax Invoice' },
            { id: 3, value: 'Sales Contract', label: 'Sales Contract' },
            { id: 4, value: 'Packing List', label: 'Packing List' },
          ],
        },
        {
          label: 'Type of Shipment',
          type: 'text',
          value: '',
        },
        {
          label: 'Port of Loading',
          type: 'select',
          value: '',
          options: [],
        },
        {
          label: 'Port of Discharge',
          type: 'select',
          value: '',
          options: [],
        },
        {
          label: 'Type / Method of payment',
          type: 'textarea',
          value: '',
        },
        {
          header: [
            'Product Code',
            'Description of Goods',
            'Unit Quantity',
            'Unit Type',
            'Price',
            'Amount',
          ],
          value: [
            [
              {
                type: 'text',
                value: '',
                placeholder: 'Add product',
                options: [],
                optionfrom: 'productAPI',
              },
              {
                type: 'text',
                value: '',
              },
              {
                type: 'number',
                value: '0',
              },
              {
                type: 'text',
                value: '',
              },
              {
                type: 'text',
                value: '0.00',
              },
              {
                type: 'text',
                value: '',
                disabled: true,
              },
            ],
          ],
        },
        {
          label: 'Conditions',
          type: 'textarea',
          value: '',
        },
        {
          label: 'Bank Details',
          type: 'textarea',
          value: '',
        },
        {
          label: 'Incoterm',
        },
        {
          type: 'select',
          value: '',
          options: [],
        },
        {
          type: 'text',
          value: '',
        },
        {
          label: 'Currency',
          type: 'select',
          value: 'INR',
          options: [],
        },
        {
          label: 'Signatory Company',
          type: 'text',
          value: 'test',
        },
        {
          label: 'Name of Authorized Signatory',
        },
        {
          placeholder: 'First Name',
          type: 'text',
          value: 'test',
        },
        {
          placeholder: 'Last Name',
          type: 'text',
          value: 'test',
        },
        {
          label: 'Signature',
        },
        {
          placeholder: '',
          type: 'file',
          value: 'test',
        },
        {
          label: 'Add Charge or discount',
          value: [
            [
              {
                placeholder: '',
                value: 'test',
              },
              {
                placeholder: '',
                value: 0,
              },
            ],
          ],
        },
      ],
    },
    {
      type: 'PACKING LIST',
      value: [
        {
          label: 'Exporter',
          type: 'text',
          value: 'test1',
          placeholder: 'Find or add a contact',
          options: [],
          optionfrom: 'contactAPI',
        },
        {
          label: 'Pages',
          type: 'Pages',
          value: 'test1',
        },
        {
          label: 'Invoice Number ',
          type: 'text',
          value: '',
        },
        {
          label: 'Date',
          type: 'Date',
          value: '',
        },
        {
          label: 'Bill of Lading Number',
          type: 'text',
          value: '',
        },
        {
          label: 'Reference',
          type: 'text',
          value: '',
        },
        {
          label: 'Buyer Reference',
          type: 'text',
          value: '',
        },
        {
          label: 'Consignee',
          type: 'select',
          value: 'test1',
          placeholder: 'Find or add a contact',
          options: [],
          optionfrom: 'contactAPI',
        },
        {
          label: 'Buyer (If not Consignee)',
          type: 'select',
          value: 'test1',
          placeholder: 'Find or add a contact',
          options: [],
          optionfrom: 'contactAPI',
        },
        {
          label: 'Method Of Dispatch',
          type: 'select',
          value: '',
          options: [
            { id: 2, value: 'Tax Invoice', label: 'Tax Invoice' },
            { id: 3, value: 'Sales Contract', label: 'Sales Contract' },
            { id: 4, value: 'Packing List', label: 'Packing List' },
          ],
        },

        {
          label: 'Type of Shipment',
          type: 'text',
          value: '',
        },

        {
          label: 'Country Of Origin of Goods',
          type: 'select',
          value: '',
          options: [
            { id: 2, value: 'Tax Invoice', label: 'Tax Invoice' },
            { id: 3, value: 'Sales Contract', label: 'Sales Contract' },
            { id: 4, value: 'Packing List', label: 'Packing List' },
          ],
        },

        {
          label: 'Country of Final Destination',
          type: 'select',
          value: '',
          options: [
            { id: 2, value: 'Tax Invoice', label: 'Tax Invoice' },
            { id: 3, value: 'Sales Contract', label: 'Sales Contract' },
            { id: 4, value: 'Packing List', label: 'Packing List' },
          ],
        },

        {
          label: 'Vessel / Aircraft',
          type: 'text',
          value: '',
        },

        {
          label: 'Voyage No',
          type: 'text',
          value: '',
        },
        {
          label: 'Port of Loading',
          type: 'select',
          value: '',
          options: [],
        },

        {
          label: 'Date of Departure',
          type: 'date',
          value: '',
        },

        {
          label: 'Port of Discharge',
          type: 'select',
          value: '',
          options: [],
        },
        {
          label: 'Final Destination',
          type: 'select',
          value: '',
          options: [],
        },

        {
          label: 'Packing Information',
          type: 'text',
          value: '',
        },
        {
          header: [
            'Product Code',
            'Description of Goods',
            'Unit Quantity',
            'Kind & No of Packages',
            'Net Weight  (Kg)',
            'Gross Weight  (Kg)',
            'Measurements  (m³)',
          ],
          value: [
            [
              {
                type: 'text',
                value: '',
                placeholder: 'Add product',
                options: [],
                optionfrom: 'productAPI',
              },
              {
                type: 'text',
                value: '',
              },
              {
                type: 'number',
                value: '0',
              },
              {
                type: 'text',
                value: '',
              },
              {
                type: 'text',
                value: '0.00',
              },
              {
                type: 'text',
                value: '',
              },
              {
                type: 'text',
                value: '',
              },
            ],
          ],
        },

        {
          label: 'Consignment Total',
          value: [0, 0, 0, 0, 0],
        },
        {
          label: 'Additional Info',
          type: 'textarea',
          value: '',
        },
        {
          label: 'Signatory Company',
          type: 'text',
          value: '',
        },
        {
          label: 'Name of Authorized Signatory',
          value: [
            {
              placeholder: 'First Name',
              type: 'text',
              value: '',
            },
            {
              placeholder: 'Last Name',
              type: 'text',
              value: '',
            },
          ],
        },
        {
          label: 'Signature',
          type: 'file',
          value: '',
        },
      ],
    },
    {
      type: 'Tax Invoice',
      value: [
        {
          label: 'Exporter',
          type: 'text',
          value: 'test1',
          placeholder: 'Find or add a contact',
          options: [],
          optionfrom: 'contactAPI',
        },
        {
          label: 'Pages',
          type: 'Pages',
          value: 'test1',
        },
        {
          label: 'Invoice Number ',
          type: 'text',
          value: '',
        },
        {
          label: 'Date',
          type: 'Date',
          value: '',
        },
        {
          label: 'Bill of Lading Number',
          type: 'text',
          value: '',
        },
        {
          label: 'Reference',
          type: 'text',
          value: '',
        },
        {
          label: 'Buyer Reference',
          type: 'text',
          value: '',
        },
        {
          label: 'Consignee',
          type: 'select',
          value: 'test1',
          placeholder: 'Find or add a contact',
          options: [],
          optionfrom: 'contactAPI',
        },
        {
          label: 'Buyer (If not Consignee)',
          type: 'select',
          value: 'test1',
          placeholder: 'Find or add a contact',
          options: [],
          optionfrom: 'contactAPI',
        },
        {
          label: 'Method Of Dispatch',
          type: 'select',
          value: '',
          options: [
            { id: 2, value: 'Tax Invoice', label: 'Tax Invoice' },
            { id: 3, value: 'Sales Contract', label: 'Sales Contract' },
            { id: 4, value: 'Packing List', label: 'Packing List' },
          ],
        },

        {
          label: 'Type of Shipment',
          type: 'text',
          value: '',
        },

        {
          label: 'Country Of Origin of Goods',
          type: 'select',
          value: '',
          options: [
            { id: 2, value: 'Tax Invoice', label: 'Tax Invoice' },
            { id: 3, value: 'Sales Contract', label: 'Sales Contract' },
            { id: 4, value: 'Packing List', label: 'Packing List' },
          ],
        },

        {
          label: 'Country of Final Destination',
          type: 'select',
          value: '',
          options: [
            { id: 2, value: 'Tax Invoice', label: 'Tax Invoice' },
            { id: 3, value: 'Sales Contract', label: 'Sales Contract' },
            { id: 4, value: 'Packing List', label: 'Packing List' },
          ],
        },

        {
          label: 'Vessel / Aircraft',
          type: 'text',
          value: '',
        },

        {
          label: 'Voyage No',
          type: 'text',
          value: '',
        },
        {
          label: 'Port of Loading',
          type: 'select',
          value: '',
          options: [],
        },

        {
          label: 'Date of Departure',
          type: 'date',
          value: '',
        },

        {
          label: 'Port of Discharge',
          type: 'select',
          value: '',
          options: [],
        },
        {
          label: 'Final Destination',
          type: 'select',
          value: '',
          options: [],
        },

        {
          label: 'Packing Information',
          type: 'text',
          value: '',
        },
        {
          header: [
            'Product Code',
            'Description of Goods',
            'Unit Quantity',
            'Kind & No of Packages',
            'Net Weight  (Kg)',
            'Gross Weight  (Kg)',
            'Measurements  (m³)',
          ],
          value: [
            [
              {
                type: 'text',
                value: '',
                placeholder: 'Add product',
                options: [],
                optionfrom: 'productAPI',
              },
              {
                type: 'text',
                value: '',
              },
              {
                type: 'number',
                value: '0',
              },
              {
                type: 'text',
                value: '',
              },
              {
                type: 'text',
                value: '0.00',
              },
              {
                type: 'text',
                value: '',
              },
              {
                type: 'text',
                value: '',
              },
            ],
          ],
        },

        {
          label: 'Consignment Total',
          value: [0, 0, 0, 0, 0],
        },
        {
          label: 'Additional Info',
          type: 'textarea',
          value: '',
        },
        {
          label: 'Signatory Company',
          type: 'text',
          value: '',
        },
        {
          label: 'Name of Authorized Signatory',
          value: [
            {
              placeholder: 'First Name',
              type: 'text',
              value: '',
            },
            {
              placeholder: 'Last Name',
              type: 'text',
              value: '',
            },
          ],
        },
        {
          label: 'Signature',
          type: 'file',
          value: '',
        },
      ],
    },
  ])

  let index = formData2.findIndex((el) => {
    return el.type == data.id.value.toUpperCase()
  })
  console.log(index)
  let addNewLine = (formIndex = 0, indexinArray, type = 'Sales Contract') => {
    let newArray = [
      {
        type: 'text',
        value: '',
        placeholder: 'Add product',
        options: [],
        optionfrom: 'productAPI',
      },
      {
        type: 'text',
        value: '',
      },
      {
        type: 'number',
        value: '0',
      },
      {
        type: 'text',
        value: '',
      },
      {
        type: 'text',
        value: '0.00',
      },
      {
        type: 'text',
        value: '',
        disabled: true,
      },
    ]
    let newArray2 = [
      {
        type: 'text',
        value: '',
        placeholder: 'Add product',
        options: [],
        optionfrom: 'productAPI',
      },
      {
        type: 'text',
        value: '',
      },
      {
        type: 'number',
        value: '0',
      },
      {
        type: 'text',
        value: '',
      },
      {
        type: 'text',
        value: '0.00',
      },
      {
        type: 'text',
        value: '',
      },
      {
        type: 'text',
        value: '',
      },
    ]

    let val = [...formData2]
    val[formIndex].value[indexinArray].value.push(
      type == 'Sales Contract' ? newArray : type == 'Packing List' ? newArray2 : [],
    )

    setFormData2(val)
  }
  let AddRow = (formIndex = 0) => {
    let newArray = [
      {
        placeholder: '',
        value: 'test',
      },
      {
        placeholder: '',
        value: 0,
      },
    ]
    let val = [...formData2]
    val[formIndex].value[24].value.push(newArray)
    setFormData2(val)
  }
  // console.log(formData2[index].value)
  useEffect(() => {}, [formData])
  let getProduct = () => {
    ApiServices.getProducts()
      .then((response) => {
        console.log(response)
        if (Common.getErrors(response, dispatch, navigate)) {
          setProduct(response.data.all_product_details)
        }
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }
  let getContact = () => {
    ApiServices.getContacts()
      .then((response) => {
        console.log(response)
        if (Common.getErrors(response, dispatch, navigate)) {
          setContact(response.data.all_contact_details)
        }
      })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }
  useEffect(() => {
    getProduct()
    getContact()
  }, [])
  let updateData = (index, value, index2 = 0, index3 = null) => {
    let indexmain = formData2.findIndex((el) => {
      return el.type == data.id.value.toUpperCase()
    })
    let prevData = [...formData2]
    if (!Array.isArray(formData2[indexmain].value[index].value))
      formData2[indexmain].value[index].value = value
    else if (index3) {
      formData2[indexmain].value[index].value[index2][index3].value = value
    } else {
      formData2[indexmain].value[index].value[index2].value = value
    }

    console.log(prevData)
    setFormData2(prevData)
  }
  return (
    <CRow>
      <CCol xs={12} lg={12} xl={12}>
        <div
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            padding: '20px 20px 0px 20px',
            textAlign: 'end',
          }}
        >
          <Button style={{ marginRight: 10, height: 40 }}>Cancel</Button>
          <Button style={{ height: 40 }}>Save</Button>
        </div>

        {data.id.value == 'Master File' &&
          formData.map((el, index1) => {
            return (
              <>
                {el.map((el2, index2) => {
                  return (
                    <>
                      <div
                        style={{
                          backgroundColor: 'white',
                          padding: 15,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              color: 'black',
                              fontWeight: 600,
                              fontSize: 18,
                              minHeight: 30,
                            }}
                          >
                            {el2.type}
                          </div>

                          <hr style={{ borderColor: 'black' }}></hr>
                          <CRow>
                            {el2.value.map((el3, index3) => {
                              return (
                                <CCol xs={12} lg={6} xl={4} key={index3 + '' + 1}>
                                  <CFormLabel
                                    style={{
                                      fontSize: 12,
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                    }}
                                  >
                                    {el3.label}
                                    {el3.needRadio && (
                                      <>
                                        <div style={{ display: 'flex' }}>
                                          {el3.radioOption.map((ell, index) => {
                                            return (
                                              <>
                                                <div style={{ marginLeft: 10 }}>
                                                  <input
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id={'flexRadioDefault' + index}
                                                  />
                                                  <label
                                                    htmlFor="flexRadioDefault1"
                                                    style={{ marginLeft: 5 }}
                                                  >
                                                    {ell.value}
                                                  </label>
                                                </div>
                                              </>
                                            )
                                          })}
                                        </div>
                                      </>
                                    )}
                                  </CFormLabel>

                                  <div>
                                    {el3.type == 'text' && (
                                      <CFormInput placeholder={el3.placeholder}></CFormInput>
                                    )}
                                    {el3.type == 'select' && (
                                      <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        isDisabled={false}
                                        isLoading={false}
                                        isClearable={false}
                                        isRtl={false}
                                        isSearchable={true}
                                        name="color"
                                        placeholder={<div>{el3.placeholder}</div>}
                                        onChange={(e) => {
                                          let formD = [...formData]
                                          formD[index1][index2].value[index3].value = e.value
                                          formD[index1][index2].value[
                                            index3
                                          ].extraInput.isDisabled = e.value == 'Yes' ? false : true
                                          setFormData(formD)
                                        }}
                                        defaultValue={el3.value}
                                        options={
                                          el3.optionfrom == 'contactAPI' ? contacts : el3.options
                                        }
                                      />
                                    )}
                                    {el3.type == 'date' && (
                                      <CFormInput
                                        type="date"
                                        placeholder={el3.placeholder}
                                      ></CFormInput>
                                    )}

                                    {el3.extraInput && (
                                      <CFormInput
                                        type="text"
                                        placeholder={el3.placeholder}
                                        style={{ marginTop: 10 }}
                                        disabled={
                                          formData[index1][index2].value[index3].extraInput
                                            .isDisabled
                                        }
                                      ></CFormInput>
                                    )}
                                    {/* 
                              {el3.type == 'radio' && (
                                <CFormInput placeholder={el3.placeholder}></CFormInput>
                              )} */}
                                  </div>
                                </CCol>
                              )
                            })}
                          </CRow>
                        </div>
                      </div>
                    </>
                  )
                })}
              </>
            )
          })}
        {data.id.value == 'Sales Contract' && (
          <div
            style={{
              backgroundColor: 'white',
              padding: 15,
            }}
          >
            <div>
              <div
                style={{
                  color: 'black',
                  fontWeight: 600,
                  fontSize: 18,
                  minHeight: 30,
                  textAlign: 'center',
                }}
              >
                {formData2[index].type}
              </div>

              <hr style={{ borderColor: 'black' }}></hr>

              <CRow className="rowStyle">
                <CCol xs={12} lg={6} xl={6} style={{ border: '1px sloid', border: '1px solid' }}>
                  <CFormLabel>{formData2[index].value[0].label}</CFormLabel>
                  <CFormInput
                    placeholder={formData2[index].value[0].placeholder}
                    value={formData2[index].value[0].value}
                    onChange={(e) => {
                      updateData(0, e.target.value)
                    }}
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={6} style={{ border: '1px solid' }}>
                  <CRow>
                    <CCol xs={12} lg={12} xl={12} style={{ textAlign: 'end' }}>
                      <CFormLabel>Page</CFormLabel>
                      <br />
                      <CFormLabel style={{ fontWeight: 600 }}>1 of 1</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={12} xl={12}>
                      <CRow>
                        <CCol>
                          <CFormLabel>{formData2[index].value[2].label}</CFormLabel>
                          <CFormInput
                            placeholder={formData2[index].value[2].placeholder}
                            value={formData2[index].value[2].value}
                            onChange={(e) => {
                              updateData(2, e.target.value)
                            }}
                          ></CFormInput>
                        </CCol>
                        <CCol>
                          <CFormLabel>{formData2[index].value[3].label}</CFormLabel>
                          <CFormInput
                            type="date"
                            placeholder={''}
                            value={formData2[index].value[3].value}
                            onChange={(e) => {
                              updateData(3, e.target.value)
                            }}
                          ></CFormInput>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow className="rowStyle">
                <CCol xs={12} lg={6} xl={6} style={{ border: '1px sloid', border: '1px solid' }}>
                  <CFormLabel>{formData2[index].value[4].label}</CFormLabel>
                  <CFormInput
                    placeholder={formData2[index].value[4].label}
                    value={formData2[index].value[4].value}
                    onChange={(e) => {
                      updateData(4, e.target.value)
                    }}
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={6} style={{ border: '1px solid' }}>
                  <CFormLabel>{formData2[index].value[5].label}</CFormLabel>
                  <CFormInput
                    type="date"
                    placeholder={formData2[index].value[5].label}
                    value={formData2[index].value[5].value}
                    onChange={(e) => {
                      updateData(5, e.target.value)
                    }}
                  ></CFormInput>
                </CCol>
              </CRow>
              <CRow className="rowStyle">
                <CCol xs={12} lg={6} xl={6} style={{ border: '1px sloid', border: '1px solid' }}>
                  <CRow className=" bB">
                    <CCol xs={12} lg={6} xl={6} style={{ textAlign: 'end', paddingBottom: 10 }}>
                      <CFormLabel style={{ width: '100%', textAlign: 'start' }}>
                        {formData2[index].value[6].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{'test'}</div>}
                        defaultValue={formData2[index].value[6].value}
                        options={formData2[index].value[6].options}
                        onChange={(e) => {
                          console.log(e)
                          updateData(6, e.value)
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} style={{ textAlign: 'end' }} className="bL">
                      <CFormLabel style={{ width: '100%', textAlign: 'start' }}>
                        {formData2[index].value[7].label}
                      </CFormLabel>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol xs={12} lg={6} xl={6} style={{ textAlign: 'end', paddingBottom: 10 }}>
                      <CFormLabel style={{ width: '100%', textAlign: 'start' }}>
                        {formData2[index].value[8].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{'test'}</div>}
                        defaultValue={formData2[index].value[8].label}
                        options={formData2[index].value[8].options}
                        onChange={(e) => {
                          updateData(8, e.value)
                        }}
                      />
                    </CCol>
                    <CCol className="bL" xs={12} lg={6} xl={6} style={{ textAlign: 'end' }}>
                      <CFormLabel style={{ width: '100%', textAlign: 'start' }}>
                        {formData2[index].value[9].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{'test'}</div>}
                        defaultValue={formData2[index].value[9].value}
                        options={formData2[index].value[9].options}
                        onChange={(e) => {
                          updateData(9, e.value)
                        }}
                      />
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} lg={6} xl={6} style={{ border: '1px solid' }}>
                  <CFormLabel style={{ width: '100%', textAlign: 'start' }}>
                    {formData2[index].value[10].label}
                  </CFormLabel>
                  <textarea
                    placeholder={''}
                    value={formData2[index].value[10].value}
                    rows={6}
                    style={{ width: '100%', resize: 'none', paddingLeft: 10 }}
                    onChange={(e) => {
                      updateData(10, e.target.value)
                    }}
                  ></textarea>
                </CCol>
              </CRow>
              <CRow className="rowStyle">
                <CCol
                  xs={12}
                  lg={12}
                  xl={12}
                  style={{ border: '1px sloid', border: '1px solid', paddingBottom: 100 }}
                >
                  <CRow>
                    <CCol xs={12} lg={2} xl={2} className="bB bR">
                      <CFormLabel>{formData2[index].value[11].header[0]}</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={4} xl={4} className="bB bR">
                      <CFormLabel>{formData2[index].value[11].header[1]}</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={2} xl={2} className="bB bR">
                      <CFormLabel>{formData2[index].value[11].header[2]}</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={2} xl={2} className="bB bR">
                      <CFormLabel>{formData2[index].value[11].header[3]}</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>{formData2[index].value[11].header[4]}</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB">
                      <CFormLabel>{formData2[index].value[11].header[5]}</CFormLabel>
                    </CCol>
                  </CRow>
                  {formData2[index].value[11].value.map((el, index) => {
                    // console.log(el)
                    return (
                      <>
                        {el.placeholder}
                        <CRow>
                          <CCol
                            xs={12}
                            lg={2}
                            xl={2}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={el[0].placeholder}
                              value={el[0].value}
                              onChange={(e) => {
                                updateData(11, e.target.value, index, 0)
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={4}
                            xl={4}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={''}
                              value={el[1].value}
                              onChange={(e) => {
                                updateData(11, e.target.value, index, 1)
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={2}
                            xl={2}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={''}
                              value={el[2].value}
                              onChange={(e) => {
                                updateData(11, e.target.value, index, 2)
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={2}
                            xl={2}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={''}
                              value={el[3].value}
                              onChange={(e) => {
                                updateData(11, e.target.value, index, 3)
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={''}
                              value={el[4].value}
                              onChange={(e) => {
                                updateData(11, e.target.value, index, 4)
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={''}
                              value={el[5].value}
                              disabled={el[5].disabled}
                              onChange={(e) => {
                                updateData(11, e.target.value, index, 5)
                              }}
                            ></CFormInput>
                          </CCol>
                        </CRow>
                      </>
                    )
                  })}
                  <Button
                    style={{ marginTop: 10 }}
                    onClick={() => {
                      addNewLine(index, 11, 'Sales Contract')
                    }}
                  >
                    Add Another Line{' '}
                  </Button>
                </CCol>
              </CRow>
              <CRow className="rowStyle rowStyle2 bL bR">
                <CCol xs={12} lg={6} xl={6}>
                  <CFormLabel style={{ width: '100%', textAlign: 'start' }}>
                    Consignment Total
                  </CFormLabel>
                </CCol>
                <CCol xs={12} lg={2} xl={2}>
                  <CFormLabel style={{ width: '100%', textAlign: 'start' }}>0</CFormLabel>
                </CCol>
                <CCol xs={12} lg={3} xl={3}></CCol>
                <CCol xs={12} lg={1} xl={1}>
                  <CFormLabel style={{ width: '100%', textAlign: 'start' }}>0.00</CFormLabel>
                </CCol>
              </CRow>
              <CRow className="rowStyle">
                <CCol
                  xs={12}
                  lg={6}
                  xl={6}
                  style={{ border: '1px solid', paddingLeft: 0, paddingRight: 0 }}
                >
                  <div className="bB pL pR" style={{ height: '50%' }}>
                    <CFormLabel style={{ width: '100%', textAlign: 'start' }}>
                      {formData2[index].value[12].label}
                    </CFormLabel>
                    <textarea
                      placeholder={''}
                      rows={6}
                      value={formData2[index].value[12].value}
                      style={{
                        width: '100%',
                        resize: 'none',
                        paddingLeft: 10,
                        borderRadius: 5,
                        borderColor: 'rgba(0,0,0,0.1)',
                        height: '80%',
                      }}
                      onChange={(e) => {
                        updateData(12, e.target.value)
                      }}
                    ></textarea>
                  </div>
                  <div className="bB pL pR" style={{ height: '50%' }}>
                    <CFormLabel style={{ width: '100%', textAlign: 'start' }}>
                      {formData2[index].value[13].label}
                    </CFormLabel>
                    <textarea
                      placeholder={''}
                      rows={6}
                      value={formData2[index].value[13].value}
                      style={{
                        width: '100%',
                        resize: 'none',
                        paddingLeft: 10,
                        borderRadius: 5,
                        borderColor: 'rgba(0,0,0,0.1)',
                        height: '80%',
                      }}
                      onChange={(e) => {
                        updateData(13, e.target.value)
                      }}
                    ></textarea>
                  </div>
                </CCol>

                <CCol
                  xs={12}
                  lg={6}
                  xl={6}
                  style={{ paddingLeft: 0, paddingRight: 0, border: '1px solid' }}
                >
                  {formData2[index].value[24].value.map((el, index) => {
                    return (
                      <div style={{ minHeight: 50, display: 'flex' }} key={index}>
                        <div
                          style={{
                            width: '70%',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: 12,
                            color: 'blue',
                          }}
                          className="pL pR bB bR"
                        >
                          <CFormInput
                            placeholder={el[0].placeholder}
                            value={el[0].value}
                            onChange={(e) => {
                              updateData(24, e.target.value, index, 0)
                            }}
                          ></CFormInput>
                        </div>
                        <div
                          style={{
                            width: '30%',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: 12,
                            color: 'blue',
                          }}
                          className="pL pR bB"
                        >
                          <CFormInput
                            placeholder={el[1].placeholder}
                            value={el[1].value}
                            onChange={(e) => {
                              updateData(24, e.target.value, index, 1)
                            }}
                          ></CFormInput>
                        </div>
                      </div>
                    )
                  })}
                  {formData2[index].value[24].value.length < 3 && (
                    <div style={{ minHeight: 50, display: 'flex' }}>
                      <div
                        style={{
                          width: '70%',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: 12,
                          color: 'blue',
                          fontWeight: 600,
                        }}
                        className="pL pR bB bR"
                        onClick={() => {
                          AddRow()
                        }}
                      >
                        <CFormLabel>Add Charge or discount</CFormLabel>
                      </div>
                      <div
                        style={{
                          width: '30%',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: 12,
                          color: 'blue',
                          fontWeight: 600,
                        }}
                        className="pL pR bB"
                      ></div>
                    </div>
                  )}
                  {/* <div style={{ minHeight: 50, display: 'flex' }}>
                    <div
                      style={{
                        width: '70%',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 12,
                      }}
                      className="pL pR bB bR"
                    >
                      <CFormLabel>Add Tax</CFormLabel>
                    </div>
                    <div
                      style={{
                        width: '30%',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 12,
                      }}
                      className="pL pR bB"
                    ></div>
                  </div> */}
                  <div style={{ minHeight: 50, display: 'flex' }}>
                    <div
                      style={{
                        width: '70%',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                      className="pL pR bB bR"
                    >
                      <CFormLabel>Total</CFormLabel>
                    </div>
                    <div style={{ width: '30%' }} className="pL pR bB"></div>
                  </div>
                  <div style={{ minHeight: 50, display: 'flex' }}>
                    <div
                      style={{
                        width: '70%',
                        display: 'flex',
                        fontWeight: 600,
                        fontSize: 12,
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                      className="pL pR bB bR pB"
                    >
                      <CFormLabel>{formData2[index].value[14].label}</CFormLabel>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <div style={{ width: '30%' }}>
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={true}
                            name="color"
                            placeholder={<div>{'test'}</div>}
                            defaultValue={formData2[index].value[15].value}
                            options={formData2[index].value[15].options}
                            onChange={(e) => {
                              updateData(15, e.value)
                            }}
                          />
                        </div>
                        <div style={{ width: '70%' }}>
                          <CFormInput
                            placeholder={''}
                            value={formData2[index].value[16].value}
                            onChange={(e) => {
                              updateData(16, e.target.value)
                            }}
                          ></CFormInput>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: '30%' }} className="pL pR bB">
                      <CFormLabel style={{ width: '100%', fontSize: 12, textAlign: 'start' }}>
                        {formData2[index].value[17].label}
                      </CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{'test'}</div>}
                        defaultValue={formData2[index].value[17].value}
                        options={formData2[index].value[17].options}
                        onChange={(e) => {
                          updateData(17, e.value)
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ minHeight: 50, display: 'flex' }}>
                    <div
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: 12,
                        flexDirection: 'column',
                      }}
                      className="pL pR bB bR pB"
                    >
                      <CFormLabel>{formData2[index].value[18].label}</CFormLabel>
                      <CFormInput
                        placeholder={''}
                        value={formData2[index].value[18].value}
                        onChange={(e) => {
                          updateData(18, e.target.value)
                        }}
                      ></CFormInput>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      fontSize: 12,
                      flexDirection: 'column',
                      minHeight: 50,
                    }}
                    className="pL pR bB pB"
                  >
                    <CFormLabel>{formData2[index].value[19].label}</CFormLabel>
                    <div style={{ display: 'flex', gap: 15 }}>
                      <CFormInput
                        placeholder={'First Name'}
                        value={formData2[index].value[20].value}
                        onChange={(e) => {
                          updateData(20, e.target.value)
                        }}
                      ></CFormInput>
                      <CFormInput
                        placeholder={'Last Name'}
                        value={formData2[index].value[21].value}
                        onChange={(e) => {
                          updateData(21, e.target.value)
                        }}
                      ></CFormInput>
                    </div>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      fontSize: 12,
                      flexDirection: 'column',
                      minHeight: 50,
                    }}
                    className="pL pR bB pB"
                  >
                    <CFormLabel>{formData2[index].value[22].label}</CFormLabel>
                    <div style={{ display: 'flex', gap: 15, height: 100 }}>
                      <CFormInput
                        type="file"
                        placeholder={''}
                        value={''}
                        onChange={(e) => {
                          // console.log(e)
                          const files = Array.from(e.target.files)
                          updateData(23, files)
                          // console.log('files:', files)
                        }}
                      ></CFormInput>
                    </div>
                  </div>
                </CCol>
              </CRow>
            </div>
          </div>
        )}
        {data.id.value == 'Packing List' && (
          <div
            style={{
              backgroundColor: 'white',
              padding: 15,
            }}
          >
            <div>
              <div
                style={{
                  color: 'black',
                  fontWeight: 600,
                  fontSize: 18,
                  minHeight: 30,
                  textAlign: 'center',
                }}
              >
                {formData2[index].type}
              </div>

              <hr style={{ borderColor: 'black' }}></hr>

              <CRow className="rowStyle">
                <CCol xs={12} lg={6} xl={6} style={{ border: '1px sloid', border: '1px solid' }}>
                  <CFormLabel>{formData2[index].value[0].label}</CFormLabel>
                  <CFormInput
                    placeholder={formData2[index].value[0].placeholder}
                    value={formData2[index].value[0].value}
                    onChange={(e) => {
                      updateData(0, e.target.value)
                    }}
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={6} style={{ border: '1px solid' }}>
                  <CRow>
                    <CCol xs={12} lg={12} xl={12} style={{ textAlign: 'end' }}>
                      <CFormLabel>Page</CFormLabel>
                      <br />
                      <CFormLabel style={{ fontWeight: 600 }}>1 of 1</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={12} xl={12}>
                      <CRow>
                        <CCol className="bB bT pB" xs={12} lg={6} xl={6}>
                          <div style={{ display: 'flex', gap: 10 }}>
                            <div>
                              <CFormLabel>{formData2[index].value[2].label}</CFormLabel>
                              <CFormInput
                                placeholder={formData2[index].value[2].placeholder}
                                value={formData2[index].value[2].value}
                                onChange={(e) => {
                                  updateData(2, e.target.value)
                                }}
                              ></CFormInput>
                            </div>
                            <div>
                              <CFormLabel>{formData2[index].value[3].label}</CFormLabel>
                              <CFormInput
                                type="date"
                                placeholder={''}
                                value={formData2[index].value[3].value}
                                onChange={(e) => {
                                  updateData(3, e.target.value)
                                }}
                              ></CFormInput>
                            </div>
                          </div>
                        </CCol>
                        <CCol className="bL bB bT pB" xs={12} lg={6} xl={6}>
                          <CFormLabel>{formData2[index].value[4].label}</CFormLabel>
                          <CFormInput
                            type="date"
                            placeholder={''}
                            value={formData2[index].value[4].value}
                            onChange={(e) => {
                              updateData(3, e.target.value)
                            }}
                          ></CFormInput>
                        </CCol>
                        <CCol className="pB" xs={12} lg={6} xl={6}>
                          <CFormLabel>{formData2[index].value[5].label}</CFormLabel>
                          <CFormInput
                            placeholder={formData2[index].value[5].placeholder}
                            value={formData2[index].value[5].value}
                            onChange={(e) => {
                              updateData(2, e.target.value)
                            }}
                          ></CFormInput>
                        </CCol>
                        <CCol className="bL pB" xs={12} lg={6} xl={6}>
                          <CFormLabel>{formData2[index].value[6].label}</CFormLabel>
                          <CFormInput
                            type="text"
                            placeholder={''}
                            value={formData2[index].value[6].value}
                            onChange={(e) => {
                              updateData(3, e.target.value)
                            }}
                          ></CFormInput>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow className="rowStyle ">
                <CCol xs={12} lg={6} xl={6} className="bB bL">
                  <CFormLabel>{formData2[index].value[7].label}</CFormLabel>
                  <CFormInput
                    placeholder={formData2[index].value[7].label}
                    value={formData2[index].value[7].value}
                    onChange={(e) => {
                      updateData(7, e.target.value)
                    }}
                  ></CFormInput>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <CFormLabel>{formData2[index].value[8].label}</CFormLabel>
                  <CFormInput
                    placeholder={formData2[index].value[8].label}
                    value={formData2[index].value[8].value}
                    onChange={(e) => {
                      updateData(5, e.target.value)
                    }}
                  ></CFormInput>
                </CCol>
              </CRow>
              <CRow className="rowStyle ">
                <CCol xs={12} lg={6} xl={6} className="bB bL">
                  <CRow>
                    <CCol xs={12} lg={6} xl={6} className="bR pB">
                      <CFormLabel>{formData2[index].value[9].label}</CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{'test'}</div>}
                        defaultValue={formData2[index].value[9].value}
                        options={formData2[index].value[9].options}
                        onChange={(e) => {
                          console.log(e)
                          updateData(9, e.value)
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6}>
                      <CFormLabel>{formData2[index].value[10].label}</CFormLabel>
                      {/* <CFormInput
                        placeholder={''}
                        value={formData2[index].value[10].value}
                        onChange={(e) => {
                          updateData(10, e.target.value)
                        }}
                      ></CFormInput> */}
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <CRow>
                    <CCol xs={12} lg={6} xl={6} className="bR pB">
                      <CFormLabel>{formData2[index].value[11].label}</CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{'test'}</div>}
                        defaultValue={formData2[index].value[11].value}
                        options={formData2[index].value[11].options}
                        onChange={(e) => {
                          console.log(e)
                          updateData(11, e.value)
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6}>
                      <CFormLabel>{formData2[index].value[12].label}</CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{'test'}</div>}
                        defaultValue={formData2[index].value[12].value}
                        options={formData2[index].value[12].options}
                        onChange={(e) => {
                          console.log(e)
                          updateData(12, e.value)
                        }}
                      />
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bL">
                  <CRow>
                    <CCol xs={12} lg={6} xl={6} className="bR pB bB">
                      <CFormLabel>{formData2[index].value[13].label}</CFormLabel>
                      <CFormInput
                        placeholder={''}
                        value={formData2[index].value[13].value}
                        onChange={(e) => {
                          updateData(13, e.target.value)
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bB">
                      <CFormLabel>{formData2[index].value[14].label}</CFormLabel>
                      <CFormInput
                        placeholder={''}
                        value={formData2[index].value[14].value}
                        onChange={(e) => {
                          updateData(14, e.target.value)
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bR pB bB">
                      <CFormLabel>{formData2[index].value[15].label}</CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{'test'}</div>}
                        defaultValue={formData2[index].value[15].value}
                        options={formData2[index].value[15].options}
                        onChange={(e) => {
                          console.log(e)
                          updateData(15, e.value)
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bB">
                      <CFormLabel>{formData2[index].value[16].label}</CFormLabel>
                      <CFormInput
                        type="date"
                        placeholder={''}
                        value={formData2[index].value[16].value}
                        onChange={(e) => {
                          updateData(16, e.target.value)
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bR pB bB">
                      <CFormLabel>{formData2[index].value[17].label}</CFormLabel>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        placeholder={<div>{'test'}</div>}
                        defaultValue={formData2[index].value[17].value}
                        options={formData2[index].value[17].options}
                        onChange={(e) => {
                          console.log(e)
                          updateData(17, e.value)
                        }}
                      />
                    </CCol>
                    <CCol xs={12} lg={6} xl={6} className="bB">
                      <CFormLabel>{formData2[index].value[18].label}</CFormLabel>
                      <CFormInput
                        placeholder={''}
                        value={formData2[index].value[18].value}
                        onChange={(e) => {
                          updateData(18, e.target.value)
                        }}
                      ></CFormInput>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}
                  >
                    <CFormLabel>{formData2[index].value[19].label}</CFormLabel>
                    <textarea
                      placeholder={''}
                      rows={6}
                      value={formData2[index].value[13].value}
                      style={{
                        width: '100%',
                        resize: 'none',
                        paddingLeft: 10,
                        borderRadius: 5,
                        borderColor: 'rgba(0,0,0,0.1)',
                        height: '78%',
                      }}
                      onChange={(e) => {
                        updateData(19, e.target.value)
                      }}
                    ></textarea>
                  </div>
                </CCol>
              </CRow>

              <CRow className="rowStyle">
                <CCol
                  xs={12}
                  lg={12}
                  xl={12}
                  style={{ border: '1px sloid', border: '1px solid', paddingBottom: 100 }}
                >
                  <CRow>
                    <CCol xs={12} lg={2} xl={2} className="bB bR">
                      <CFormLabel>{formData2[index].value[20].header[0]}</CFormLabel>
                    </CCol>
                    <CCol
                      xs={12}
                      lg={12 - formData2[index].value[20].header.length}
                      xl={12 - formData2[index].value[20].header.length}
                      className="bB bR"
                    >
                      <CFormLabel>{formData2[index].value[20].header[1]}</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>{formData2[index].value[20].header[2]}</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>{formData2[index].value[20].header[3]}</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>{formData2[index].value[20].header[4]}</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB bR">
                      <CFormLabel>{formData2[index].value[20].header[5]}</CFormLabel>
                    </CCol>
                    <CCol xs={12} lg={1} xl={1} className="bB">
                      <CFormLabel>{formData2[index].value[20].header[6]}</CFormLabel>
                    </CCol>
                  </CRow>
                  {formData2[index].value[20].value.map((el, index) => {
                    console.log(el)
                    return (
                      <>
                        {el.placeholder}
                        <CRow>
                          <CCol
                            xs={12}
                            lg={2}
                            xl={2}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={el[0].placeholder}
                              value={el[0].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 0)
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={12 - el.length}
                            xl={12 - el.length}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={''}
                              value={el[1].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 1)
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={''}
                              value={el[2].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 2)
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={''}
                              value={el[3].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 3)
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB bR"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={''}
                              value={el[4].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 4)
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={''}
                              value={el[5].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 5)
                              }}
                            ></CFormInput>
                          </CCol>
                          <CCol
                            xs={12}
                            lg={1}
                            xl={1}
                            className="bB"
                            style={{ paddingBottom: 5, paddingTop: 5 }}
                          >
                            <CFormInput
                              placeholder={''}
                              value={el[6].value}
                              onChange={(e) => {
                                updateData(20, e.target.value, index, 6)
                              }}
                            ></CFormInput>
                          </CCol>
                        </CRow>
                      </>
                    )
                  })}
                  <Button
                    style={{ marginTop: 10 }}
                    onClick={() => {
                      addNewLine(index, 20, 'Packing List')
                    }}
                  >
                    Add Another Line{' '}
                  </Button>
                </CCol>
              </CRow>

              <CRow className="rowStyle rowStyle2 bL bR">
                <CCol
                  xs={12}
                  lg={12 - formData2[index].value[21].value.length}
                  xl={12 - formData2[index].value[21].value.length}
                  className="bB"
                >
                  <CFormLabel style={{ width: '100%', textAlign: 'start' }}>
                    {formData2[index].value[21].label}
                  </CFormLabel>
                </CCol>
                {formData2[index].value[21].value.map((el, i) => {
                  return (
                    <CCol xs={12} lg={1} xl={1} key={i} className="bB">
                      <CFormLabel style={{ width: '100%', textAlign: 'start' }}>{el}</CFormLabel>
                    </CCol>
                  )
                })}
              </CRow>
              <CRow className="rowStyle">
                <CCol xs={12} lg={6} xl={6} className="bB bL bR">
                  <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}
                  >
                    <CFormLabel>{formData2[index].value[22].label}</CFormLabel>
                    <textarea
                      placeholder={''}
                      rows={6}
                      value={formData2[index].value[22].value}
                      style={{
                        width: '100%',
                        resize: 'none',
                        paddingLeft: 10,
                        borderRadius: 5,
                        borderColor: 'rgba(0,0,0,0.1)',
                        height: '78%',
                      }}
                      onChange={(e) => {
                        updateData(22, e.target.value)
                      }}
                    ></textarea>
                  </div>
                </CCol>
                <CCol xs={12} lg={6} xl={6} className="bB bR">
                  <CRow>
                    <CCol xs={12} lg={12} xl={12} className="bB pB">
                      <CFormLabel>{formData2[index].value[23].label}</CFormLabel>
                      <CFormInput
                        placeholder={''}
                        value={formData2[index].value[23].value}
                        onChange={(e) => {
                          updateData(23, e.target.value)
                        }}
                      ></CFormInput>
                    </CCol>
                    <CCol xs={12} lg={12} xl={12} className="bB pB">
                      <CFormLabel>{formData2[index].value[24].label}</CFormLabel>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {formData2[index].value[24].value.map((el, ind) => {
                          return (
                            <CFormInput
                              key={ind}
                              placeholder={formData2[index].value[24].placeholder}
                              value={el.value}
                              onChange={(e) => {
                                updateData(24, e.target.value, ind)
                              }}
                            ></CFormInput>
                          )
                        })}
                      </div>
                    </CCol>
                    <CCol xs={12} lg={12} xl={12} className="pB">
                      <CFormLabel>{formData2[index].value[25].label}</CFormLabel>
                      <div style={{ display: 'flex', gap: 15, height: 100 }}>
                        <CFormInput
                          type="file"
                          placeholder={''}
                          value={''}
                          onChange={(e) => {
                            // console.log(e)
                            const files = Array.from(e.target.files)
                            updateData(25, files)
                            // console.log('files:', files)
                          }}
                        ></CFormInput>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </div>
          </div>
        )}
      </CCol>
    </CRow>
  )
}
export default ExportCreateFile

import React, { useEffect, useState } from 'react'
import {
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CListGroup,
  CCard,
  CCardBody,
  CFormInput,
  CFormLabel,
} from '@coreui/react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import Select from 'react-select'
import { Button } from 'primereact/button'
import { TriStateCheckbox } from 'primereact/tristatecheckbox'
import { useNavigate } from 'react-router-dom'
import ApiServices from 'src/services/apiservices'
const Export = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState([]);
  const [selectedFormType, setSelectedFormType] = useState([
    { id: 1, value: 'Master File', label: 'Master File' },
  ])
  const [visible, setVisible] = useState(false)
  const [filter, setVisibleFilter] = useState(false)
  const [create, setCreate] = useState(false)
  const [shipment, setShipment] = useState([])
  const [selectedShipment, setSelectedShipment] = useState([])
  const [selectedshipmentType, setSelectedShipmentType] = useState([
    { id: 1, value: 'Master File', label: 'Master File' },
  ])
  const navigate = useNavigate()
  const [checked, setChecked] = useState(false)
  const [shipType, setShipType] = useState([
    {
      id: 1,
      title: 'Tax Invoice',
      checked: false,
    },
    {
      id: 2,
      title: 'Sales Contract',
      checked: false,
    },
    {
      id: 3,
      title: 'Packing List',
      checked: false,
    },
  ])
  const [filterData, setFilterData] = useState({
    filterType: '',
    value: '',
    date: '',
  })
  const usersData = [
    {
      id: 1,
      shipment_id: 'SHIP001',
      shipment_product: 'test',
      buyer_name: 'gfghfh fhghg fhgh',
      filesName: [
        {
          id: 1,
          value: 'Master File',
          label: 'Master File',
          data: [
            { field: 'field1' },
            { field: 'field2' },
            { field: 'field3' },
            { field: 'field4' },
            { field: 'field5' },
          ],
        },
        {
          id: 2,
          value: 'Tax Invoice',
          label: 'Tax Invoice',
          data: [
            { field: 'field1' },
            { field: 'field2' },
            { field: 'field3' },
            { field: 'field4' },
          ],
        },
        {
          id: 3,
          value: 'Sales Contract',
          label: 'Sales Contract',
          data: [{ field: 'field1' }, { field: 'field2' }, { field: 'field3' }],
        },
        {
          id: 4,
          value: 'Packing List',
          label: 'Packing List',
          data: [{ field: 'field1' }, { field: 'field2' }],
        },
      ],
    },
    {
      id: 2,
      shipment_id: 'SHIP002',
      shipment_product: 'test2',
      buyer_name: 'gfghfh fhghg fhgh',
      filesName: [
        {
          id: 1,
          value: 'Master File',
          label: 'Master File',
          data: [
            { field: 'field1' },
            { field: 'field2' },
            { field: 'field3' },
            { field: 'field4' },
            { field: 'field5' },
          ],
        },
        {
          id: 2,
          value: 'Tax Invoice',
          label: 'Tax Invoice',
          data: [
            { field: 'field1' },
            { field: 'field2' },
            { field: 'field3' },
            { field: 'field4' },
          ],
        },
        {
          id: 3,
          value: 'Sales Contract',
          label: 'Sales Contract',
          data: [{ field: 'field1' }, { field: 'field2' }, { field: 'field3' }],
        },
        {
          id: 4,
          value: 'Packing List',
          label: 'Packing List',
          data: [{ field: 'field1' }, { field: 'field2' }],
        },
      ],
    },
  ]
  const options2 = [
    { id: 2, value: 'Tax Invoice', label: 'Tax Invoice' },
    { id: 3, value: 'Sales Contract', label: 'Sales Contract' },
    { id: 4, value: 'Packing List', label: 'Packing List' },
  ]

  useEffect(() => {
    ApiServices.getForms().then((response) => {
      console.log('forms response', response)
      setForms(response?.data?.forms_details);
    })
      .catch((error) => {
        Common.getErrors(error, dispatch, navigate)
      })
  }, [])

  let createSearchParams = (type = 'NEW', id = 0, prevdata = null) => {
    let data = {
      data: selectedshipmentType,
      id: id,
      type: type,
      extradata: prevdata,
    }
    return btoa(JSON.stringify(data))
  }
  const handleCreate = () => {
    if (selectedshipmentType.length >= 2) {
      navigate({
        pathname: '/default/exportcreate',
        search: createSearchParams(),
      })
    } else {
      alert('please select shipment type')
    }
  }
  let Files = []
  useEffect(() => {
    setShipment(usersData)
  }, [])
  const handleCheck = (e) => {
    let ship2 = shipType
    ship2[e.target.id].checked = !ship2[e.target.id].checked
    setShipType(ship2)
    console.log(ship2)
  }
  const options = [
    { value: 'ShipmentId', label: 'Shipment Number' },
    { value: 'ProductName', label: 'Product Name' },
    { value: 'BuyerName', label: 'Buyer Name' },
  ]
  const viewBodyTemplate = (product) => {
    return (
      <Tag
        value={'View/Edit'}
        style={{ cursor: 'pointer' }}
        onClick={() => {
          navigate({
            pathname: '/default/exportcreate',
            search: createSearchParams('OLD', product.id, product),
          })
        }}
      />
    )
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
          <Button onClick={() => setVisibleFilter(!filter)} style={{ marginRight: 10 }}>
            Filter
          </Button>
          <Button onClick={() => setVisible(!visible)}>Create Export Shipment</Button>
        </div>
      </CCol>

      <CCol xs={12} lg={12} xl={12}>
        <CCard
          className="mb-4"
          style={{ transform: 'translateY(0px)', borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
          <CCardBody>
            <CListGroup>
              {filter && (
                <CRow style={{ marginBottom: 10 }}>
                  <CCol xs={12} lg={6} xl={4} style={{ marginBottom: 10 }}>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                      placeholder={<div>Search By</div>}
                      onChange={(e) => setFilterData({ ...filterData, ...{ filterType: e.value } })}
                      defaultValue={filterData.filterType}
                      options={options}
                    />
                  </CCol>
                  <CCol xs={12} lg={6} xl={4} style={{ marginBottom: 10 }}>
                    <CFormInput
                      value={filterData.value}
                      onChange={(e) =>
                        setFilterData({ ...filterData, ...{ value: e.target.value } })
                      }
                    ></CFormInput>
                  </CCol>
                  <CCol xs={12} lg={6} xl={4}>
                    <Button
                      onClick={() => console.log(filterData)}
                      style={{ width: '100%', height: 40 }}
                    >
                      Search
                    </Button>
                  </CCol>
                </CRow>
              )}
              <DataTable
                value={forms}
                paginator={shipment.length > 0}
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                // selectionMode={rowClick ? null : 'checkbox'}
                selectionMode={'checkbox'}
                selection={selectedForm}
                onSelectionChange={(e) => setSelectedForm(e.value)}
                dataKey="id"
                tableStyle={{ minWidth: '50rem' }}
              >
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column
                  header="View"
                  headerStyle={{ minWidth: '5rem' }}
                  body={viewBodyTemplate}
                ></Column>
                <Column field="shipment_id" header="Shipment Number"></Column>
                <Column field="shipment_product" header="Product"></Column>
                <Column field="buyer_name" header="Buyer Name"></Column>
              </DataTable>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        {/* <Button onClick={() => setVisible(!visible)}>Launch static backdrop modal</Button> */}
        <CModal
          backdrop="static"
          visible={visible}
          onClose={() => {
            setVisible(false)
            let ship2 = shipType
            ship2.map((e) => {
              return (e.checked = false)
            })
            console.log(ship2)
            setShipType(ship2)
          }}
        >
          <CModalHeader closeButton={false}>
            <div style={{ display: 'flex' }}>
              <CModalTitle>Create New Shipment</CModalTitle>
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
            {/* <CFormInput placeholder="New Export Title" autoComplete="New Export Title" /> */}
            <div style={{ marginTop: 10 }}>
              {selectedshipmentType.map((e, index) => {
                return (
                  <>
                    <div style={{ marginBottom: 10 }}>
                      <TriStateCheckbox value={true} style={{ marginRight: 10 }} disabled />
                      {e.value}
                    </div>
                  </>
                )
              })}
              <div style={{ marginTop: 15 }}>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={selectedshipmentType.filter((el) => {
                    return el.value != 'Master File'
                  })}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="color"
                  options={options2}
                  isMulti
                  onChange={(e) => {
                    let s2 = []
                    s2.push({ id: 1, value: 'Master File', label: 'Master File' })
                    e.forEach((e) => {
                      s2.push(e)
                    })
                    setSelectedShipmentType(s2)
                  }}
                />
              </div>
            </div>
          </CModalBody>
          <CModalFooter>
            <Button
              color="primary"
              style={{ height: 40, margin: 20 }}
              onClick={() => {
                handleCreate()
              }}
            >
              Save changes
            </Button>
          </CModalFooter>
        </CModal>
      </CCol>
    </CRow>
  )
}
export default Export

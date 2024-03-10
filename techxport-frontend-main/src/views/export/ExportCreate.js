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
const ExportCreate = () => {
  const op = useRef(null)
  const search = useLocation().search
  const data = JSON.parse(atob(search.substring(1)))
  const [tabsData, setTabsData] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [prevData, setPrevData] = useState({})
  const [pop, showPop] = useState([])
  let getDetails = (data) => {
    setPrevData(data)
    setTabsData(data.extradata.filesName)
  }
  let getD = () => {
    if (data.type == 'NEW') {
      setTabsData(data.data)
    } else {
      getDetails(data)
    }
  }
  useEffect(() => {
    getD()
  }, [])

  let PrevTarget = null
  const navigate = useNavigate()
  const viewBodyTemplate1 = (product) => {
    return (
      <>
        <p>{moment().format('DD MMM YYYY')}</p>
      </>
    )
  }
  const viewBodyTemplate2 = (product) => {
    console.log(product)
    return (
      <>
        <Button
          style={{
            padding: 5,
            backgroundColor: 'transparent',
            border: 'none',
            color: 'black',
          }}
          onClick={(e) => {
            console.log(product, e)
            op.current.toggle(e)
            let p = []
            if (product.value == 'Master File') {
              p = [
                {
                  id: 1,
                  label: 'Edit Document',
                  procuctId: product.id,
                  icon: cilPencil,
                  value: product.value,
                },
              ]
            } else {
              p = [
                {
                  id: 1,
                  label: 'Edit Document',
                  procuctId: product.id,
                  icon: cilPencil,
                  value: product.value,
                },
                {
                  id: 2,
                  label: 'Download',
                  procuctId: product.id,
                  icon: cilArrowThickToBottom,
                  value: product.value,
                },
                {
                  id: 3,
                  label: 'Delete',
                  procuctId: product.id,
                  icon: cilTrash,
                  value: product.value,
                },
              ]
            }

            showPop(p)
          }}
        >
          <CIcon icon={cilOptions}></CIcon>
        </Button>
        {/* {pop == product.id && (
         
        )} */}
      </>
    )
  }
  // const viewSelection = (product) => {
  //   console.log(product)
  // }
  let createSearchParams = (id = 0) => {
    let d = {
      id: id,
      type: data.type,
    }
    return btoa(JSON.stringify(d))
  }
  const tackAction = (id, type) => {
    if (type == 'Edit') {
      navigate({
        pathname: '/default/exportcreatefile',
        search: createSearchParams(id),
      })
    } else if (type == 'Download') {
      alert('Download api will call here')
    } else {
      alert('delete api will call here')
    }
  }
  return (
    <>
      <DataTable
        value={tabsData}
        selectionMode={'checkbox'}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        tableStyle={{ minWidth: '50rem' }}
        stripedRows
      >
        {/* {viewSelection} */}
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
        <Column field="value" header="Document"></Column>
        <Column header="Date" body={viewBodyTemplate1}></Column>
        <Column
          header=""
          body={viewBodyTemplate2}
          style={{ textAlign: 'center', position: 'relative' }}
        ></Column>
      </DataTable>
      <OverlayPanel ref={op} trigger="focus" style={{ minWidth: '12rem' }}>
        <p className="popupera">
          {pop.map((el, index) => {
            return (
              <Button
                key={index}
                onClick={() => {
                  let type = ''
                  if (el.id == 1) {
                    type = 'Edit'
                  } else if (el.id == 2) {
                    type = 'Donwload'
                  } else {
                    type = 'Delete'
                  }
                  tackAction(el, type)
                }}
              >
                <CIcon icon={el.icon}></CIcon>
                {el.label}
              </Button>
            )
          })}
        </p>
      </OverlayPanel>
    </>

    // <Tabs style={{ background: 'white', padding: 10, position: 'relative' }}>
    //   <p
    //     className="btn"
    //     onClick={() => {
    //       navigate(-1)
    //     }}
    //   >
    //     Back
    //   </p>
    //   {prevData.id && (
    //     <p className="btn" style={{ position: 'absolute', right: 0 }}>
    //       Delete Shipment
    //     </p>
    //   )}
    //   <TabList>
    //     {tabsData.map((el, index) => {
    //       return <Tab key={index}>{el.value}</Tab>
    //     })}
    //   </TabList>
    //   {tabsData.map((el, index) => {
    //     return (
    //       <TabPanel key={index}>
    //         <CForm>
    //           <div
    //             style={{
    //               backgroundColor: 'white',
    //               borderTopLeftRadius: 12,
    //               borderTopRightRadius: 12,
    //               padding: '20px 0px 0px 0px',
    //               textAlign: 'end',
    //             }}
    //           >
    //             <p
    //               className="btn"
    //               onClick={() => {
    //                 console.log('SaveClick')
    //               }}
    //             >
    //               Save
    //             </p>
    //             {el.value != 'Master File' && (
    //               <p
    //                 className="btn"
    //                 onClick={() => {
    //                   console.log('Sync With Master')
    //                 }}
    //               >
    //                 Sync With Master
    //               </p>
    //             )}
    //           </div>
    //           <CRow>
    //             {console.log(tabsData, el.data)}
    //             {tabsData &&
    //               el?.data?.map((el, index) => {
    //                 return (
    //                   <CCol key={index} xs={12} lg={6} xl={4}>
    //                     <CFormLabel>{el.field}</CFormLabel>
    //                     <CFormInput value={el.field}></CFormInput>
    //                   </CCol>
    //                 )
    //               })}
    //             {!el.data &&
    //               tabsData.map((el, index) => {
    //                 return (
    //                   <CCol key={index} xs={12} lg={6} xl={4}>
    //                     <CFormLabel>Field {index + 1}</CFormLabel>
    //                     <CFormInput></CFormInput>
    //                   </CCol>
    //                 )
    //               })}
    //           </CRow>
    //         </CForm>
    //       </TabPanel>
    //     )
    //   })}
    // </Tabs>
  )
}
export default ExportCreate

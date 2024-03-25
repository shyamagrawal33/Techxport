import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import { useSelector } from 'react-redux'
import { CSpinner } from '@coreui/react'

const DefaultLayout = () => {
  const [loading, setLoading] = useState(false)
  const { showloading } = useSelector((state) => state.message)
  // const { message } = useSelector((state) => state.message)
  useEffect(() => {
    setLoading(showloading)
  }, [showloading])
  return (
    <div>
      {loading && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            background: 'rgba(0,0,0,0.1)',
          }}
        >
          <CSpinner variant="grow"></CSpinner>
        </div>
      )}
      <AppSidebar />

      <div className="wrapper d-flex flex-column min-vh-100 wrapper2">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout

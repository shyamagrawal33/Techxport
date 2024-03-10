/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/j2

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/j2/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react'

// reactstrap components

// core components
import IndexNavbar from './IndexNavbar.js'
import IndexHeader from './IndexHeader.js'
import DemoFooter from './DemoFooter.js'
import WorkSection from './view/WorkSection.js'
import OperateSection from './view/OperateSection.js'
import ChoosePrice from './view/ChoosePrice.js'
import { useSelector } from 'react-redux'
import AuthService from 'src/services/auth.js'
import { CSpinner } from '@coreui/react'

function Index() {
  document.documentElement.classList.remove('nav-open')
  React.useEffect(() => {
    document.body.classList.add('index')
    return function cleanup() {
      document.body.classList.remove('index')
    }
  })
  const [loading, setLoading] = useState(false)
  const { showloading } = useSelector((state) => state.message)
  useEffect(() => {
    if (!AuthService.isLoggedIn) setLoading(showloading)
    else setLoading(false)
  }, [showloading])
  return (
    <>
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
      <IndexNavbar />
      <IndexHeader />
      <div className="main">
        <WorkSection />
        <OperateSection />
        <ChoosePrice />
        <DemoFooter />
      </div>
    </>
  )
}

export default Index

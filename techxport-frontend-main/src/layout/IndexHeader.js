import React from 'react'

// reactstrap components
import { Button, Container } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
// core components

function IndexHeader() {
  const navigate = useNavigate()
  const handleClick = () => {
    window.location.replace('http://nbcseasy.com/j3')
  }
  return (
    <>
      <div>
        <div className="page-header" style={{ zIndex: 0 }}>
          <div
            className="header1"
            style={{ backgroundImage: 'url(' + require('../assets/img/bg1.png') + ')' }}
          >
            <p className="titleheader">
              Seamless <span style={{ color: '#16ADDC' }}>Imports</span>, <br />
              Effortless <span style={{ color: '#25B06C' }}>Exports</span>
            </p>
            <p className="subtitleheader">
              Streamline your International Trade Documents <br />
              with <span style={{ color: '#25B06C' }}>Embrace a Paperless Approach</span>
            </p>
            <img
              alt="..."
              src={require('../assets/img/watch.png')}
              style={{ width: '10em', marginLeft: '10em', marginTop: '2em' }}
            />
          </div>
          <div className="leftHeader">
            <div
              className="header2"
              style={{ backgroundImage: 'url(' + require('../assets/img/bg2.png') + ')' }}
            ></div>
            <div
              className="header3"
              style={{ backgroundImage: 'url(' + require('../assets/img/bg3.png') + ')' }}
            ></div>
            <div
              className="header4"
              style={{ backgroundImage: 'url(' + require('../assets/img/bg4.png') + ')' }}
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}
export default IndexHeader

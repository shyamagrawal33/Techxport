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
import React from 'react'

// reactstrap components
import { Container, Row, Col } from 'reactstrap'

// core components

function WorkSection() {
  return (
    <>
      <Container className="tim-container container2" style={{ margin: 0, position: 'relative' }}>
        <div className="title title2" style={{ padding: '1.3em', textAlign: 'center' }}>
          <p style={{ color: '#112D55', fontSize: 40, fontWeight: 500 }}>A Website that Works</p>
          <p style={{ color: '#6A7A9F', fontSize: 18 }}>
            A complete workspace for your documentation team
          </p>
        </div>
        <Row style={{ justifyContent: 'space-around', padding: '1.3em' }}>
          <Col md="2" sm="6">
            <img
              alt="..."
              src={require('../../assets/img/img_1.png')}
              style={{ width: '1.5em', marginBottom: 4 }}
            />
            <p style={{ color: '#27429A', fontSize: 15, fontWeight: 500 }}>Quotation</p>
            <p style={{ fontSize: 12 }}>
              Lorem Ipsum is simply dummy text of the printing and type setting industry.
            </p>
          </Col>
          <Col md="2" sm="6">
            <img
              alt="..."
              src={require('../../assets/img/img_2.png')}
              style={{ width: '1.5em', marginBottom: 4 }}
            />
            <p style={{ color: '#27429A', fontSize: 15, fontWeight: 500 }}>Invoicing</p>
            <p style={{ fontSize: 12 }}>
              Lorem Ipsum is simply dummy text of the printing and type setting industry.
            </p>
          </Col>
          <Col md="2" sm="6">
            <img
              alt="..."
              src={require('../../assets/img/img_3.png')}
              style={{ width: '1.5em', marginBottom: 4 }}
            />
            <p style={{ color: '#27429A', fontSize: 15, fontWeight: 500 }}>Purchase Orders</p>
            <p style={{ fontSize: 12 }}>
              Lorem Ipsum is simply dummy text of the printing and type setting industry.
            </p>
          </Col>
          <Col md="2" sm="6">
            <img
              alt="..."
              src={require('../../assets/img/img_4.png')}
              style={{ width: '1.5em', marginBottom: 4 }}
            />
            <p style={{ color: '#27429A', fontSize: 15, fontWeight: 500 }}>E-Sign & Stamp</p>
            <p style={{ fontSize: 12 }}>
              Lorem Ipsum is simply dummy text of the printing and type setting industry.
            </p>
          </Col>
          <Col md="2" sm="6">
            <img
              alt="..."
              src={require('../../assets/img/img_5.png')}
              style={{ width: '1.5em', marginBottom: 4 }}
            />
            <p style={{ color: '#27429A', fontSize: 15, fontWeight: 500 }}>Secure Sharing</p>
            <p style={{ fontSize: 12 }}>
              Lorem Ipsum is simply dummy text of the printing and type setting industry.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default WorkSection

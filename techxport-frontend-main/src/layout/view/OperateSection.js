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

function OperateSection() {
  return (
    <>
      <Container className="tim-container container2 container3" style={{ marginTop: 0 }}>
        <Row>
          <Col md="6" sm="12" style={{ padding: 0 }}>
            <div
              className="bg5"
              style={{
                backgroundImage: 'url(' + require('../../assets/img/bg5.png') + ')',
              }}
            >
              <div className="seg1">Eliminate manual re-entry with Master File</div>
              <div className="seg2">
                <div className="seg21">Reuse Products & Contacts data to save time</div>
                <div className="seg22">Sign & Stamp documents digitally</div>
              </div>
              <div className="seg3">Centralize process & team in one system</div>
            </div>
          </Col>
          <Col md="6" sm="12" style={{ padding: 0 }}>
            <div
              className="bg6"
              style={{
                backgroundImage: 'url(' + require('../../assets/img/bg6.png') + ')',
              }}
            >
              <p className="p1">Operate Anywhere</p>
              <p className="p2">
                Elevate to a Paperless Environment Create perfect shipping documents, 3x faster Find
                what you need in one-click
              </p>
              <img
                alt="..."
                src={require('../../assets/img/explore.png')}
                style={{ width: '10em', marginTop: '2em' }}
              />
            </div>
          </Col>
          <Col md="6" sm="12" className="colstyle">
            <div style={{ padding: '3em' }}>
              <p className="pera1">More than 12,000 Businesses Delight their Customers with us</p>
              <p className="pera2">
                Provide tools that help exporters and importers streamline their processes,
                documents, automate tasks, and optimise resource utilization. To create shipment
                entries and documents like invoice and packing list from that.
              </p>
            </div>
          </Col>
          <Col md="6" sm="12" style={{ padding: 0 }}>
            <img
              alt="..."
              src={require('../../assets/img/client.png')}
              style={{ width: '100%', marginTop: '2em', padding: '3em' }}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default OperateSection

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
/*eslint-disable*/
import React from 'react'

// reactstrap components
import { Row, Container } from 'reactstrap'

function DemoFooter() {
  return (
    <footer
      className="footer footer-black footer-white"
      style={{ backgroundImage: 'url(' + require('../assets/img/footer.png') + ')' }}
    >
      <Container>
        <Row>
          <nav className="footer-nav">
            <div style={{ textAlign: 'center' }}>
              <img alt="..." src={require('../assets/img/logo.png')} style={{ width: '8em' }} />
            </div>
            <ul className="changeStyle">
              <li>
                <a
                  href="https://www.creative-tim.com?ref=pkr-footer"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  Home
                </a>
              </li>
              {/* <li>
                <a
                  href="http://blog.creative-tim.com/?ref=pkr-footer"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  Products
                </a>
              </li> */}
              <li>
                <a
                  href="https://www.creative-tim.com/license?ref=pkr-footer"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  Company
                </a>
              </li>
              {/* <li>
                <a
                  href="https://www.creative-tim.com/license?ref=pkr-footer"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  Pricing
                </a>
              </li> */}

              <li>
                <a
                  href="https://www.creative-tim.com/license?ref=pkr-footer"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  Book a Demo
                </a>
              </li>
              <li>
                <a
                  href="https://www.creative-tim.com/license?ref=pkr-footer"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://www.creative-tim.com/license?ref=pkr-footer"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://www.creative-tim.com/license?ref=pkr-footer"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://www.creative-tim.com/license?ref=pkr-footer"
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>
          <hr style={{ borderColor: '#8F8FA3', margin: '10px 0px' }} />
          <div className="credits ml-auto" style={{ lineHeight: '25px', textAlign: 'center' }}>
            <span className="copyright">© {new Date().getFullYear()}. All rights reserved.</span>
          </div>
        </Row>
      </Container>
    </footer>
  )
}

export default DemoFooter

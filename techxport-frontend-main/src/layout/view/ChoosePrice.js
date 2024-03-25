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
import React, { useEffect } from 'react'

// reactstrap components
import { Container, Row, Col } from 'reactstrap'
import SlideShow from '../view/SlideShow'
// core components
function ChoosePrice() {
  const [faqQuestions, setFaqQuestions] = React.useState([
    {
      id: 1,
      question: 'Why do we use it?',
      Answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English`,
      expended: false,
    },
    {
      id: 2,
      question: 'Where can I get some?',
      Answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English`,
      expended: false,
    },
    {
      id: 3,
      question: 'Where does it come from?',
      Answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English`,
      expended: false,
    },
    {
      id: 4,
      question: 'Lorem Ipsum is simply dummy text ?',
      Answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English`,
      expended: false,
    },
    {
      id: 5,
      question: 'Lorem Ipsum is simply dummy text ?',
      Answer: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English`,
      expended: false,
    },
  ])
  let showAnswer = (id, type) => {
    let faq = [...faqQuestions]
    faq[id].expended = type
    setFaqQuestions(faq)
  }
  let showAnswer2 = (id, type) => {
    let faq = [...faqQuestions]
    faq[id].expended = type
    setFaqQuestions(faq)
  }
  useEffect(
    (id) => {
    },
    [setFaqQuestions],
  )
  return (
    <>
      <Container className="tim-container container2 container3" style={{ marginTop: 0 }}>
        {/* <Row>
          <Col
            md="12"
            sm="12"
            style={{
              padding: 0,
              backgroundImage: 'url(' + require('../../assets/img/bg7.png') + ')',
              minHeight: '70em',
              backgroundSize: '50%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <p style={{ fontSize: 40, color: '#112D55', textAlign: 'center' }}>
              Choose your Best Price
            </p>
            <Row className="rowDiv">
              <Col md="3" sm="12" className="coldiv">
                <div className="priceDiv">
                  <p className="p1" style={{ color: '#25B06C' }}>
                    Gold Pack
                  </p>
                  <p style={{ color: '#6A7A9F' }}>Lorem ipsum dolor sitam</p>
                  <p style={{ color: '#000000', marginTop: 20 }}>
                    <sup style={{ top: '-1em', fontSize: 18 }}>$</sup>
                    <span style={{ fontSize: 40, fontWeight: 600 }}>99</span>
                    <span>/ mo</span>
                  </p>
                  <img
                    alt="..."
                    src={require('../../assets/img/getGreen.png')}
                    style={{ width: '10em', marginTop: '1em', marginBottom: '1em' }}
                  />
                </div>
              </Col>
              <Col md="3" sm="12" className="coldiv2">
                <div className="priceDiv">
                  <p className="p1" style={{ color: '#27429A' }}>
                    Silver Pack
                  </p>
                  <p style={{ color: '#6A7A9F' }}>Lorem ipsum dolor sitam</p>
                  <p style={{ color: '#000000', marginTop: 20 }}>
                    <sup style={{ top: '-1em', fontSize: 18 }}>$</sup>
                    <span style={{ fontSize: 40, fontWeight: 600 }}>99</span>
                    <span>/ mo</span>
                  </p>
                  <img
                    alt="..."
                    src={require('../../assets/img/getBlue.png')}
                    style={{ width: '10em', marginTop: '1em', marginBottom: '1em' }}
                  />
                </div>
              </Col>
              <Col md="3" sm="12" className="coldiv">
                <div className="priceDiv">
                  <img
                    alt="..."
                    src={require('../../assets/img/FreeHand.png')}
                    style={{ width: '3em' }}
                  />
                  <p className="p1" style={{ color: '#B3D039' }}>
                    Free Pack
                  </p>
                  <p style={{ color: '#6A7A9F' }}>Lorem ipsum dolor sitam</p>
                  <p style={{ color: '#000000', marginTop: 20 }}>
                    <sup style={{ top: '-1em', fontSize: 18 }}>$</sup>
                    <span style={{ fontSize: 40, fontWeight: 600 }}>99</span>
                    <span>/ mo</span>
                  </p>
                  <img
                    alt="..."
                    src={require('../../assets/img/getGreen.png')}
                    style={{ width: '10em', marginTop: '1em', marginBottom: '1em' }}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row> */}
        {/* <Row className="rowdiv2">
          <Col
            md="6"
            sm="12"
            style={{
              padding: 0,
              backgroundImage: 'url(' + require('../../assets/img/bg5.png') + ')',
              minHeight: '40em',
              backgroundSize: '60%',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p className="p2">What clients say about us</p>
            <SlideShow color={['#0088FE', '#00C49F', '#FFBB28']}></SlideShow>
          </Col>
          <Col
            md="6"
            sm="12"
            style={{
              padding: 0,
              minHeight: '40em',
              backgroundSize: '60%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <img
              alt="..."
              src={require('../../assets/img/other.png')}
              style={{ width: '100%', marginTop: '2em' }}
            />
          </Col>
        </Row> */}
        <Row>
          {/* <Col md="6" sm="12">
            
          </Col> */}
          <Col
            md="12"
            sm="12"
            className="faqSection"
            style={{
              padding: 0,
              // backgroundSize: '60%',
              // backgroundRepeat: 'no-repeat',
              // backgroundImage:
              //   'url(' +
              //   require('../../assets/img/bg2.png') +
              //   '), url(' +
              //   require('../../assets/img/bg3.png') +
              //   ')',
              // backgroundSize: '20%, 25%',
              // backgroundPosition: 'right top,right 16em bottom',
              padding: '3em',
              paddingBottom: 0,
            }}
          >
            <p
              className="p2"
              style={{ marginLeft: '0px !important', fontSize: 29, marginBottom: 20 }}
            >
              Frequently Asked Questions
            </p>
            <div>
              {faqQuestions?.map((page, pageIdx) => {
                return (
                  <>
                    {page && (
                      <div className="faqDiv">
                        <p>
                          <span style={{ width: '100%' }}>{page.question}</span>

                          {!page.expended && (
                            <img
                              alt="..."
                              src={require('../../assets/img/show.png')}
                              style={{
                                width: '1em',
                                position: 'absolute',
                                right: '1em',
                                bottom: '50%',
                                transform: 'translateY(50%)',
                              }}
                              onClick={() => {
                                showAnswer(pageIdx, true)
                              }}
                            />
                          )}
                          {page.expended && (
                            <img
                              alt="..."
                              src={require('../../assets/img/hide.png')}
                              style={{
                                width: '1em',
                                position: 'absolute',
                                right: '1em',
                                top: '-1em',
                              }}
                              onClick={() => {
                                showAnswer2(pageIdx, false)
                              }}
                            />
                          )}
                        </p>
                        {page.expended && <p>{page.Answer}</p>}
                      </div>
                    )}
                  </>
                )
              })}
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: '0em' }} id="company">
          {/* <Col md="6" sm="12" className="faqSection">
           
          </Col> */}
          <Col
            md="12"
            sm="12"
            style={{
              padding: 0,
              minHeight: '20em',
              // backgroundSize: '60%',
              // backgroundRepeat: 'no-repeat',
              // backgroundImage:
              //   'url(' +
              //   require('../../assets/img/bg2.png') +
              //   '), url(' +
              //   require('../../assets/img/bg3.png') +
              //   ')',
              // backgroundSize: '20%, 25%',
              // backgroundPosition: 'right top,right 16em bottom',
              padding: '3em',
              paddingTop: 0,
            }}
          >
            <p className="p2">About us</p>
            <p className="p3" style={{ marginLeft: 0, whiteSpace: 'normal' }}>
              Do not suddenly stop using this drug without consulting your doctor. Some conditions
              may become worse when this drug is abruptly stopped. <br />
              Your dose may need to be gradually decreased. When this medication is used for a long
              time, it may not work as well. Talk with your doctor if this medication stops working
              well. Though it helps many people, this medication may sometimes cause addiction. This
              risk may be higher if you have a substance use disorder (such as overuse of or
              addiction to drugs/alcohol).
              <br />
              Take this medication exactly as prescribed to lower the risk of addiction. Ask your
              doctor or pharmacist for more details. Tell your doctor if your condition lasts or
              gets worse.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ChoosePrice

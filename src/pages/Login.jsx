import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import {Container, Row, Col,Form,FormGroup} from 'reactstrap'

export const Login = () => {
  return (
    <Helmet title='login'>
   <section>
   <Container >
        <Row>
          <Col lg='6'className='m-auto text-center'>
            <h3 className=''>Login</h3>
          </Col>
        </Row>
      </Container>
   </section>
      <section>
        <Container>
          <Row>
            <input placeholder='user Name or Email' required  />

            <input placeholder='*****' required />
            <button className='buy_btn w-100'> login</button>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

import React from "react";
import { Form, FormGroup, Container, Row, Col } from "reactstrap";
export const AddProducts = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4>Add Products</h4>
            <Form>
              <FormGroup className="form__group">
                <span>Product title</span>
                
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

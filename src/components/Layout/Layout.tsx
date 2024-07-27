import React, {PropsWithChildren} from 'react';
import Toolbar from "../Toolbar/Toolbar";
import {Col, Container, Row} from 'react-bootstrap';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <Toolbar/>
      </header>
      <main>
        <Container>
          <Row>
            <Col/>
            <Col xs={12} sm={12} md={10} lg={8}>
              {children}
            </Col>
            <Col/>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Layout;
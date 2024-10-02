import React, { useEffect } from "react";
import "./Styles/MainView.css";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Breadcrumbs from "../Common/Breadcrumbs";
import { Alert, Badge, Col, Container, Row } from "react-bootstrap";

const MainView = () => {
  return (
    <Container fluid className="container-main">
      <div className="fix-main-header mb-3 text-center">
        <Alert className="p-0 m-0" variant={"info"}>
          <h3> Income & Expence Management</h3>
        </Alert>
      </div>

      <Row className="main-content-area m-0 p-0" style={{ overflowY: "auto" }}>
        <Col sm={3} md={3} lg={3}>
          <div className="box-shadow">
            <Sidebar />
          </div>
        </Col>
        <Col sm={9} md={9} lg={9}>
          <div className="box-shadow">
            <Breadcrumbs />
            <hr />
            <MainContent />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MainView;

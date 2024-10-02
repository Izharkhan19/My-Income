import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Placeholder,
  Row,
} from "react-bootstrap";

import SalarySVG from "../../Assets/SVG_Codes/SalarySVG";
import OtherSVG from "../../Assets/SVG_Codes/OtherSVG";
import {
  deleteIncomeById,
  getIncomesData,
  a,
} from "../../Services/IncomeServices";
import FreelancingSVG from "../../Assets/SVG_Codes/FreelancingSVG";
import InvestmentSVG from "../../Assets/SVG_Codes/InvestmentSVG";
import StocksSVG from "../../Assets/SVG_Codes/StocksSVG";
import BitcoinSVG from "../../Assets/SVG_Codes/BitcoinSVG";
import BankTransferSVG from "../../Assets/SVG_Codes/BankTransferSVG";
import moment from "moment/moment";
import "../Styles/income_expence.css";
import { ToastError, ToastSuccess } from "../../Common/Toaster";
import IncomeModal from "../Modals/IncomeModal";
import EditSVG from "../../Assets/SVG_Codes/editSvg";
import DeleteSVG from "../../Assets/SVG_Codes/deleteSVG";
import CallenderSVG from "../../Assets/SVG_Codes/callenderSvg";
import ChatSVG from "../../Assets/SVG_Codes/chatSvg";
import CurrencySVG from "../../Assets/SVG_Codes/currencySvg";
import DetailsSVG from "../../Assets/SVG_Codes/detailsSvg";
import NoIncomeFound from "../../Assets/SVG_Codes/noIncomeFound";

const Income = () => {
  const [TotalIncome, setTotalIncome] = useState(0);
  const [incomeId, setIncomeId] = useState(null);
  const [incomeRes, setIncomeRes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const fetchIncomes = async () => {
    setLoading(true);
    let res = await getIncomesData();
    setLoading(false);
    if (res) {
      let tempAmount = 0;
      res.map((itm) => {
        tempAmount += itm.amount;
      });
      setTotalIncome(tempAmount);
      setIncomeRes(res);
    }
  };

  const handleDeleteIncomeById = async (id) => {
    let res = await deleteIncomeById(id);

    if (res) {
      fetchIncomes();
      ToastSuccess("Income deleted successfully.");
    } else {
      ToastError(res.message);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const getCategoryDescription = (category) => {
    switch (category) {
      case "Salary":
        return <SalarySVG />; // "Description for Salary category";
      case "Freelancing":
        return <FreelancingSVG />; // "Description for Freelancing category";
      case "Investments":
        return <InvestmentSVG />; //"Description for Investments category";
      case "Stocks":
        return <StocksSVG />; //"Description for Stocks category";
      case "Bitcoin":
        return <BitcoinSVG />; //"Description for Bitcoin category";
      case "Bank Transfer":
        return <BankTransferSVG />; //"Description for Bank Transfer category";
      case "Other":
        return <OtherSVG />; //"Description for Other category";
      default:
        return <OtherSVG />; //"Description for Other category";
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between">
        <div>
          <h2>
            Total Income: <span style={{ color: "green" }}>${TotalIncome}</span>{" "}
          </h2>
        </div>
        <div className="">
          <Button variant="secondary" onClick={handleShow} className="me-2">
            {"Add Income"}
          </Button>
        </div>
      </div>

      <Row
        style={{ maxHeight: "60vh", overflow: "auto" }}
        xs={1}
        sm={1}
        md={2}
        xl={3}
        xxl={4}
        className="mt-3 g-4"
      >
        {incomeRes.length !== 0 ? (
          incomeRes?.map((itm, idx) => (
            <>
              <Col
                key={itm._id}
                className="p-1"
                onClick={() => {
                  setIncomeId(itm._id);
                  handleShow();
                }}
              >
                <Card className=" mapped-card-design">
                  <Card.Body className="p-1">
                    <Card.Title className="d-flex justify-content-between">
                      <span className="ms-2 d-flex">
                        {getCategoryDescription(itm.category)}
                        <span className="ms-2">
                          <div>{itm.category}</div>
                        </span>
                      </span>

                      <div>
                        <span className="make-cursor-pointer">
                          {/* <EditSVG /> */}
                        </span>
                        <span
                          onClick={() => handleDeleteIncomeById(itm._id)}
                          className="ms-2 me-3 make-cursor-pointer"
                        >
                          <DeleteSVG />
                        </span>
                      </div>
                    </Card.Title>
                    <hr />
                    <Card.Text className="mt-3">
                      <div className="d-flex justify-content-start">
                        <h6 className="ms-1">
                          <CurrencySVG /> : {itm.amount}
                        </h6>
                        <h6 className="ms-5">
                          <CallenderSVG /> :{" "}
                          {moment(itm.date).format("DD-MM-YYYY")}
                        </h6>
                      </div>
                      <h6 className="ms-1">
                        <DetailsSVG /> : {itm.description}
                      </h6>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </>
          ))
        ) : !loading ? (
          <div class="make-img-center">
            <NoIncomeFound />
          </div>
        ) : (
          <>
            <Card
              className="ms-3 mapped-card-design"
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow"></Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                  <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                  <Placeholder xs={8} />
                </Placeholder>
              </Card.Body>
            </Card>
            <Card
              className="ms-3 mapped-card-design"
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow"></Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                  <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                  <Placeholder xs={8} />
                </Placeholder>
              </Card.Body>
            </Card>
            <Card
              className="ms-3 mapped-card-design"
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow"></Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                  <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                  <Placeholder xs={8} />
                </Placeholder>
              </Card.Body>
            </Card>
          </>
        )}
      </Row>
      {show && (
        <IncomeModal
          incomeId={incomeId}
          show={show}
          setShow={setShow}
          fetchIncomes={fetchIncomes}
        />
      )}
    </Container>
  );
};

export default Income;

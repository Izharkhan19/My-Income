import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Placeholder,
  Row,
  Table,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OtherSVG from "../../Assets/SVG_Codes/OtherSVG";
import {
  deleteExpenseById,
  getExpensesData,
  saveExpenseData,
} from "../../Services/ExpenseServices";
import moment from "moment/moment";
import { handleKeyPress } from "../../Common/CommonFunctions";
import EducationSVG from "../../Assets/SVG_Codes/EducationSVG";
import GroceriesSVG from "../../Assets/SVG_Codes/GroceriesSVG";
import SubscriptionsSVG from "../../Assets/SVG_Codes/SubscriptionsSVG";
import TakeawaysSVG from "../../Assets/SVG_Codes/TakeawaysSVG";
import ClothingSVG from "../../Assets/SVG_Codes/ClothingSVG";
import TravellingSVG from "../../Assets/SVG_Codes/TravellingSVG";
import "../Styles/income_expence.css";
import { ToastError, ToastSuccess } from "../../Common/Toaster";
import ExpenceModal from "../Modals/ExpenceModal";
import EditSVG from "../../Assets/SVG_Codes/editSvg";
import DeleteSVG from "../../Assets/SVG_Codes/deleteSVG";
import CurrencySVG from "../../Assets/SVG_Codes/currencySvg";
import CallenderSVG from "../../Assets/SVG_Codes/callenderSvg";
import ChatSVG from "../../Assets/SVG_Codes/chatSvg";
import DetailsSVG from "../../Assets/SVG_Codes/detailsSvg";
import NoIncomeFound from "../../Assets/SVG_Codes/noIncomeFound";

const Expense = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [TotalExpense, setTotalExpense] = useState(0);
  const [ExpenseRes, setExpenseRes] = useState([]);

  const [ExpenseInput, setExpenseInput] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date(),
    details: "",
  });

  const handleExpenseInput = (e) => {
    const { name, value } = e.target;
    setExpenseInput({ ...ExpenseInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      ExpenseInput.title === "" ||
      ExpenseInput.amount === "" ||
      ExpenseInput.date === "" ||
      ExpenseInput.category === "" ||
      ExpenseInput.details === ""
    ) {
      ToastError("All fields are required!");
      return;
    } else {
      console.log(ExpenseInput);
      let input = {
        title: ExpenseInput.title,
        amount: ExpenseInput.amount,
        date: ExpenseInput.date,
        category: ExpenseInput.category,
        description: ExpenseInput.details,
      };
      let res = await saveExpenseData(input);
      if (res) {
        setExpenseInput({
          title: "",
          amount: "",
          category: "",
          date: new Date(),
          details: "",
        });
        fetchExpenses();
        // Here you can handle form submission, for now, let's just log the state
        ToastSuccess("Expense saved successfully.");
      } else {
        ToastError(res.message);
      }
    }
  };

  const fetchExpenses = async () => {
    setLoading(true);
    let res = await getExpensesData();
    setLoading(false);
    if (res) {
      let tempAmount = 0;
      res.map((itm) => {
        tempAmount += itm.amount;
      });
      setTotalExpense(tempAmount);
      setExpenseRes(res);
    }
  };

  const handleDeleteExpenseById = async (id) => {
    let res = await deleteExpenseById(id);

    if (res) {
      fetchExpenses();
      ToastSuccess("Expense deleted successfully.");
    } else {
      ToastError(res.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const getCategoryDescription = (category) => {
    switch (category) {
      case "Education":
        return <EducationSVG />; // "Description for Salary category";
      case "Groceries":
        return <GroceriesSVG />; // "Description for Freelancing category";
      case "Subscriptions":
        return <SubscriptionsSVG />; //"Description for Investments category";
      case "Takeaways":
        return <TakeawaysSVG />; //"Description for Stocks category";
      case "Clothing":
        return <ClothingSVG />; //"Description for Bitcoin category";
      case "Travelling":
        return <TravellingSVG />; //"Description for Bank Transfer category";
      case "Other":
        return <OtherSVG />; //"Description for Other category";
      default:
        return <OtherSVG />; //"Description for Other category";
    }
  };
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  return (
    <Container>
      <div className="d-flex justify-content-between">
        <div>
          <h2>
            Total Expence:{" "}
            <span style={{ color: "green" }}>${TotalExpense}</span>{" "}
          </h2>
        </div>
        <div className="">
          <Button variant="secondary" onClick={handleShow} className="me-2">
            {"Add Expence"}
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
        {ExpenseRes.length !== 0 ? (
          ExpenseRes?.map((itm, idx) => (
            <>
              <Col key={itm._id} className="p-1">
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
                          onClick={() => handleDeleteExpenseById(itm._id)}
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
        <ExpenceModal
          show={show}
          setShow={setShow}
          fetchExpenses={fetchExpenses}
        />
      )}
    </Container>
  );
};

export default Expense;

import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, Row, Table } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OtherSVG from '../../Assets/SVG_Codes/OtherSVG';
import { deleteExpenseById, getExpensesData, saveExpenseData } from '../../Services/ExpenseServices';
import moment from 'moment/moment';
import { handleKeyPress } from '../../Common/CommonFunctions';
import EducationSVG from '../../Assets/SVG_Codes/EducationSVG';
import GroceriesSVG from '../../Assets/SVG_Codes/GroceriesSVG';
import SubscriptionsSVG from '../../Assets/SVG_Codes/SubscriptionsSVG';
import TakeawaysSVG from '../../Assets/SVG_Codes/TakeawaysSVG';
import ClothingSVG from '../../Assets/SVG_Codes/ClothingSVG';
import TravellingSVG from '../../Assets/SVG_Codes/TravellingSVG';
import "../Styles/income_expence.css"
import { ToastError, ToastSuccess } from '../../Common/Toaster';

const Expense = () => {
  const [startDate, setStartDate] = useState(new Date());

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
    if (ExpenseInput.title === "" ||
      ExpenseInput.amount === "" ||
      ExpenseInput.date === "" ||
      ExpenseInput.category === "" ||
      ExpenseInput.details === "") {
      ToastError("All fields are required!")
      return
    } else {
      console.log(ExpenseInput);
      let input = {
        title: ExpenseInput.title,
        amount: ExpenseInput.amount,
        date: ExpenseInput.date,
        category: ExpenseInput.category,
        description: ExpenseInput.details
      }
      let res = await saveExpenseData(input)
      if (res) {
        setExpenseInput({
          title: "",
          amount: "",
          category: "",
          date: new Date(),
          details: "",
        });
        fetchExpenses()
        // Here you can handle form submission, for now, let's just log the state
        ToastSuccess("Expense saved successfully.")
      } else {
        ToastError(res.message)
      }
    }

  };

  const fetchExpenses = async () => {
    let res = await getExpensesData()

    if (res) {
      let tempAmount = 0
      res.map((itm) => {
        tempAmount += itm.amount
      })
      setTotalExpense(tempAmount)
      setExpenseRes(res)

    }
  };

  const handleDeleteExpenseById = async (id) => {
    let res = await deleteExpenseById(id)
    if (res) {
      fetchExpenses()
      ToastSuccess("Expense deleted successfully.")
    } else {
      ToastError(res.message)
    }
  };

  useEffect(() => {
    fetchExpenses()
  }, [])

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

  return (
    <Container fluid >
      <div className="text-center">
        <h2>Total Expense: <span style={{ color: 'green' }}>${TotalExpense}</span>  </h2>
      </div>
      <Row className="mt-3">
        <Col xs={3} md={3}>
          <div className='form-box-container'>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title" className="mb-0">
                <Form.Label>Expense Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={ExpenseInput.title}
                  onChange={handleExpenseInput}
                  placeholder="Enter expense title"
                />
              </Form.Group>
              <Form.Group controlId="amount" className="mb-0">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  pattern="[0-9]*"  // Only allow numeric input
                  inputMode="numeric"  // Set the keyboard to numeric mode
                  name="amount"
                  value={ExpenseInput.amount}
                  onChange={handleExpenseInput}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter amount"
                />
              </Form.Group>
              <Form.Group controlId="category" className="mb-0">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={ExpenseInput.category}
                  onChange={handleExpenseInput}
                  aria-label="Default select category"
                >
                  <option value="">Select category</option>
                  <option value="Education">Education</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Subscriptions">Subscriptions</option>
                  <option value="Takeaways">Takeaways</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Travelling">Travelling</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="date" className="mb-3 mt-2">
                <Form.Label>Date</Form.Label>
                {/* <br /> */} &nbsp; &nbsp;
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date)
                    setExpenseInput({ ...ExpenseInput, [date]: date });
                  }}
                  dateFormat="dd-MM-yyyy"
                />
              </Form.Group>
              <Form.Group controlId="details" className="mb-3">
                {/* <Form.Label>Details</Form.Label> */}
                <Form.Control
                  as="textarea"
                  name="details"
                  value={ExpenseInput.details}
                  onChange={handleExpenseInput}
                  placeholder="Enter details"
                />
              </Form.Group>
              <div className='text-end'>
                <Button variant="info" type="submit">
                  + Add Expense
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col xs={9} md={9}
          style={{ maxHeight: "60vh", overflow: "auto", }}
        >
          {
            ExpenseRes.length !== 0 &&
            ExpenseRes?.map((itm, idx) => (
              <Row key={idx} className='dash-text-color mapped-card-design' >
                <Col xs={2} className='ml-3 mt-3 text-center' >
                  {getCategoryDescription(itm.category)}
                </Col>
                <Col xs={8}>
                  <h5>
                    🔹{itm.category}
                  </h5>
                  <Row>
                    <Col md={3} xl={3} >
                      <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M160 0c17.7 0 32 14.3 32 32V67.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.1c-.4-.1-.9-.1-1.3-.2l-.2 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11V32c0-17.7 14.3-32 32-32z" /></svg>
                      <span className='ms-1'>
                        {itm.amount}
                      </span>
                    </Col>
                    <Col md={4} xl={4} >
                      <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" /></svg>
                      <span className='ms-1'>
                        {moment(itm.date).format("DD-MM-YYYY")}
                      </span>
                    </Col>
                    <Col md={5} xl={5} >
                      <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M284 224.8a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 284 224.8zm-110.5 0a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 173.6 224.8zm220.9 0a34.1 34.1 0 1 0 34.3 34.1A34.2 34.2 0 0 0 394.5 224.8zm153.8-55.3c-15.5-24.2-37.3-45.6-64.7-63.6-52.9-34.8-122.4-54-195.7-54a406 406 0 0 0 -72 6.4 238.5 238.5 0 0 0 -49.5-36.6C99.7-11.7 40.9 .7 11.1 11.4A14.3 14.3 0 0 0 5.6 34.8C26.5 56.5 61.2 99.3 52.7 138.3c-33.1 33.9-51.1 74.8-51.1 117.3 0 43.4 18 84.2 51.1 118.1 8.5 39-26.2 81.8-47.1 103.5a14.3 14.3 0 0 0 5.6 23.3c29.7 10.7 88.5 23.1 155.3-10.2a238.7 238.7 0 0 0 49.5-36.6A406 406 0 0 0 288 460.1c73.3 0 142.8-19.2 195.7-54 27.4-18 49.1-39.4 64.7-63.6 17.3-26.9 26.1-55.9 26.1-86.1C574.4 225.4 565.6 196.4 548.3 169.5zM285 409.9a345.7 345.7 0 0 1 -89.4-11.5l-20.1 19.4a184.4 184.4 0 0 1 -37.1 27.6 145.8 145.8 0 0 1 -52.5 14.9c1-1.8 1.9-3.6 2.8-5.4q30.3-55.7 16.3-100.1c-33-26-52.8-59.2-52.8-95.4 0-83.1 104.3-150.5 232.8-150.5s232.9 67.4 232.9 150.5C517.9 342.5 413.6 409.9 285 409.9z" /></svg>

                      <span className='ms-1'>
                        {itm.description}
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col xs={2}
                  className='d-flex ml-3 mt-4 text-center'>
                  <div onClick={() => handleDeleteExpenseById(itm._id)}>
                    <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg>
                    {/* <h6>Delete</h6> */}
                  </div>
                </Col>
              </Row>
            ))}
        </Col>
      </Row >
    </Container >
  );
};

export default Expense;

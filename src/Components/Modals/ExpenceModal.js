import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ToastError, ToastSuccess } from "../../Common/Toaster";
import { saveIncomeData } from "../../Services/IncomeServices";
import { handleKeyPress } from "../../Common/CommonFunctions";
import { saveExpenseData } from "../../Services/ExpenseServices";

export default function ExpenceModal({ ...props }) {
  const [startDate, setStartDate] = useState(new Date());

  const handleClose = () => props.setShow(false);
  const [expenceInput, setExpenceInput] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date(),
    details: "",
  });
  const handleExpenceInput = (e) => {
    const { name, value } = e.target;
    setExpenceInput({ ...expenceInput, [name]: value });
  };

  const handleSaveExpence = async (e) => {
    e.preventDefault();
    if (
      expenceInput.title === "" ||
      expenceInput.amount === "" ||
      expenceInput.date === "" ||
      expenceInput.category === "" ||
      expenceInput.details === ""
    ) {
      ToastError("All fields are required!");
      return;
    } else {
      let input = {
        title: expenceInput.title,
        amount: expenceInput.amount,
        date: expenceInput.date,
        category: expenceInput.category,
        description: expenceInput.details,
      };
      let res = await saveExpenseData(input);
      if (res) {
        setExpenceInput({
          title: "",
          amount: "",
          category: "",
          date: new Date(),
          details: "",
        });
        props.fetchExpenses();
        ToastSuccess("Expence saved successfully.");
        handleClose();
      } else {
        ToastError(res.message);
      }
    }
  };

  return (
    <>
      <Offcanvas
        placement="end"
        show={props.show}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header closeButton className="form-box-container">
          <Offcanvas.Title>Add Expence</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Row className="mt-3">
            <Col>
              <div>
                <Form onSubmit={handleSaveExpence}>
                  <Form.Group controlId="title" className="mb-0">
                    <Form.Label>Expence Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={expenceInput.title}
                      onChange={handleExpenceInput}
                      placeholder="Enter Expence title"
                    />
                  </Form.Group>
                  <Form.Group controlId="amount" className="mb-0">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="text"
                      pattern="[0-9]*" // Only allow numeric input
                      inputMode="numeric" // Set the keyboard to numeric mode
                      name="amount"
                      value={expenceInput.amount}
                      onChange={handleExpenceInput}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter amount"
                    />
                  </Form.Group>
                  <Form.Group controlId="category" className="mb-0">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={expenceInput.category}
                      onChange={handleExpenceInput}
                      aria-label="Default select category"
                    >
                      <option value="">Select category</option>
                      <option value="Salary">Salary</option>
                      <option value="Freelancing">Freelancing</option>
                      <option value="Investments">Investments</option>
                      <option value="Stocks">Stocks</option>
                      <option value="Bitcoin">Bitcoin</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="date" className="mb-3 mt-2">
                    <Form.Label>Date</Form.Label>
                    &nbsp; &nbsp;
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setExpenceInput({ ...expenceInput, [date]: date });
                      }}
                      dateFormat="dd-MM-yyyy"
                    />
                  </Form.Group>
                  <Form.Group controlId="details" className="mb-3">
                    {/* <Form.Label>Details</Form.Label> */}
                    <Form.Control
                      as="textarea"
                      name="details"
                      value={expenceInput.details}
                      onChange={handleExpenceInput}
                      placeholder="Enter details"
                    />
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
        </Offcanvas.Body>
        <Offcanvas.Header className="form-box-container">
          <Offcanvas.Title>
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveExpence}
              className="me-2"
            >
              Save
            </Button>
          </Offcanvas.Title>
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
}

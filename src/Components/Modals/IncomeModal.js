import React, { useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ToastError, ToastSuccess } from "../../Common/Toaster";
import {
  getIncomeDetailByid,
  getIncomeDetails,
  saveIncomeData,
} from "../../Services/IncomeServices";
import { handleKeyPress } from "../../Common/CommonFunctions";

export default function IncomeModal({ ...props }) {
  let initCategory = { value: "Select category", label: "Select category" };
  const [chooseCategory, setChooseCategory] = useState(initCategory);
  const [startDate, setStartDate] = useState(new Date());
  const [incomeInput, setIncomeInput] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date(),
    details: "",
  });

  const handleClose = () => props.setShow(false);

  let CategoryDropdown = [
    { value: "Select category", label: "Select category" },
    { value: "Salary", label: "Salary" },
    { value: "Investments", label: "Investments" },
    { value: "Stocks", label: "Stocks" },
    { value: "Bitcoin", label: "Bitcoin" },
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Freelancing", label: "Freelancing" },
    { value: "Other", label: "Other" },
  ];

  const handleIncomeInput = (e) => {
    const { name, value } = e.target;
    setIncomeInput({ ...incomeInput, [name]: value });
  };

  const handleSaveIncome = async (e) => {
    e.preventDefault();
    if (
      incomeInput.title === "" ||
      incomeInput.amount === "" ||
      incomeInput.date === "" ||
      incomeInput.category === "" ||
      incomeInput.details === ""
    ) {
      ToastError("All fields are required!");
      return;
    } else {
      let input = {
        title: incomeInput.title,
        amount: incomeInput.amount,
        date: incomeInput.date,
        category: incomeInput.category,
        description: incomeInput.details,
      };
      let res = await saveIncomeData(input);
      if (res) {
        setIncomeInput({
          title: "",
          amount: "",
          category: "",
          date: new Date(),
          details: "",
        });
        props.fetchIncomes();
        ToastSuccess("Income saved successfully.");
        handleClose();
      } else {
        ToastError(res.message);
      }
    }
  };

  const fetchIncomeDetails = async (incomeId) => {
    let input = {
      id: incomeId,
    };
    let res = await getIncomeDetailByid(input);

    console.log(res);
  };

  useEffect(() => {
    if (props.incomeId) {
      fetchIncomeDetails(props.incomeId);
    }
  }, []);

  return (
    <>
      <Offcanvas
        placement="end"
        show={props.show}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header closeButton className="form-box-container">
          <Offcanvas.Title>Add Income</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Row className="mt-3">
            <Col>
              <div>
                <Form onSubmit={handleSaveIncome}>
                  <Form.Group controlId="title" className="mb-0">
                    <Form.Label>Income Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={incomeInput.title}
                      onChange={handleIncomeInput}
                      placeholder="Enter income title"
                    />
                  </Form.Group>
                  <Form.Group controlId="amount" className="mb-0">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="text"
                      pattern="[0-9]*" // Only allow numeric input
                      inputMode="numeric" // Set the keyboard to numeric mode
                      name="amount"
                      value={incomeInput.amount}
                      onChange={handleIncomeInput}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter amount"
                    />
                  </Form.Group>
                  <Form.Group controlId="category" className="mb-0">
                    <Form.Label>Category</Form.Label>
                    {/* <Form.Select
                      name="category"
                      value={incomeInput.category}
                      onChange={handleIncomeInput}
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
                    </Form.Select> */}

                    {/* <FloatingLabel controlId="floatingInput" label=""> */}
                    <CreatableSelect
                      placeholder={"Category"}
                      isClearable
                      options={CategoryDropdown}
                      onChange={(event) => {
                        // setChooseCategory(event);
                        setIncomeInput({
                          ...incomeInput,
                          ["category"]: event !== null ? event.value : "",
                        });
                      }}
                      value={
                        incomeInput.category !== ""
                          ? {
                              label: incomeInput.category,
                              value: incomeInput.category,
                            }
                          : {
                              value: "Select category",
                              label: "Select category",
                            }
                      }
                    />
                    {/* </FloatingLabel> */}
                  </Form.Group>
                  <Form.Group controlId="date" className="mb-3 mt-2">
                    <Form.Label>Date</Form.Label>
                    &nbsp; &nbsp;
                    <div>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          setIncomeInput({ ...incomeInput, [date]: date });
                        }}
                        dateFormat="dd-MM-yyyy"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group controlId="details" className="mb-3">
                    {/* <Form.Label>Details</Form.Label> */}
                    <Form.Control
                      as="textarea"
                      name="details"
                      value={incomeInput.details}
                      onChange={handleIncomeInput}
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
              onClick={handleSaveIncome}
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

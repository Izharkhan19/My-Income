import React, { useEffect, useState } from "react";
import {
  Card,
  CardGroup,
  Col,
  Container,
  ListGroup,
  Row,
  Stack,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getIncomesData } from "../../Services/IncomeServices";
import { getExpensesData } from "../../Services/ExpenseServices";
import { dateFormate } from "../../Common/CommonFunctions";

const Dashboard = () => {
  const [IncExp, setIncExp] = useState({
    labels: [],
    datasets: [
      {
        label: "Income",
        data: [], // [28, 48, 40, 19, 86, 27, 90],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Expense",
        data: [], // [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const [TransHistory, setTransHistory] = useState([]);
  const [Income, setIncome] = useState([]);
  const [Expense, setExpense] = useState([]);
  const [TotalIncome, setTotalIncome] = useState(0);
  const [TotalExpense, setTotalExpense] = useState(0);
  const [TotalBal, setTotalBal] = useState(0);

  const fetch_Incomes_Expenses = async () => {
    let resIncomes = await getIncomesData();
    let resExpenses = await getExpensesData();
    if (resIncomes && resExpenses) {
      // Trans Histor :
      const history = [...resIncomes, ...resExpenses];
      console.log("history", history);
      history.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setTransHistory(history);

      // Trans Histor End:
      // Inc
      let tempAmountInc = 0;
      let tempAmountArrayInc = [];
      let ArrayIncLabels = [];
      resIncomes.map((itm) => {
        tempAmountArrayInc.push(itm.amount);
        tempAmountInc += itm.amount;
        ArrayIncLabels.push(dateFormate(itm.date));
      });
      setTotalIncome(tempAmountInc);
      setIncome(resIncomes);
      // Inc End

      // Exp
      let tempAmountExp = 0;
      let tempAmountArrayExp = [];
      resExpenses.map((itm) => {
        tempAmountArrayExp.push(itm.amount);
        tempAmountExp += itm.amount;
      });
      setExpense(resExpenses);
      setTotalExpense(tempAmountExp);

      let tempObj = {
        labels: ArrayIncLabels,
        datasets: [
          {
            label: "Income",
            data: tempAmountArrayInc,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            tension: 0.3,
          },
          {
            label: "Expense",
            data: tempAmountArrayExp,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            tension: 0.3,
          },
        ],
      };

      setIncExp(tempObj);
      // Exp End
    }
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        // text: "Chart.js Line Chart",
      },
    },
  };

  useEffect(() => {
    fetch_Incomes_Expenses();
  }, []);

  return (
    <div>
      <Container fluid className="dash-text-color">
        <div className="text-start">
          <h2>All Transactions </h2>
        </div>
        <Row>
          <Row className="mt-2">
            <Col>
              <div>
                <div className="dash-cards">
                  <h4>Total Income</h4>
                  <h1 className="dash-card-text-color">$ {TotalIncome}</h1>
                </div>
              </div>
            </Col>
            <Col>
              <div>
                <div className="dash-cards">
                  <h4>Total Expense</h4>
                  <h1 className="dash-card-text-color">$ {TotalExpense}</h1>
                </div>
              </div>
            </Col>
            <Col>
              <div>
                <div className="dash-cards">
                  <h4>Total Balance</h4>
                  <h1 className="dash-card-text-color green-text">
                    $ {TotalIncome - TotalExpense}
                  </h1>
                </div>
              </div>
            </Col>
          </Row>
        </Row>
        <Row className="mt-5">
          <h3>Income & Expence Comparison </h3>
          <Col xs={12} sm={8} md={8}>
            <div>
              <Line options={options} data={IncExp} />
            </div>
          </Col>
          <Col xs={12} sm={4} md={4}>
            {/* Salary */}
            <div className="dash-salary-expence mt-3">
              <div className="text-start p-1">
                <h6>Min</h6>
              </div>
              <div className="text-center">
                <h5>Income</h5>
              </div>
              <div className="text-end p-1">
                <h6>Max</h6>
              </div>
            </div>
            <div className="dash-history-containers mt-0">
              <Stack direction="horizontal" gap={3}>
                <div className="p-2 text-gray">
                  $
                  {Income.length !== 0 &&
                    Math.min(...Income.map((itm) => itm.amount))}
                </div>
                <div className="p-2 ms-auto text-gray">
                  $
                  {Income.length !== 0 &&
                    Math.max(...Income.map((itm) => itm.amount))}
                </div>
              </Stack>
            </div>

            {/* Expance */}
            <div className="dash-salary-expence mt-3">
              <div className="text-start p-1">
                <h6>Min</h6>
              </div>
              <div className="text-center">
                <h5>Expense</h5>
              </div>
              <div className="text-end p-1">
                <h6>Max</h6>
              </div>
            </div>
            <div className="dash-history-containers mt-0">
              <Stack direction="horizontal" gap={3}>
                <div className="p-2 text-gray">
                  $
                  {Expense.length !== 0 &&
                    Math.min(...Expense.map((itm) => itm.amount))}
                </div>
                <div className="p-2 ms-auto text-gray">
                  $
                  {Expense.length !== 0 &&
                    Math.max(...Expense.map((itm) => itm.amount))}
                </div>
              </Stack>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} className="mt-5">
            <h3>Recent History </h3>
            {/* <div style={{ maxHeight: "50vh", overflow: "auto" }}> */}
            <div>
              {TransHistory.length !== 0 &&
                TransHistory.map((itm) => {
                  return (
                    <>
                      {itm.type === "income" ? (
                        <div
                          key={itm._id}
                          className="dash-history-containers mt-3"
                        >
                          <Stack direction="horizontal" gap={3}>
                            <div className="p-2 green-text"> {itm.title}</div>
                            <div className="p-2 ms-auto green-text">
                              +${itm.amount}
                            </div>
                          </Stack>
                        </div>
                      ) : (
                        <div
                          key={itm._id}
                          className="dash-history-containers mt-3"
                        >
                          <Stack direction="horizontal" gap={3}>
                            <div className="p-2 red-text"> {itm.title}</div>
                            <div className="p-2 ms-auto red-text">
                              -${itm.amount}
                            </div>
                          </Stack>
                        </div>
                      )}
                    </>
                  );
                })}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;

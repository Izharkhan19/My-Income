import axios from "axios";
import { basepath } from "./Basepath";

export const getIncomesData = async () => {
  try {
    const response = await axios.get(`${basepath.base_URL}api/v1/get-incomes`);
    return response.data; // Return only response data
  } catch (error) {
    if (error.response) {
      return {
        error: true,
        message: `Server responded with status ${error.response.status}: ${error.response.data.message}`,
      };
    } else if (error.request) {
      return {
        error: true,
        message: "No response from the server",
      };
    } else {
      return {
        error: true,
        message: "Error setting up the request: " + error.message,
      };
    }
  }
};

export const deleteIncomeById = async (id) => {
  try {
    const response = await axios.delete(
      `${basepath.base_URL}api/v1/delete-income/${id}`
    );
    return response.data; // Return response data if needed
  } catch (error) {
    if (error.response) {
      return {
        error: true,
        message: `Server responded with status ${error.response.status}: ${error.response.data.message}`,
      };
    } else if (error.request) {
      return {
        error: true,
        message: "No response from the server",
      };
    } else {
      return {
        error: true,
        message: "Error setting up the request: " + error.message,
      };
    }
  }
};

export const saveIncomeData = async (data) => {
  try {
    const response = await axios.post(
      `${basepath.base_URL}api/v1/add-income`,
      data
    );
    return response.data; // Return response data if needed
  } catch (error) {
    if (error.response) {
      return {
        error: true,
        message: `Server responded with status ${error.response.status}: ${error.response.data.message}`,
      };
    } else if (error.request) {
      return {
        error: true,
        message: "No response from the server",
      };
    } else {
      return {
        error: true,
        message: "Error setting up the request: " + error.message,
      };
    }
  }
};

export const updateIncomeDetails = async (id, ReqData) => {
  try {
    const response = await axios({
      method: "PUT",
      // url: API_BASE_PATH.BasePath + `update-income-details/${id}`,
      url: `${basepath.base_URL}api/v1/update-income-details/${id}`,
      data: ReqData,
      headers: {
        "Content-Type": "application/json",
        // Authorization: "bearer " + accessToken,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getIncomeDetailByid = async (ReqData) => {
  // let data = JSON.stringify({
  //   id: "6683c5b746d8263e1f36dc9d",
  // });
  let data = JSON.stringify(ReqData);

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:5000/api/v1/getIncomeByid",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  // try {
  //   const response = await axios({
  //     method: "get",
  //     url: `${basepath.base_URL}api/v1/getIncomeByid`,
  //     data: ReqData,
  //     headers: {
  //       "Content-Type": "application/json",
  //       // Authorization: "bearer " + accessToken,
  //     },
  //   });
  //   return response;
  // } catch (error) {
  //   return error;
  // }
};

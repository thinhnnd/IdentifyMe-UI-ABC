import fetch from "cross-fetch";
import { API_ENDPOINT, headers } from "../config";

export const submitApplicantFormRequest = async body => {
  try {
    const response = await fetch(`${API_ENDPOINT}/join-us`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...headers,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
    const json = await response.json();
    if (json.name === "Error") throw json;
    return json;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getApplicants = async body => {
  try {
    const response = await fetch(`${API_ENDPOINT}/applicant`, {
      method: "GET",
      headers: headers
    });
    const json = await response.json();
    console.log(json);
    if (json.name === "Error") throw json;
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateApplciant = async (id, body) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/applicant/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        ...headers,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  } catch (error) {
    console.log("update applicant error", error);
    throw error;
  }
};

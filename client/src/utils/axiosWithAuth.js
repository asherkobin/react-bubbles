import axios from "axios";

export const axiosWithAuth = (url) => {
  return axios.create({
    headers: {
      "Authorization": localStorage.getItem("USER_TOKEN")
    }
  });
}
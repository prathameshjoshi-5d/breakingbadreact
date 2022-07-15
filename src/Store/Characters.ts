import axios from "axios";

export const getAllCharacters = () => {
  return axios
    .get(`https://breakingbadapi.com/api/characters`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    });
};

export const searchCharacters = async (value: string) => {
  return axios
    .get(`https://breakingbadapi.com/api/characters?name=${value}`)
    .then((res) => {
      res.data.forEach((item: any) => {
        item.favorite = false;
      });
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return error.request;
      } else {
        return error.message;
      }
    });
};

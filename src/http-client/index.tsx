import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "57b6dbc3f5fc342a82e06b86d1b9ce5f",
  },
});

export default httpClient;

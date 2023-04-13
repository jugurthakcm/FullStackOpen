import axios from "axios";

const baseUrl = "https://api.jsonbin.io/v3/b/643820e7ebd26539d0aa5980";

const headers = {
  "X-Master-Key":
    "$2b$10$d0Kl3KE1eyTrfI7mjLSXk.IWEic17C/yVOOW.iAEk71ZcjcYVbP96",
};

const getAll = async () => {
  const response = await axios.get(`${baseUrl}`, {headers});

  return response.data.record;
};

// eslint-disable-next-line
export default {getAll};

import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";

export const getImages = async (newValue, page) => {
  const response = await axios.get("/search/photos/", {
    params: {
      query: newValue,
      per_page: 10,
      page,
    },
    headers: {
      Authorization: "Client-ID 3avK14TIHDaWaoWRHixnmvuGZrTgx4D4_OldARedrxY",
      "Accept-Version": "v1",
    },
  });

  return response.data;
};

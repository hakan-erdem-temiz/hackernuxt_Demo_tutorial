import axios from "axios";

export default axios.create({
  //  baseURL: "https://api.github.com/"
  baseURL: "https://hacker-news.firebaseio.com/v0/"
});

import axios from "axios";
axios.defaults.baseURL = "http://httpbin.org";
// axios的实例()
axios
  .get("/get", {
    params: {
      name: "wyh",
      age: 19,
    },
  })
  .then((res) => {
    console.log(res);
  });

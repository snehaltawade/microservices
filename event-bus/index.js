import axios from "axios";
import e from "express";

const app = e();
app.use(e.json());

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("listeningon 4005");
});

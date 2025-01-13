import axios from "axios";
import e from "express";

const app = e();
app.use(e.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log("error from here", err.message);
  });
  axios
    .post("http://comments-clusterip-srv:4001/events", event)
    .catch((err) => {
      console.log(err.message);
    });
  // axios.post("http://localhost:4002/events", event).catch((err) => {
  //   console.log(err.message);
  // });
  axios
    .post("http://moderation-clusterip-srv:4003/events", event)
    .catch((err) => {
      console.log(err.message);
    });
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("event bus listeningon 4005");
});

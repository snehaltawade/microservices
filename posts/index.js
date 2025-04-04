import express from "express";
import { randomBytes } from "crypto";
import axios from "axios";
import cors from "cors";
const posts = {};
const app = express();
app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  await axios
    .post("http://event-bus-srv:4005/events", {
      type: "POST_CREATED",
      data: { id, title },
    })
    .catch((error) => {
      console.log("cannot post event");
    });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Recieved event", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("v55 checking");
  console.log("post-listening on port 4000");
});

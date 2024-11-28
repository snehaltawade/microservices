import express from "express";
import { randomBytes } from "crypto";
import axios from "axios";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = [];
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  await axios
    .post("http://localhost:4005/events", {
      type: "COMMENT_CREATED",
      data: { id: commentId, content, postId: req.params.id },
    })
    .catch((error) => {
      console.log("cannot post comment event");
    });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Recieved event", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("comments - listening on port 4001");
});

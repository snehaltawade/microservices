import e, { json } from "express";
import cors from "cors";
import axios from "axios";
const app = e();
app.use(json());
app.use(cors());

const handleEvent = (type, data) => {
  if (type == "POST_CREATED") {
    // console.log("entered here");
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type == "COMMENT_CREATED") {
    const { id, content, postId, status } = data;
    // posts[postId].comments.push({ id, content });
    const post = posts[postId];
    post.comments.push({ id, content, status });
    // console.log("post afetr comment added", posts);
  }
  if (type == "COMMENT_UPDATED") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    // console.log("post afetr comment added", posts);
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});
const posts = {};
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  // console.log("posts", posts);
  res.send({});
});

app.listen(4002, async () => {
  console.log("query- listening on port 4002");
  try {
    const res = await axios.get("http://event-bus-srv:4005/events");
    console.log("post on first", posts);
    res.data.forEach((event) => {
      console.log("event details ", event);
      // handleEvent(event.type, event.data);
      // console.log("post after each upadte", posts);
    });
    // console.log("post after update", posts);
  } catch (e) {
    console.log("error in query", e);
  }
});

import e, { json } from "express";
import cors from "cors";
const app = e();
app.use(json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});
const posts = {};
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type == "POST_CREATED") {
    console.log("entered here");
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type == "COMMENT_CREATED") {
    const { id, content, postId } = data;
    // posts[postId].comments.push({ id, content });
    const post = posts[postId];
    post.comments.push({ id, content });
    console.log("post afetr comment added", posts);
  }
  console.log("posts", posts);
  res.send({});
});
app.listen(4002, () => {
  console.log("listening on port 4002");
});

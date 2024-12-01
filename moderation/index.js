import e, { json } from "express";
import axios from "axios";

const app = e();
app.use(json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type == "COMMENT_CREATED") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "COMMENT_MODERATED",
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status,
      },
    });
  }

  res.send({});
});
app.listen(4003, () => {
  console.log("moderation - listening on prt 4003");
});

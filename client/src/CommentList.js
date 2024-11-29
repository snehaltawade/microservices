import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ comments }) => {
  // const [comments, setComments] = useState([]);
  // no longer needed
  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;

  // alternate way
  // return comments.map((comment) => {
  //   return (
  //     <li className="check" key={comment.id}>
  //       {comment.content}
  //     </li>
  //   );
  // });
};

export default CommentList;

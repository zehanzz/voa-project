import axios from "axios";
import React, { useEffect, useState } from "react";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  // TODO
  return (
    <div className="menu">
      <h1>Show list</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          {/* <img src={`../upload/${post?.img}`} alt="" /> */}
          <h2>{post.title}</h2>
          <button>A button</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;

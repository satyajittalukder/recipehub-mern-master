import axios from "axios";
import { useEffect, useState } from "react";

const AxiosTest = () => {
  const [topRating, setTop] = useState([]);
  //   let topRating = [];
  useEffect(() => {
    axios.get("/recipes?sort=-createdAt&limit=3").then((res) => {
      setTop(res.data);
      // topRating = res.data;
      console.log(res.data);
    });
  }, [topRating.length]);

  return (
    <>
      {topRating.map((tags) => (
        <p>{tags.tagsName}</p>
      ))}
    </>
  );
};

export default AxiosTest;

// axios
//   .get("/recipes/")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

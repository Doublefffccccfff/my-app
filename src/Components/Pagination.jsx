import React, { useEffect } from "react";
import axios from "axios";

const Pagination = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      console.log("Fetched Data:", response.data);
    } catch (error) {
      console.error("failed to fetch data");
      alert("failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Pagination Component</h2>
      <p>Open the console to see the API response.</p>
    </div>
  );
};

export default Pagination;

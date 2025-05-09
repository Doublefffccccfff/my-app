import React, { useEffect, useState } from "react";
import axios from "axios";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setData(response.data);
    } catch (error) {
      console.log("error while fetching data", error);
      setTimeout(() => {
        alert("failed to fetch data");
      }, 0);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);

  return (
    <div style={{ maxWidth: "100%", margin: "auto", textAlign: "center" }}>
      <h1>Employee Data Table</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        <thead style={{ backgroundColor: "#009879", color: "white" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.id}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.name}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.email}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ backgroundColor: "#009879", color: "white", padding: "5px 15px", border: "none", borderRadius: "5px" }}
        >
          Previous
        </button>

        <p style={{ fontWeight: "bold", fontSize: "16px" }}>{currentPage}</p>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ backgroundColor: "#009879", color: "white", padding: "5px 15px", border: "none", borderRadius: "5px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

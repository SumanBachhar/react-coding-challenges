import { useState, useEffect } from "react";
import axios from "axios";

function Pagination() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Change this value to set the number of items per page
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    try {
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Fetch data from mock API
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${itemsPerPage}`
      );
      setData(response.data);

      // Get total items count for pagination
      const totalCountResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const totalCount = totalCountResponse.data.length;
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Refetch data when currentPage changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderData = () => {
    return data.map((item) => (
      <div key={item.id} className="item">
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    ));
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pagination-container">
      <h1>Pagination Example</h1>
      <div className="data-container">{renderData()}</div>
      <div className="pagination">{renderPagination()}</div>
    </div>
  );
}

export default Pagination;

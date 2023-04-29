import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://catalog-management-system-kxyaws5ixa-uc.a.run.app/cms/products?page=${page}`
    )
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.log(error));
  }, [page]);

  const pageChangeHandler = (newPage) => {
    setPage(newPage);
  };
  const columns = [
    { field: "gtin", headerName: "ID", width: 130 },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      renderCell: (params) => (
        <Link to={`/products/${params.row.name}`}>{params.value}</Link>
      ),
    },
    {
      field: "images",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          style={{ width: "100%", height: "100%" }}
        />
      ),
    },
    { field: "main_category", headerName: "Category", width: 130 },
    { field: "mrp.mrp", headerName: "Price", width: 90 },
    { field: "company_detail", headerName: "Company", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
  ];

  const searchHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const getRowId = (product) => product.gtin;

  const filteredData = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={searchHandler}
        placeholder="search product by name"
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          getRowId={getRowId}
          rowHeight={50}
          pagination
          pageSize={10}
          rowCount={100}
          onPageChange={(params) => pageChangeHandler(params.page)}
        />
      </div>
    </div>
  );
};

export default ProductList;

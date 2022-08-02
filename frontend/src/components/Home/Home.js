import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Home = () => {
  const [productList, setProductList] = useState(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [updateId, setUpdateId] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const url = "/product/";
  const navigate = useNavigate();

  // const getData = async () => {
  //   await axios.get(url).then(result => setProductList(result.data));
  // }

  const fetchUserData = async (pageV, limitV, orderV, orderByV, keywordV) => {
    await axios.get(`url?page=${pageV}&limit=${limitV}&order=${orderV}&order_by=${orderByV}&keyword=${keywordV}`).then(result => setProductList(result.data));
  };

  useEffect(() => {
    // getData()
    fetchUserData();
  }, [])
  console.log("productList : ", productList)

  const updateData = (data, action) => {
    switch (action) {
      case "update":
        setUpdateId(data._id);
        navigate(`/products/${data._id}`)
        break;

      case "delete":
        axios.delete(`${url}${data._id}`).then(result => getData());
        // axios.delete(`${url}${data._id}`).then(result => setProductList(result.data))
        break;

      case "search":
        searchData(data)
        break;
    }
  }

  const handleSort = (column, sortDirection) => {
    if (column.sortField) {
      setOrder(sortDirection);
      setOrderBy(column.sortField);
      // axios.get(`${url}?order_by=${column.sortField}&order=${sortDirection}`).then(result => setProductList(result.data))
      fetchUserData(page, limit, sortDirection, column.sortField, keyword);
    }
  };

  const handlePageChange = (currentPage) => {
    console.log("page : ", currentPage)
    setPage(currentPage);
    // axios.get(`${url}?page=${currentPage}&limit=${limit}`).then(result => setProductList(result.data))
    fetchUserData(currentPage, limit, order, orderBy, keyword);
  };

  const handlePerRowsChange = async (newPerPage = 10) => {
    console.log("limit : ", newPerPage)
    setLimit(newPerPage);
    // axios.get(`${url}?page=${page}&limit=${newPerPage}`).then(result => setProductList(result.data))
    fetchUserData(page, newPerPage, order, orderBy, keyword);
  };

  let timeout;
  const searchData = (searchKeyword) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setKeyword(searchKeyword)
      // axios.get(`${url}?keyword=${keyword}`).then(result => setProductList(result.data))
      fetchUserData(page, limit, order, orderBy, searchKeyword);
    }, 1000)
  }

  const columns = [
    {
      name: 'Name',
      selector: row => row.product_name,
      sortable: true,
      sortField: 'product_name'
    },
    {
      name: 'Category',
      selector: row => row.category?.category_name,
      sortable: true,
      sortField: 'category_name'
    },
    {
      name: 'Price',
      selector: row => row.price,
      sortable: true,
      sortField: 'product_price'
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      sortField: 'status'
    },
    {
      name: "Actions",
      cell: (row) =>
        <>
          <button onClick={() => updateData(row, "update")} >
            <FontAwesomeIcon icon={faPencilAlt} className="text-lg " style={{ width: '1.25em', color: "#e58d09", marginRight: ".5rem" }}></FontAwesomeIcon>
          </button>
          <button onClick={() => updateData(row, "delete")} >
            <FontAwesomeIcon icon={faTrash} className="text-lg " style={{ width: '1.25em', color: "#e58d09", marginRight: ".5rem" }}></FontAwesomeIcon>
          </button>
        </>
    }
  ];

  return (
    <>
      <div style={{ width: "20%", margin: "100px auto 0 auto", textAlign: "center" }}>
        <input
          type="text"
          className="w-full p-4 pr-12 text-sm pl-4 border-gray-200 rounded-lg shadow-sm"
          placeholder="Search"
          {...register("search")}
          onChange={(e) => updateData(e.target.value, "search")}
        />
      </div>
      <div style={{ width: "46%", margin: "10px auto 0 auto" }}>
        {productList && <DataTable
          columns={columns}
          data={productList}
          sortServer
          onSort={handleSort}
          pagination
          paginationServer
          paginationTotalRows={productList.length}
          persistTableHead
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
        />}
      </div>
    </>
  )
}

export default Home
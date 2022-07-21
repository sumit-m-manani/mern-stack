import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import { faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [productList, setProductList] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const url = "/product/";
  const navigate = useNavigate();

  const getData = async () => {
    const responce = await axios.get(url);;
    setProductList(responce.data);
  }

  useEffect( () => {
    getData()
  }, [])

  const updateData = (data, action) => {
    switch(action){
      case "update":
        setUpdateId(data._id);
        navigate(`/products/${data._id}`)
        break;

      case "delete":
        axios.delete(`${url}${data._id}`)
        getData();
        break;
    }
  }

  const columns = [
    {
      name: 'Name',
      selector: row => row.product_name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => row.product_price,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
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
    <div style={{width:"40%", margin: "auto"}}>
        {productList && <DataTable
          columns={columns}
          data={productList}
        />}
    </div>
  )
}

export default Home
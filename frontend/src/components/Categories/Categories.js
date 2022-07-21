import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Categories = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [categoryList, setCategoryList] = useState(null);
  const [action, setAction] = useState("add");
  const [updateId, setUpdateId] = useState(null);
  const url = "/category/";

  const getData = async () => {
    const responce = await axios.get(url);;
    setCategoryList(responce.data);
  }

  useEffect(() => {
    getData()
  }, [])

  const updateData = (data, action) => {
    switch(action){
      case "update":
        setValue("category_name", data.category_name)
        setValue("category_description", data.category_description)
        setUpdateId(data._id)
        setAction("update")
        break;
        
      case "delete":
        axios.delete(`/category/${data._id}`);
        getData();
        break;
    }
  }

  const submitData = async (data) => {
    if(updateId){
      await axios.patch(`/category/${updateId}`, data);
      setUpdateId(null)
      setValue("category_name", "")
      setValue("category_description", "")
    }else{
      await axios.post("/category/", data)
      setValue("category_name", "")
      setValue("category_description", "")
    } 
    getData();
  }

  const columns = [
    {
      name: 'Name',
      selector: row => row.category_name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => row.category_description,
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
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly", margin: "2rem" }}>
      <div style={{ width: "40%" }}>
        <div>
          {categoryList && <DataTable
            columns={columns}
            data={categoryList}
          />}
        </div>
      </div>
      <div style={{ width: "60%" }}>
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Add New Category </h1>
          </div>

          <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4" onSubmit={handleSubmit(submitData)}>
            <div>
              <label for="Name" className="sr-only">Category Name</label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Category Name"
                  {...register("category_name", { required: true })}
                />
                {errors?.category_name?.type === "required" && (
                  <span className="block font-poppins error-text text-red-700 mt-1">
                    Category Name Required !
                  </span>
                )}
              </div>
            </div>

            <div>
              <label for="Description" className="sr-only">Category Description</label>
              <div className="relative">
                <textarea
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Category Description"
                  {...register("category_description", { required: true })}
                />
              </div>
              {errors?.category_description?.type === "required" && (
                <span className="block font-poppins error-text text-red-700">
                  Category Desctiption Required !
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                id="action"
                className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Categories
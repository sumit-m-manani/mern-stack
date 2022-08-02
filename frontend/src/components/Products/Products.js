import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Products = () => {
  const [categoryList, setCategoryList] = useState(null);
  const [updateData, setUpdateData] = useState(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const url = "/category/";
  const prod_url = "/product";
  const { id } = useParams();
  const navigate = useNavigate();

  const getData = async () => {
    await axios.get(url).then(result => setCategoryList(result.data));
    // const responce = await axios.get(url).then(result => setCategoryList(result.data));
    // setCategoryList(responce.data);
  }

  const getDataById = async () => {
    if(id){
      const responce = await axios.get(`${prod_url}/${id}`);
      setUpdateData(responce.data);
      console.log("responce : ", responce.data)

      setValue("product_name", responce.data.product_name);
      setValue("product_price", responce.data.product_price);
      setValue("product_description", responce.data.product_description);
      setValue("category_id", responce.data.category_id);
      setValue("status", responce.data.status);
    }
  }

  useEffect(() => {
    getData();
    getDataById();
  }, [])

  const submitData = (data) => {
    if (data.category_id) {
      data.category_id = data.category_id;
    } else {
      data.category_id = categoryList[0]?._id
    }
    if (id) {
      axios.patch(`${prod_url}/${id}`, data)
      setValue("product_name", "");
      setValue("product_price", "");
      setValue("product_description", "");
    } else {
      axios.post(prod_url, data);
      setValue("product_name", "");
      setValue("product_price", "");
      setValue("product_description", "");
    }
    navigate("/");
  }

  return (
    <div className='ml-40 mr-40'>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Add New Product </h1>
        </div>

        <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4" onSubmit={handleSubmit(submitData)}>
          <div>
            <label for="Name" className="">Product Name : </label>
            <div className="relative mt-4">
              <input
                type="text"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Product Name"
                {...register("product_name", { required: true })}
              />
              {errors?.product_name?.type === "required" && (
                <span className="block font-poppins error-text text-red-700 mt-1">
                  Product Name Required !
                </span>
              )}
            </div>
          </div>

          <div>
            <label for="category" className="">Product Category : </label>
            <div className="relative mt-4">
              <select {...register("category_id")}>
                {categoryList && categoryList.map(item => {
                  return (
                    <option value={item._id}>{item.category_name}</option>
                  )
                })}
              </select>
              {errors?.category_id?.type === "required" && (
                <span className="block font-poppins error-text text-red-700 mt-1">
                  Select valid Category !
                </span>
              )}
            </div>
          </div>

          <div>
            <label for="Price" className="">Product Price : </label>
            <div className="relative mt-4">
              <input
                type="text"
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Product Price"
                {...register("product_price", { required: true, pattern: /^[0-9]+$/ })}
              />
            </div>
            {errors?.product_price?.type === "required" && (
              <span className="block font-poppins error-text text-red-700">
                Product Desctiption Required !
              </span>
            )}
            {errors?.product_price?.type === "pattern" && (
              <span className="block font-poppins error-text text-red-700">
                Only Numbers allowed !
              </span>
            )}
          </div>

          <div>
            <label for="Description" className="">Product Description : </label>
            <div className="relative mt-4">
              <textarea
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Product Description"
                {...register("product_description", { required: true })}
              />
            </div>
            {errors?.product_description?.type === "required" && (
              <span className="block font-poppins error-text text-red-700">
                Product Desctiption Required !
              </span>
            )}
          </div>

          <div>
            <label for="status">Product Status : </label>
            <div className="relative flex mt-4">
              <input
                type="radio"
                name='Available'
                radioGroup='status'
                value="Available"
                {...register("status", { required: true })}
              />
              <div className='ml-3'>
                Available
              </div>
            </div>
            <div className="relative flex">
              <input
                type="radio"
                name='Out of Stock'
                radioGroup='status'
                value="Out of stock"
                {...register("status", { required: true })}
              />
              <div className='ml-3'>
                Out of Stock
              </div>
            </div>
            {errors?.status?.type === "required" && (
              <span className="block font-poppins error-text text-red-700">
                Product Status Required !
              </span>
            )}
          </div>



          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Products
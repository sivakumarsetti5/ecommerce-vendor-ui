"use client";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import config from "./config.json";
import { useDispatch } from "react-redux";
import styles from "./Products.module.css";

import { GET_PRODUCTS } from "../../graphQL/query/getProducts";
import { DELETE_PRODUCT } from "../../graphQL/mutation/deleteProduct";
import { SAVE_PRODUCTS } from "../../graphQL/mutation/saveProducts";
import {UPDATE_PRODUCTS} from '../../graphQL/mutation/updateProducts'

import { AppTable } from "../shared/AppTable";
import { AppForm } from "../shared/AppForm";
import { TextArea } from "../shared/TextArea";
import { Input } from "../shared/Input";
import { Select } from "../shared/Select";

import { updateStoreData } from "../../services/functions";
import { AppCookies } from "../../services/cookies";
import {clearFormData,handleFieldLevelValidation,handleFormLevelValidation,setFormData} from "../../services/validations";


export const Products = () => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [rowData,setRowData] = useState({}) 
  const [inputControls, setInputControls] = useState(config);

  const [fnSaveProduct] = useMutation(SAVE_PRODUCTS);
  const { data, error, loading, refetch } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "no-cache", // Doesn't check cache before making a network request
    variables: {
      vendorId: AppCookies.getCookie("id"),
    },
  });
  const [fnDeleteProduct] = useMutation(DELETE_PRODUCT);
  const[fnUpdateProduct] = useMutation(UPDATE_PRODUCTS);

  const dispatch = useDispatch();

  const fnAddProduct = () => {
    setIsShowForm(true);
    setIsEdit(false);
  };

  const handleChange = async (event) => {
    await handleFieldLevelValidation(event, inputControls, setInputControls);
  };

  const fnSubmit = async () => {
    const [isInvalid, data] = await handleFormLevelValidation(inputControls,setInputControls);
    if (isInvalid) return;
    
    try {
      updateStoreData(dispatch, "LOADER", true);
      const { category, cost, description, name } = data;
      const res = await fnSaveProduct({
        variables: {
          file: data?.image?.[0],
          productInput: {
            category: category,
            cost: Number(cost),
            description: description,
            name: name,
            vendorId: AppCookies.getCookie("id"),
          },
        },
      });
      const { acknowledged, insertedId } = res?.data?.saveProduct;
      let isSuccess = false;
      if (insertedId && acknowledged) {
        isSuccess = true;
        refetch();
        clearFormData(inputControls, setInputControls);
        setIsShowForm(false);
      }
      updateStoreData(dispatch, "TOASTER", {
        isShowToaster: true,
        toasterMsg: isSuccess ? "Successfully added" : "Not Added",
        color: isSuccess ? "green" : "red",
      });
    } catch (ex) {
      updateStoreData(dispatch, "TOASTER", {
        isShowToaster: true,
        toasterMsg: ex?.message,
        color: "red",
      });
    } finally {
      updateStoreData(dispatch, "LOADER", false);
    }
  };
  const fnUpdate = async() =>{
    const [isInvalid, data] = await handleFormLevelValidation(inputControls,setInputControls);
    console.log("updatedData",data)
    const{name,category,description,cost,image} = data
    if (isInvalid) return;
    try{
      const res = await fnUpdateProduct({
        variables:{
          "file": data?.image?.[0],
          "productInput": {
            "category":category,
            "cost": cost,
            "description": description,
            "filePath":image,
            "id": rowData._id,
            "name": name
          }
        }
      })
      const{acknowledged,modifiedCount} = res?.data?.updateProduct
      alert("success",acknowledged,modifiedCount)
    }catch(ex){
      console.log(ex?.message)
    }
  }

  const deleteProduct = async ({ _id, filePath }) => {
    try {
      updateStoreData(dispatch, "LOADER", true);
      const res = await fnDeleteProduct({
        variables: {
          data: {
            id: _id,
            path: filePath,
          },
        },
      });
      const { acknowledged, deletedCount } = res?.data?.deleteProduct;
      // console.log(res?.data?.deleteProduct)
      let isDeleteProduct = false;
      if (acknowledged && deletedCount > 0) {
        refetch();
        isDeleteProduct = true;
      }
      updateStoreData(dispatch, "TOASTER", {
        isShowToaster: true,
        toasterMsg: isDeleteProduct
          ? "Product Successfully Deleted"
          : "Not Deleted",
        color: isDeleteProduct ? "green" : "red",
      });
    } catch (ex) {
      updateStoreData(dispatch, "TOASTER", {
        isShowToaster: true,
        toasterMsg: ex?.message,
        color: "red",
      });
    } finally {
      updateStoreData(dispatch, "LOADER", false);
    }
  };

  const handleDelete = (row) => {
    updateStoreData(dispatch, "MODAL", {
      isShowModal: true,
      modalAction: () => deleteProduct(row),
    });
  };
  const handleEdit = (row) => {
    //console.log("row",row)
    setIsShowForm(true);
    setRowData(row)
    setIsEdit(true);
    setFormData(inputControls,setInputControls,row)
  };

  const handleCloseForm = () =>{
    setIsShowForm(false)
    clearFormData(inputControls,setInputControls)
  }

  useEffect(() => {
    updateStoreData(dispatch, "LOADER", loading);
  }, [loading]);

  return (
    <div className={`pb-5 ${styles.productsCont}`}>
      <div className="text-end m-3">
        <button className="btn btn-primary" onClick={fnAddProduct}>
          Add Product
        </button>
      </div>
      <AppTable
        data={data?.getProducts || []}
        imgThs={["Image"]}
        imgTds={["filePath"]}
        tds={["name", "category", "cost", "description"]}
        ths={["Name", "Category", "Cost", "Description"]}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      {isShowForm && (
        <AppForm setIsShowForm={setIsShowForm} handleCloseForm={handleCloseForm}>
          <div className={`container-fluid ${styles.formCont}`}>
            {inputControls.map((obj, ind) => {
              switch (obj.tag) {
                case "input":
                  return (
                    <Input key={ind} {...obj} handleChange={handleChange} />
                  );
                case "select":
                  return (
                    <Select key={ind} {...obj} handleChange={handleChange} />
                  );
                case "textarea":
                  return (
                    <TextArea key={ind} {...obj} handleChange={handleChange} />
                  );
                default:
                  return <></>;
              }
            })}
            <div>
              {isEdit ? 
                <button className="btn btn-primary form-control" onClick={fnUpdate}>Update</button>: 
                <button className="btn btn-primary form-control" onClick={fnSubmit}>Submit</button>
              }
            </div>
          </div>
        </AppForm>
      )}
    </div>
  );
};

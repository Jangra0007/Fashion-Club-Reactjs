import React, { useState ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'

import {getProduct, updateProduct} from "../../../Store/ActionCreators/ProductActionCreators"

import { getMaincategory } from '../../../Store/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../Store/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../Store/ActionCreators/BrandActionCreators'



export default function AdminUpdateProduct() {
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        baseprice: "",
        discount: "",
        finalprice: "",
        stock: "In Stock",
        description: "This is Sample Product",
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: ""
    })
    let allStateData = useSelector(state => state.ProductStateData)
    let allMaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let allSubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let allBrandStateData = useSelector(state => state.BrandStateData)
    var dispatch = useDispatch()
    var navigate = useNavigate()
    var {id} = useParams()
    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getInputFile(e) {
        var { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name
            }
        })
    }
    function postData(e) {
        e.preventDefault()
        var fp = Math.round(data.baseprice-data.baseprice*data.discount/100)
        var item = {
            id:id,
            name:data.name,
            maincategory:data.maincategory,
            subcategory:data.subcategory,
            brand:data.brand,
            color:data.color,
            size:data.size,
            baseprice:data.baseprice,
            discount:data.discount,
            finalprice:fp,
            stock:data.stock,
            description:data.name,
            pic1:data.pic1,
            pic2:data.pic2,
            pic3:data.pic3,
            pic4:data.pic4
        }
        dispatch(updateProduct(item))
        navigate("/admin-product")
    }
    function getAPIData() {
        dispatch(getProduct())
        dispatch(getMaincategory())
        dispatch(getSubcategory())
        dispatch(getBrand())
        if(allStateData && allMaincategoryStateData.length && allSubcategoryStateData.length && allBrandStateData.length){
            var item = allStateData.find((item)=>item.id===Number(id))
            if(item){
                setData({...item})
            }
        }
    }
    useEffect(() => {
        getAPIData()
    }, [allStateData.length,allMaincategoryStateData.length,allSubcategoryStateData.length,allBrandStateData.length])
    return (
    <>
         {/* <!-- breadcrumb-section --> */}
         <div className="breadcrumb-section breadcrumb-bg pb-4">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>Admin Section</h1>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- end breadcrumb section --> */}
            <div className="container-fluid my-2">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10">
                        <h5 className='bg-secondary p-3 text-center rounded'>Product</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label >Name</label>
                                <input type="text" name="name" onChange={getInputData} placeholder='Enter Product :' className='form-control' value={data.name} />
                            </div>
                            <div className="row mb-3">
                                <div className="col-lg-3 col-md-6">
                                    <label>Maincategory</label>
                                    <select name="maincategory" value={data.maincategory} onChange={getInputData} className='form-control'>
                                        {
                                            allMaincategoryStateData && allMaincategoryStateData.slice(1).reverse().map((item, index) => {
                                                return  <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <label>Subcategory</label>
                                    <select name="subcategory" value={data.subcategory} onChange={getInputData} className='form-control'>
                                        {
                                            allSubcategoryStateData && allSubcategoryStateData.slice(1).reverse().map((item, index) => {
                                                return  <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <label>Brand</label>
                                    <select name="brand" value={data.brand} onChange={getInputData} className='form-control'>
                                        {
                                            allBrandStateData && allBrandStateData.slice(1).reverse().map((item, index) => {
                                                return  <option key={index} value={item.name}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                    <label>Stock</label>
                                    <select name="stock" value={data.stock} onChange={getInputData} className='form-control'>
                                        <option value="In Stock">In Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label >Color</label>
                                        <input type="text" value={data.color} name="color" onChange={getInputData} placeholder='Color' className='form-control' />
                                    </div>
                                    <div className="col-md-6">
                                        <label >Size</label>
                                        <input type="text" name="size" value={data.size} onChange={getInputData} placeholder='Size' className='form-control' />
                                    </div>
                            </div>
                            <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label >Base Price</label>
                                        <input type="number" value={data.baseprice} name="baseprice" onChange={getInputData} placeholder='Base Price' className='form-control w-100' />
                                    </div>
                                    <div className="col-md-6">
                                        <label >Discount</label>
                                        <input type="number" value={data.discount} name="discount" onChange={getInputData} placeholder='Discount' className='form-control w-100' />
                                    </div>
                            </div>
                            <div className="mb-3">
                                <label>Description</label>
                                <textarea name="description"  rows="5" onChange={getInputData} placeholder='Product Description'  className='form-control'>{data.description}</textarea>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                <label >Pic1</label>
                                <input type="file" name="pic1"  onChange={getInputFile} className='form-control' />
                                </div>
                                <div className="col-md-6">
                                <label >Pic2</label>
                                <input type="file" name="pic2" onChange={getInputFile} className='form-control' />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                <label >Pic3</label>
                                <input type="file" name="pic3" onChange={getInputFile} className='form-control' />
                                </div>
                                <div className="col-md-6">
                                <label >Pic4</label>
                                <input type="file" name="pic4" onChange={getInputFile} className='form-control' />
                                </div>
                            </div>
                            <div className="mb-3 btn-group w-100">
                                <button type='submit' className='btn btn-primary text-light w-50'>Submit</button>
                                <button type='reset' className='btn btn-secondary text-light w-50'>Reset</button>

                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
    </>
  )
}

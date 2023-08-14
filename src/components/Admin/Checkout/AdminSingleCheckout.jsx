import React from 'react'
import { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { getCheckout, updateCheckout } from '../../../Store/ActionCreators/CheckoutActionCreators '
import { useNavigate, useParams } from 'react-router-dom'

export default function AdminSingleCheckout() {
    var [data, setData] = useState({
        products:[]
    })
    var [orderstatus,setOrderStatus] = useState("")
    var [paymentstatus,setPaymentStatus] = useState("")
    var allStateData = useSelector(state => state.CheckoutStateData)
    var dispatch = useDispatch()
    var { id } = useParams()
    
    function updateItem(){
        dispatch(updateCheckout({...data, orderstatus:orderstatus,paymentstatus:paymentstatus}))
        setData({...data, orderstatus:orderstatus,paymentstatus:paymentstatus})
    }
    function getAPIData() {
        dispatch(getCheckout())
        if (allStateData.length){
            let item = allStateData.slice(1).find((x) => x.id === Number(id))
            setData(item)
            setOrderStatus(item.orderstatus)
            setPaymentStatus(item.paymentstatus)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [allStateData.length])
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
                        <div className="table-responsive">
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentmode}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentstatus}
                                        <br />
                                        {
                                            data.paymentmode==="COD" && data.paymentstatus==="Pending"?
                                            <select name="paymentstatus" value={paymentstatus} onChange={(e)=>setPaymentStatus(e.target.value)} className='form-control'>
                                                <option value="Pending">Pending</option>
                                                <option value="Done">Done</option>
                                            </select>:""
                                            
                                        }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{data.orderstatus}
                                        <br />
                                        {
                                            data.orderstatus!=="Delivered" ?
                                            <select name="orderstatus"value={orderstatus} onChange={(e)=>setOrderStatus(e.target.value)} className='form-control'>
                                                <option value="Order Placed">Order Placed</option>
                                                <option value="Ready to ship">Ready to ship</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Out for Delivery">Out for Delivery</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Return/Replace">Return/Replace</option>
                                            </select>:""
                                            
                                        }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    {
                                        data.rppid?
                                        <tr>
                                            <th>RPPID</th>
                                            <th>{data.rppid}</th>
                                        </tr>:
                                        ""
                                    }
                                    <tr>
                                        <th>Date</th>
                                        <td>{data.date}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.paymentstatus==="Pending" || data.orderstatus!=="Delivered"?
                                                <button className='btn menu-bg text-light w-100' onClick={updateItem}>Update</button>:""                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h5>Checkout Products</h5>
                        <table className="cart-table">
                                                <thead className="cart-table-head">
                                                    <tr className="table-head-row">
                                                        <th className="text-left product-image"></th>
                                                        <th className="text-left product-name">Name</th>
                                                        <th className="text-left product-name">Brand/Color/Size</th>
                                                        <th className="text-left product-price">Price</th>
                                                        <th className="text-left product-price">Qty</th>
                                                        <th className="text-left product-price">Total</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.products.map((item, index) => {
                                                            return <tr key={index} className="table-body-row">
                                                                <td className="product-image"><a href={`/assets/images/${item.pic}`} rel="noreferrer" target='_blank'><img src={`/assets/images/${item.pic}`} height='50px' alt="" /></a></td>
                                                                <td className="product-name">{item.name}</td>
                                                                <td className="product-name">{item.brand}/{item.color}/{item.size}</td>
                                                                <td className="product-price">&#8377;{item.price}</td>
                                                                <td className="product-price">{item.qty}</td>
                                                                <td className="product-price">&#8377;{item.total}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                    </div>
                </div>
            </div>
            
        </>
    )
}

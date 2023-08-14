import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword:""
    })
    var navigate = useNavigate()
    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        if(data.password===data.cpassword){
            var response = await fetch("/user", {
                method: "get",
                headers: {
                    "control-type": "application/json"
                }
            })
            response = await response.json()
            if (response.find((item) => item.username === data.username)) {
                alert("Username Already Exist!!")
            }
            else {
                var item = {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    role:"Buyer"
                }
                response = await fetch("/user", {
                    method: "post",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(item)
                })
                response = response.json()
                navigate("/login")
            }
        }
        else
        alert("Password and Confirm Password Doesn't match")
    }

    return (
        <>
            {/* <!-- breadcrumb-section --> */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">

                                <h3>Sign Up</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- end breadcrumb section --> */}

            <div className="container my-5 w-100">
                <div className="w-75 m-auto">
                    <h5 className='text-center menu-bg text-light p-2'><span className='text-warning'>Create  </span>Account</h5>
                    <form onSubmit={postData}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Name</label>
                                <input type="text" onChange={getInputData} name="name" placeholder='Enter Your Name' className="form-control" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>UserName</label>
                                <input type="text" onChange={getInputData} name="username" placeholder='Enter User Name' className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Email</label>
                                <input type="email" onChange={getInputData} name="email" placeholder='Enter Your Email' className="form-control" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Phone</label>
                                <input type="text" onChange={getInputData} name="phone" placeholder='Enter Phone' className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Password</label>
                                <input type="password" onChange={getInputData} name="password" placeholder='Password' className="form-control" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Confirm Password</label>
                                <input type="password" onChange={getInputData} name="cpassword" placeholder='Confirm Password' className="form-control" />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <button type='submit' className='btn menu-bg text-light p-2 w-100'>SignUp</button>
                        </div>
                    </form>
                    <Link to="/login">Already Registered/Login to your Account </Link>
                </div>
            </div>
        </>
    )
}

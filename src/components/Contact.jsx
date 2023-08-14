import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createContact } from "../Store/ActionCreators/ContactActionCreators"

export default function Contact() {
	var [data, setData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
		status:"Active"
	})
	var dispatch = useDispatch()
	function getInputData(e) {
		var { name, value } = e.target
		setData((old) => {
			return {
				...old,
				[name]: value
			}
		})
	}
	function postData(e) {
		e.preventDefault()
		var date = new Date()
		dispatch(createContact({ ...data, date: date.toLocaleDateString() }))
		alert("Thanks to Share Your Query!!! We will Contact you soon.")
		setData({
			name: "",
			email: "",
			phone: "",
			subject: "",
			message: "",
		})
	}
	return (
		<>
			{/* <!-- breadcrumb-section --> */}
			<div className="breadcrumb-section breadcrumb-bg">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2 text-center">
							<div className="breadcrumb-text">
								<p>Get 24/7 Support</p>
								<h1>Contact us</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- end breadcrumb section --> */}

			{/* <!-- contact form --> */}
			<div className="contact-from-section my-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mb-5 mb-lg-0">
							<div className="form-title">
								<h2>Have any query?</h2>
							</div>
							<div id="form_status"></div>
							<div className="">
								<form onSubmit={postData}>
									<p>
										<input required type="text" placeholder="Name" onChange={getInputData} name="name" id="name" className='form-control mb-4' value={data.name} />
										<input required type="email" placeholder="Email" onChange={getInputData} name="email" id="email" className='form-control mb-4' value={data.email} />
									</p>
									<p>
										<input required type="tel" placeholder="Phone" onChange={getInputData} name="phone" id="phone" className='form-control mb-4' value={data.phone} />
										<input required type="text" placeholder="Subject" onChange={getInputData} name="subject" id="subject" className='form-control mb-4' value={data.subject} />
									</p>
									<p><textarea name="message" id="message" className='form-control mb-4' onChange={getInputData} rows="5" required placeholder="Message" value={data.message} ></textarea></p>
									<div className="mb-3">
										<button type='submit' className='btn menu-bg text-light w-100 btn-sm'>Submit</button>
									</div>
								</form>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="contact-form-wrap">
								<div className="contact-form-box">
									<h4><i className="fas fa-map"></i> Shop Address</h4>
									<p>A-43 <br /> Sector-16, Noida <br /> UP, India</p>
								</div>
								<div className="contact-form-box">
									<h4><i className="far fa-clock"></i> Shop Hours</h4>
									<p>MON - FRIDAY: 8 to 9 PM <br /> SAT - SUN: 10 to 8 PM </p>
								</div>
								<div className="contact-form-box">
									<h4><i className="fas fa-address-book"></i> Contact</h4>
									<p> <i className="fa fa-phone"></i> : <a href="tel:8529706510">8529706510</a> <br /> <i className='fa fa-envelope'></i> : <a href="mailto:shivamjangra1911@gmail.com">Shivamjangra1911@gmail.com</a></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- end contact form --> */}

			{/* <!-- find our location --> */}
			<div className="find-location blue-bg">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 text-center">
							<p> <i className="fas fa-map-marker-alt"></i> Find Our Location</p>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- end find our location --> */}

			{/* <!-- google map section --> */}
			<div className="embed-responsive embed-responsive-21by9">
				<div className="mapouter"><div className="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=a-43%20sector%2016%20noida&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="500px" marginWidth="100%"></iframe></div></div>
			</div>
			{/* <!-- end google map section --> */}


		</>
	)
}

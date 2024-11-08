"use client"
import React from 'react'
import {Animations} from '../shared/Animations'
export const Home = () => {
  return (
    <div className='container mb-5'>
      <h1 className='text-center my-3'>Welcome to Vendor Module</h1>
      <div>
        <h5>Vendor Registration Page</h5>
        <p>Welcome Message: “Join our network of trusted vendors! Sign up to reach thousands of customers.”</p>
        <ul>
          <li>Expand your reach with our platform</li>
          <li>Manage your inventory easily</li>
          <li>Receive insights on your sales and performance.</li>
          <li>Fields for personal information, business details, tax identification, and preferred payment methods.</li>
        </ul>
      </div> 
      <Animations animClass='fadeAnim'>
      <div>
      <h5>Vendor Dashboard</h5>
        <p>Show revenue, recent orders, top-selling products, and customer feedback.</p>
        <ul>
          <li>Manage your products and stock levels effortlessly</li>
          <li>Update product images, descriptions, and pricing</li>
          <li>Track, process, and fulfill orders quickly to keep customers satisfied</li>
        </ul>
      </div>
      </Animations>
      
      <div>
        <h5>Product Listing</h5>
        <p>Add accurate product details and high-quality images to attract customers</p>
        <p>Use specific categories and tags for easier customer searches.</p>
        <p>Optimize your product titles and descriptions for better visibility</p>
      </div>

      <div>
        <h5>Vendor Support</h5>
        <p>FAQ on common vendor issues, order processes, and inventory tips</p>
        <p>Reach out for any issues or questions, and our team will assist you</p>
        <p>Option to join forums or groups with other vendors for advice and insights</p>
      </div>

      <div>
        <h5>Vendor Registration Page</h5>
        <p>Welcome Message: “Join our network of trusted vendors! Sign up to reach thousands of customers.”</p>
        <ul>
          <li>Expand your reach with our platform</li>
          <li>Manage your inventory easily</li>
          <li>Receive insights on your sales and performance.</li>
          <li>Fields for personal information, business details, tax identification, and preferred payment methods.</li>
        </ul>
      </div>

      <Animations animClass='bounce'>
      <div>
      <h5>Vendor Dashboard</h5>
        <p>Show revenue, recent orders, top-selling products, and customer feedback.</p>
        <ul>
          <li>Manage your products and stock levels effortlessly</li>
          <li>Update product images, descriptions, and pricing</li>
          <li>Track, process, and fulfill orders quickly to keep customers satisfied</li>
        </ul>
      </div>
      </Animations>

      <div>
        <h5>Product Listing</h5>
        <p>Add accurate product details and high-quality images to attract customers</p>
        <p>Use specific categories and tags for easier customer searches.</p>
        <p>Optimize your product titles and descriptions for better visibility</p>
      </div>
      
      <div>
        <h5>Vendor Support</h5>
        <p>FAQ on common vendor issues, order processes, and inventory tips</p>
        <p>Reach out for any issues or questions, and our team will assist you</p>
        <p>Option to join forums or groups with other vendors for advice and insights</p>
      </div>
    </div>
  )
}

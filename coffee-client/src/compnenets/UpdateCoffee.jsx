import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateCoffee = () => {
    const  {
       _id, name,chef,taste,supplier,quantity,imgURL
    } =useLoaderData();
    const handleUpdate = (e) => {
        // const notify=()=>{
        //     toast('🦄 Wow so easy!', {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "light",
        //         });
        // }

        e.preventDefault()
        const form = e.target;
            const name= form.name.value;
            const  chef= form.chef.value;
            const taste = form.taste.value;
            const  supplier= form.supplier.value;
            const quantity= form.quantity.value;
            const imgURL = form.imgURL.value;

            const coffee= {
                name,chef,taste,supplier,quantity,imgURL
            }
            // console.log(coffee)
            fetch(`http://localhost:5000/updateCoffee/${_id}`,{
                method:"PUT",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(coffee)
            })
            .then(res=>res.json())
            .then(data=>{console.log(data);
                if(data.modifiedCount >0)
              {  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Coffee has been Updated",
                    showConfirmButton: false,
                    timer: 1500
                  });}
                //   form.reset();

    })}
            
    return (
        <div>

        <Link to='/'><button className='btn'> back to home</button></Link>
        <h1 className='text-4xl font-bold'>Update Coffees</h1>
        <form className='w-1/3 border mx-auto space-y-3 p-4' onSubmit={handleUpdate}>
            <label htmlFor="name">
                <p>name
                </p>
            </label>
            <input defaultValue={name} required className='border w-full p-3  rounded-lg' type="text" name="name" id="name" />
            <br />
            <label htmlFor="">
                <p>chef
                </p>
            </label>
            <input  required defaultValue={chef} className='border w-full p-3  rounded-lg' type="text" name="chef" id="chef" />
            <br />
            <label htmlFor="quantity">
                <p>quantity
                </p>
            </label>
            <input  defaultValue={quantity} required className='border w-full p-3  rounded-lg' type="text" name="quantity" id="quantity" />
            <br />
            <label htmlFor="supplier">
                <p>supplier
                </p>
            </label>
            <input defaultValue={supplier}  required className='border w-full p-3  rounded-lg' type="text" name="supplier" id="supplier" />
            <br />
            <label htmlFor="taste">
                <p>taste
                </p>
            </label>
            <input  defaultValue={taste} required className='border w-full p-3  rounded-lg' type="text" name="taste" id="taste" />
            <br />
            <label htmlFor="imgURL">
                <p>Image URL
                </p>
            </label>
            <input   defaultValue={imgURL}className='border w-full p-3  rounded-lg' type="text" name="imgURL" id="imgURL" />
            <br />
            <button className='btn w-full text-white bg-orange-950' type='submit'> Add Coffe</button>

        </form>
    </div>
    );
};

export default UpdateCoffee;
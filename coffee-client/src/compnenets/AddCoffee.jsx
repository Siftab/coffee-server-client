import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const AddCoffee = () => {
    const handleADD = (e) => {
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
            console.log(coffee)
            fetch('http://localhost:5000/addCoffe',{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(coffee)
            })
            .then(res=>res.json())
            .then(data=>{console.log(data);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Coffee has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  form.reset();

    })
            
    }
    return (
        <div>

            <Link to='/'><button className='btn'> back to home</button></Link>
            <h1 className='text-4xl font-bold'>Add Coffees</h1>
            <form className='w-1/3 border mx-auto space-y-3 p-4' onSubmit={handleADD}>
                <label htmlFor="name">
                    <p>name
                    </p>
                </label>
                <input required className='border w-full p-3  rounded-lg' type="text" name="name" id="name" />
                <br />
                <label htmlFor="">
                    <p>chef
                    </p>
                </label>
                <input required className='border w-full p-3  rounded-lg' type="text" name="chef" id="chef" />
                <br />
                <label htmlFor="quantity">
                    <p>quantity
                    </p>
                </label>
                <input required className='border w-full p-3  rounded-lg' type="text" name="quantity" id="quantity" />
                <br />
                <label htmlFor="supplier">
                    <p>supplier
                    </p>
                </label>
                <input required className='border w-full p-3  rounded-lg' type="text" name="supplier" id="supplier" />
                <br />
                <label htmlFor="taste">
                    <p>taste
                    </p>
                </label>
                <input required className='border w-full p-3  rounded-lg' type="text" name="taste" id="taste" />
                <br />
                <label htmlFor="imgURL">
                    <p>Image URL
                    </p>
                </label>
                <input className='border w-full p-3  rounded-lg' type="text" name="imgURL" id="imgURL" />
                <br />
                <button className='btn w-full text-white bg-orange-950' type='submit'> Add Coffe</button>

            </form>
        </div>
    );
};

export default AddCoffee;
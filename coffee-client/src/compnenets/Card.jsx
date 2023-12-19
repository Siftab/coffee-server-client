import React from 'react';
import { TbListDetails } from 'react-icons/tb'
import { MdDelete } from 'react-icons/md'
import { FaRegEdit } from "react-icons/fa"
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Card = ({ props, setData, data  }) => {
    const {
        _id, name, chef, taste, supplier, quantity, imgURL
    } = props;
    // const {{ setData, data } }= func1;
    const handleDelete = (id) => {

        console.log(id,data)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                //   Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                //   });
                fetch(`http://localhost:5000/coffee/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(info => {
                        console.log(info);
                        if (info.deletedCount > 0) {
                            const remainings = data.filter(aData=>aData._id!==id);
                            setData(remainings)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    })
            }
        });

    }
    
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                <div className="flex  w-full justify-between ">
                    <div className='md:mt-10 border'> <h2 className="card-title">{name}</h2>
                        <p>Chef:{chef}</p>
                        <p>Quantity: {quantity}</p></div>
                    <div className=" flex flex-col justify-center space-y-4">
                        <button className="btn  bg-blue-500"><TbListDetails /></button>
                        <button className='btn bg-red-600 text-white' onClick={() => handleDelete(_id)}><MdDelete /></button>
                        <Link to={`/updateCoffee/${_id}`}><button className='btn bg-green-500 text-white'><FaRegEdit /></button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
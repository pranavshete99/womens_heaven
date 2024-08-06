import { Link, useNavigate } from "react-router-dom"
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from "react";

export default function RegisterPage(){

    const [submitting, setSubmitting] = useState(false);
    const {register, control, formState, handleSubmit} = useForm();
    const {errors} = formState;

    const navigate = useNavigate();
    
    const onSubmit = async (data) => {
        try{
            setSubmitting(true);
            const response = await fetch('http://localhost:7000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            });

            if(response.ok){
                setSubmitting(false);
                alert('Registration Successful!');
                navigate('/login');
            }
            else{
                setSubmitting(false);
                alert('Registration Failed!', response.status);
            }
        }
        catch(error){
            setSubmitting(false);
            alert('Registration Failed!', error);
            console.log('Registration Failed', error);
        }
    }

    return (
        <>
            <div className="mt-4 grow flex items-center justify-around mb-4">
                <div className="mb-64">
                    <h1 className="text-4xl text-center mb-4">Register</h1>
                    <form action="" className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="Utkarsh Patil" name="name" id="name" {...register('name')} />
                        {/* <p className="text-red w-full">{errors?.name}</p> */}
                        <input type="email" placeholder="your@email.com" name="email" id="email" {...register('email')} />
                        {/* <p className="text-red w-full">{errors?.email}</p> */}
                        <input type="password" placeholder="password" name="password" id="password" {...register('password')} />
                        {/* <p className="text-red">{errors?.password}</p> */}
                        <button type="submit" className="primary">Register</button>
                        <div className="text-center py-2 text-gray-500">Already a member? <Link className="underline text-black" to='/login'>Login</Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}
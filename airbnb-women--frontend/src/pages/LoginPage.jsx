import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";

export default function LoginPage(){

    const {register, handleSubmit} = useForm();

    const [redirect, setRedirect] = useState(false);

    const {setUser} = useContext(UserContext);

    const onSubmit = async (data) => {
        try{
            const response = await fetch('http://localhost:7000/api/user/login', {
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            });

            const res_data = await response.json();

            console.log(res_data);

            if(response.ok){
                console.log('Login Successfull!', response.status);
                alert(res_data.message);
                setUser(res_data.data.user);
                localStorage.setItem('token', res_data.data.accessToken);
                setRedirect(true);
            }
            else{
                alert('Login Failed!');
                console.log('Login Failed!', error);
            }
        }
        catch(error){
            alert('Login Failed!');
            console.log('Login Failed!', error);
        }
    }

    if(redirect){
        return <Navigate to={'/account'} />
    }

    return (
        <>
            <div className="mt-4 grow flex items-center justify-around mb-4">
                <div className="mb-64">
                    <h1 className="text-4xl text-center mb-4">Login</h1>
                    <form action="" className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" placeholder="your@email.com" name="email" id="email" {...register('email', {
                            required: true,
                        })} />
                        <input type="password" placeholder="password" name="password" id="password" {...register('password', {
                            required: true
                        })} />
                        <button className="primary" type="submit">Login</button>
                        <div className="text-center py-2 text-gray-500">Don't have an account yet? <Link className="underline text-black" to='/register'>Register now</Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}
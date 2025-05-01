import { useEffect } from "react";
import { useFetch } from "../hook/useFetch"
import { useNavigate } from "react-router-dom";

export const WaitForServer = () => {
    const navigate=useNavigate();
    const {fetchData,resp,error}=useFetch();

    useEffect(()=>{
        fetchData('/',"GET");
        if(resp){
            navigate('/start');
        }
    },[resp])
    useEffect(()=>{
        if(error){
            fetchData('/',"GET");
        }
    },[error])
    return (<>
        <div className='flex space-x-2 flex-col justify-center items-center bg-gray-800 h-screen gap-y-4 '>
            <div className="flex gap-x-3">
                <div className='h-8 w-8 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-8 w-8 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-8 w-8 bg-gray-400 rounded-full animate-bounce'></div>
            </div>
            <div className="w-screen h-fit flex flex-col justify-center items-center">
                <p className="text-2xl text-white">Server Deployed On ReRender</p>
                <p className="text-2xl text-white">Wait</p>
                <p className="text-2xl text-white">Till server Get Started</p>
            </div>
        </div>

    </>)
}
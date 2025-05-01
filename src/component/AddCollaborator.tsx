import { useEffect, useState } from "react"
import { CgClose } from "react-icons/cg"
import { IoPersonAdd } from "react-icons/io5"
import { noteInterface } from "./CreateNote";
import  useDebounce  from "../hook/useDebounce";
import { useFetch } from "../hook/useFetch";
import { Loader } from "../loader/loader";

export const AddCollaborator = ({setNote,note}:{setNote:React.Dispatch<React.SetStateAction<noteInterface>>,note:noteInterface}) => {
    const [search,setSearch]=useState("");
    const [result,setResult]=useState<any[]>([]);
    const [colaborators,setColaborators]=useState<{email:string,_id:string}[]>([]);
    const {fetchData,resp,loading}=useFetch();

    //handeler
    
    //useFetch
    useEffect(()=>{
        setNote({...note,colaborators:colaborators.map((item:{email:string,_id:string}):string=>item._id)})
    },[colaborators])
    useEffect(()=>{
        if(search.length>0){
            useDebounce(()=>{
                fetchData(
                    "/api/user/users",
                    "POST",
                    {
                        query:search
                    }
                )
            },1000)
        }
    },[search])
    useEffect(()=>{
        if(resp){
            setResult(resp.users);
        }
    },[resp])
    return <div className="h-fit w-full p-2 flex flex-col  bg-gray-500 rounded-md">
        <div className="h-10 w-full px-2 rounded-md bg-gray-700 flex justify-start items-center gap-x-5">
            <IoPersonAdd className="text-white h-10 w-10" />
            <input type="text"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                placeholder="Add Collaborator"
                className="bg-transparent text-white outline-none max-w-32" />
           <div className="w-full flex justify-between"> <div></div>{loading&&<Loader/>}</div>
        </div>
        <div style={{display:result.length>0&&search.length>0?"block":"none"}} className="h-fit w-full ">
            {result.map((item:any,index:number)=>{
                return <div key={index} 
                            onClick={()=>setColaborators([...colaborators,item])}
                            className="h-full w-full bg-gray-500 text-white text-sm mx-auto px-2 py-1 flex gap-x-2 cursor-pointer">{item.email}
                </div>
            })}
        </div>
        <div className="h-fit w-fit grid grid-cols-2 gap-y-2">
        {colaborators.map((item:any,index:number)=>{
                return <div key={index} className="h-fit w-fit rounded-md bg-white text-sm mx-1 px-2 py-0 flex gap-x-2 ">{item.email}
                <button
                onClick={()=>setColaborators(colaborators.filter((subItem:any)=>subItem.email!==item.email))}
                ><CgClose/></button>
                </div>
            })}
        </div>
    </div>
}

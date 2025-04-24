import { useEffect, useRef, useState } from "react"
import { useFetch } from "../hook/useFetch";
import useDebounce from "../hook/useDebounce";
import { ShowEditNoteAtom } from "../store/atom";
import { useSetRecoilState } from "recoil";
import { useClickOutside } from "../hook/onClickoutside";

export const Navbar = () => {
    const [search,setSearch]=useState<string>("");
    const [suggestions,setSuggestions]=useState<string[]>([]);
    const [email,setEmail]=useState<string>("");
    const searchFetch=useFetch();
    const showEditNote=useSetRecoilState(ShowEditNoteAtom)
    const showEditNoteHandeler=(id:string)=>{
        showEditNote({show:true,id:id})
        setSuggestions([]);
    }
    const {fetchData,resp,error,loading}=useFetch();
    const logOut=useFetch();
    const logoutHandeler=()=>{
        logOut.fetchData(`/api/user/logout`, "POST")
    }
    //refs
    const divRef=useRef<HTMLDivElement>(null);
    const logoutRef=useRef<HTMLDivElement>(null);
    //kooks

    //custom hooks
 
    useClickOutside(()=>{
        setSuggestions([]);
    },[divRef])

    //useEffect
    useEffect(()=>{
        fetchData(`/api/user/userEmail`, "POST")
    },[])
    useEffect(()=>{
        if(logOut.resp){
            window.location.href="/login"
        }
    },[logOut.resp])

    useEffect(()=>{
        console.log(resp)
        if(resp){
            setEmail(resp.user.email)
        }
    },[resp])
    useEffect(()=>{
        console.log(search)
        if(search.length>0){
            useDebounce(()=>{
                searchFetch.fetchData(`/api/notes/suggestions`, "POST",{query:search})
            },1500)
        }
    },[search])
    useEffect(()=>{
        console.log(searchFetch.resp)
        if(searchFetch.resp){
            setSuggestions(searchFetch.resp.suggestions)
        }
    },[searchFetch.resp])


    return <div className="h-10 w-full flex justify-between py-2 px-10">
        <div className="text-white font-bold text-2xl mr-5 ">Keep</div>
        <div  className="w-2/3">
            <input type="text"
                value={search}
                onChange={(e)=>{
                    setSearch(e.target.value)
                }}
                placeholder="Search"
                className="w-2/3 lg:w-1/2 h-10 rounded-md pl-10 bg-gray-700 
                text-white focus:outline-none" />
                <div ref={divRef} className={`relative top-1 right-0 h-10 w-2/3 lg:w-1/2  z-10 flex flex-col gap-y-1`}>
                    {suggestions.map((item:any,index)=>{
                        if(item?.title){
                            return <div key={index} onClick={()=>showEditNoteHandeler(item._id)} className={`text-white rounded-md p-2 bg-gray-500 font-bold cursor-pointer`}>{item.title}</div>
                        }
                    })}
                </div>
        </div>
        <div ref={logoutRef} className="text-white h-full w-fit flex justify-center items-center ">
            <div className="text-white font-bold text-xs px-2 my-auto">{email}</div>
            <div 
                onClick={logoutHandeler}
                className="text-red-300 px-2 py-2 my-auto bg-gray-700 rounded-md cursor-pointer">{loading?"Logging Out...":"Logout"}</div>
        </div>

    </div>
}

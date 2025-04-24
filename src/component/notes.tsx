import { useEffect, useState } from "react";
import { useFetch } from "../hook/useFetch";
import Note  from "./note";
import {  useRecoilValue } from "recoil";
import { createNoteAtom } from "../store/atom";
import { useNavigate } from "react-router-dom";

export interface NoteIdsInterface{
    _id:string
}
export const Notes = () => {
    const [notesIds,setNotesIds]=useState<NoteIdsInterface[]>([]);
    const createNote=useRecoilValue(createNoteAtom)
    const navigate=useNavigate();
    const postIds=useFetch();
    const create=useFetch();
    const deletefetch=useFetch();
    const deleteHandeler=(id:string)=>{
      deletefetch.fetchData(`/api/notes/delete`, "POST", { id });
    }
    useEffect(()=>{
        postIds.fetchData("/api/notes/postIds", "POST",{});
    },[deletefetch.resp])
    useEffect(()=>{
      if(postIds.error){
        if(postIds.error.errCode==401){
          navigate("/login")
        }
      }
    },[postIds.error])
    useEffect(()=>{
      
        if(postIds.resp){
            setNotesIds(postIds.resp.note);
        }
    },[postIds.resp])
    useEffect(()=>{
      if(createNote){
//create note in database and set the id to the atom
     create.fetchData("/api/notes/create", "POST",{title:createNote.title,
                                                                  note:createNote.note,
                                                                  backgroundColor:createNote.backgroundColor,
                                                                  colaborators:createNote.colaborators});
      }
    },[createNote])
    useEffect(()=>{
        if(create.resp && create.resp.id){
            setNotesIds((prev)=>[...prev,{ _id: create.resp.id }])
        }
    },[create.resp])
        return (
            <div className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 px-2 overflow-auto scroll-hide">
              
              {notesIds?.map((item)=>{
                return <Note id={item._id.toString()} deleteHandeler={deleteHandeler}/>
              })}
            </div>
        )
    }

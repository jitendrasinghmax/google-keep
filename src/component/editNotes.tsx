import React, { useEffect, useRef, useState } from "react";
import { dark } from "../style/dark"
import { noteAtomFamily, ShowEditNoteAtom } from "../store/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useClickOutside } from "../hook/onClickoutside";

export interface NoteInterface{
    title:string,
    note:string,
}

export const EditNotes = ({id}:{id:string}) => {
    //atom
    const [note,setNote]=useRecoilState(noteAtomFamily(id))
    const setShowEditNote=useSetRecoilState(ShowEditNoteAtom)


    //state
        const [editNote, setEditNote] = useState<NoteInterface>({
            title: note.title,
            note: note.note,
        });


    //ref
    const NoteRef=useRef<HTMLTextAreaElement>(null)
    const mainPalelRef=useRef<HTMLDivElement>(null);


    //handelers
    const saveNoteHandeler=()=>{
        setNote({...note,title:editNote.title,note:editNote.note,update:true})
        setShowEditNote({show:false,id:id})
    }

    //hooks
    useClickOutside(()=>{
        setShowEditNote({show:false,id:id})
    },[mainPalelRef])

    //useeffect
    useEffect(() => {
        if (NoteRef.current) {
            NoteRef.current.style.height = "auto";
            NoteRef.current.style.height = `${NoteRef.current.scrollHeight}px`;
        }
    }, [editNote]);

    
    return (
        <div ref={mainPalelRef} className={`w-1/2 border-2 ${dark.border} 
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${dark.bg}
        rounded-md p-2`}>
            <input type="text"
                   value={editNote.title}
                   onChange={(e)=>setEditNote({...editNote,title:e.target.value})}
                    placeholder="Title"
                   className={`w-full h-12 py-2 px-4 bg-transparent  text-white font-extrabold text-2xl rounded-lg focus:outline-none `}
                   />
            <textarea ref={NoteRef}
                value={editNote.note}
                onChange={(e)=>setEditNote({...editNote,note:e.target.value})}
                placeholder="Note"
                className={`w-full h-12 py-2 px-4 bg-transparent  text-white font-bold rounded-lg focus:outline-none `}
            />
            <div className="flex justify-between px-6">
                <div></div><button 
                                onClick={saveNoteHandeler}
                                className="bg-white text-gray-700 px-4 py-1 rounded-md font-semibold">Save</button>
            </div>

        </div>
    )
}

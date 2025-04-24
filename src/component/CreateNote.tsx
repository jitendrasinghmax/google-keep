import { useRef, useState, useEffect } from "react";
import { useClickOutside } from "../hook/onClickoutside";
import { useSetRecoilState } from "recoil";
import { createNoteAtom } from "../store/atom";
import {AddCollaborator} from "./AddCollaborator";

export interface noteInterface{
    title:string,
    note:string,
    backgroundColor:string,
    id:string,
    posted:boolean,
    colaborators:string[]
}
const CreateNote = () => {
    //states
    const [note, setNote] = useState<noteInterface>({
        title:"",
        note:"",
        backgroundColor:"#111827",
        id:"",
        posted:true,
        colaborators:[]
    });
    const [showNoteArea,setShowNoteArea]=useState(false);
    
    //atom
    const setCreateNote=useSetRecoilState(createNoteAtom)
    //refs
    const titleref = useRef<HTMLTextAreaElement>(null);
    
    const noteDivRef=useRef<HTMLDivElement>(null);

    //hooks
    useClickOutside(()=>{
        setShowNoteArea(false)
        if(note.title.length>0||note.note.length>0){
            
            setCreateNote({
                title:note.title,
                note:note.note,
                backgroundColor:note.backgroundColor,
                colaborators:note.colaborators
            })
            setNote({
                title:"",
                note:"",
                backgroundColor:"#111827",
                id:"",
                posted:true,
                colaborators:[]
            })
        }
    },[noteDivRef])

    //useEffect
    useEffect(() => {
        if (titleref.current) {
            titleref.current.style.height = "auto";
            titleref.current.style.height = `${titleref.current.scrollHeight}px`;
        }
    }, [note]);
    
    return (
        <div ref={noteDivRef} 
         className={`h-fit w-4/5 sm:w-1/2 mx-auto mt-10 p-4  bg-gray-800 rounded-lg  transition-all duration-300`}>
            <textarea
                onFocus={()=>setShowNoteArea(true)}
                className={`w-full h-12 py-2 px-4 text-xl bg-transparent  text-white font-bold rounded-lg focus:outline-none `}
                ref={titleref}
                value={note.title}
                onChange={(e) => setNote((prev)=>{
                    return{
                        ...prev,
                        title:e.target.value
                    }
                })}
                placeholder="Title..."
                style={{
                    resize: 'none',
                    overflow: 'hidden',
                }}
            />
           <div style={{display:showNoteArea ? "block" : "none"}} className="h-fit">
           <textarea
                className={`w-full min-h-[50px] p-4 bg-transparent text-white font-light rounded-lg focus:outline-none`}
                ref={titleref}
                value={note.note}
                onChange={(e)=>{
                    return setNote((prev)=>{
                        return{
                            ...prev,
                            note:e.target.value
                        }
                    })
                }}
                placeholder="Take a note..."
                style={{
                    resize: 'none',
                    overflow: 'hidden',
                }}
            />
            {/*tool bar*/}
            <div  className="h-fit">
                {/* <div 
                onClick={()=>setShowColorPicker((prev)=>!prev)}
                ref={colorPickerRef} 
                className="text-xl"><IoIosColorPalette className="text-white"/>
                <div style={{visibility:showColorPicker ? "visible" : "hidden",right:position.y+"px"}}
                  className={`  w-52 h-14 border-2 ${dark.border} py-2 gap-x-3 rounded-md flex  justify-center`}>
                    {["111827","3F4F44","1D1616","070F2B"].map((color,index)=>{
                        return <div key={index} 
                                onClick={()=>setNote((prev)=>{
                                    return {...prev,backgroundColor:"#"+color}
                                })}
                                className={`w-8 h-8  rounded-full border-2 ${dark.border}`} 
                                style={{backgroundColor:"#"+color}}></div>
                    })}
                  </div>
                </div> */}
                
                <div className="w-full">
                        <AddCollaborator note={note} setNote={setNote}/>
                    </div>
            </div>
           </div>
        </div>
    );
};

export default CreateNote;

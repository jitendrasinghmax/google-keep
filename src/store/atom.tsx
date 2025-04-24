import { atom, atomFamily, selectorFamily } from "recoil";
import { useStoreFetch } from "../hook/useStoreFetch";
export interface noteInterface{
  note:string,
  title:string,
  backgroundColor:string,
  post:boolean,
  id:string,
  colaborators:string[],
  owner:string,
  update:boolean
}
export interface createNoteInteface{
  title:string,
  note:string,
  backgroundColor:string,
  colaborators:string[]
}
export interface editNoteInterface{
  show:boolean,
  id:string
}
export const ShowEditNoteAtom=atom<editNoteInterface>({
  key:"ShowEditNoteAtom",
  default:{
    show:false,
    id:""

  }
})
export const createNoteAtom=atom<createNoteInteface|null>({
  key:"createNoteAtom",
  default:null
})
export const noteAtomFamily = atomFamily<noteInterface, string>({
  key: "noteAtomFamily",
  default: () => ({
        id:"",
        title:"",
        note:"",
        backgroundColor:"",
        post:false,
        colaborators:[],
        owner:"",
        update:false
      }
  )
})
export interface noteSelectorInterface{
  
}
export const noteSelectorFamily=selectorFamily<noteInterface,string>({
  key:"noteSelectorFamily",
  get:(id:string)=>async({get})=>{
    const note:noteInterface=get(noteAtomFamily(id));
    if(note.update==true){
      const resp=await useStoreFetch("/api/notes/update","POST",{
        id:id,
        title:note.title,
        note:note.note,
        backgroundColor:note.backgroundColor,
        colaborator:note.colaborators,
      });
      console.log(resp);
      return resp.note;
    }else return {
      id:note.id,
      title:note.title,
      note:note.note,
      backgroundColor:note.backgroundColor,
      colaborator:note.colaborators,
    }
  }
})

export const deleteNoteAtom=atom<boolean>({
  key:"deleteNoteAtom",
  default:false
})

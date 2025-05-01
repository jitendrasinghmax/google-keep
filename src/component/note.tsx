import { dark } from "../style/dark"
import { MdDelete } from "react-icons/md"
import { useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { ShowEditNoteAtom, noteAtomFamily, noteSelectorFamily } from "../store/atom"
import React, { useEffect } from "react"
import { useFetch } from "../hook/useFetch"

export type notePropsInterface = {
    id: string,
}
const Note = ({ id, deleteHandeler }: { id: string, deleteHandeler: (id: string) => void }) => {
    const setNote = useSetRecoilState(noteAtomFamily(id));
    const note = useRecoilValueLoadable(noteSelectorFamily(id));
    const showEditNote = useSetRecoilState(ShowEditNoteAtom)
    const { fetchData, resp, loading } = useFetch();
    useEffect(() => {
        if (id) {
            //fetch note from database and set it to the atom
            fetchData(`/api/notes/post`, "POST", { id });
        }

    }, [])
    useEffect(() => {
        if (resp) {
            setNote({
                id: "",
                title: resp.note.title,
                note: resp.note.note,
                backgroundColor: resp.note.backgroundColor,
                post: false,
                colaborators: resp.note.colaborators,
                owner: "",
                update: false
            })
        }
    }, [resp])
    if (note.state === "loading" || loading == true) {
        return <div className={`w-full h-32 border-2 flex flex-col flex-justify-center items-center  ${dark.border} rounded-lg animate-pulse p-4 space-y-4 bg-gray-800 `}>

            <div className="h-1/4 bg-gray-700 rounded w-full"></div>
            <div className="h-full bg-gray-700 rounded w-full"></div>

        </div>

    }
    else if (note.state === "hasValue") return <div
        onClick={() => showEditNote({ show: true, id: id })}
        style={{ backgroundColor: note.contents.backgroundColor }}
        key={crypto.randomUUID()}
        className={`w-full h-32 border-2 overflow-hidden ${dark.border} rounded-md p-2 cursor-pointer relative`}>
        <p className="text-gray-400 font-bold text-lg ">{note.contents.title}</p>
        <p className="text-gray-400 h-fit mt-3">{note.contents.note}</p>
        <div
            className="flex justify-between text-gray-300 cursor-pointer text-2xl absolute bottom-2 right-2"><div></div>
            <div onClick={(e) => {
                e.stopPropagation();
                deleteHandeler(id);

            }}><MdDelete /></div></div>
    </div>
    else return <div className="w-full h-full flex flex-justify-center items-center">
        <span className="text-white text-2xl font-bold">Error</span>
    </div>
};

export default React.memo(Note);
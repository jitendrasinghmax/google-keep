import { IoIosNotificationsOutline } from "react-icons/io"
import { dark } from "../style/dark"
import { FaStickyNote } from "react-icons/fa"
import { IoTrashBin } from "react-icons/io5"
import { useMedia } from "react-use"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"

export const Sidebar = () => {
    const isMobile = useMedia('(max-width: 1024px)');
    const [style,setStyle] = useState("")
    useEffect(()=>{
        if(isMobile){
            setStyle("justify-center items-center")
        }
        else setStyle("p-2 pl-6")
    },[isMobile])
    return (
        <div className={`h-full w-full border-r-2 ${dark.border}  px-2 pt-4 flex flex-col gap-y-4`}>
            <NavLink to="/"
                className={`h-12 flex    ${style}  text-2xl gap-x-5 text-gray-400 hover:bg-gray-700 rounded-lg`}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "white" : "gray",
                        backgroundColor: isActive ? "#5F6973" : "transparent"
                    }
                }}>
                <FaStickyNote />
                {isMobile==false?<span className="text-sm font-semibold my-auto">Note</span>:""}
            </NavLink>
            <NavLink to="/reminder"
                className={`h-12 flex  items-center ${style}  text-2xl gap-x-5 text-gray-400 hover:bg-gray-700 rounded-lg`}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "white" : "gray",
                        backgroundColor: isActive ? "#5F6973" : "transparent"
                    }
                }}>
                <IoIosNotificationsOutline />
                {isMobile==false?<span className="text-sm font-semibold my-auto">Trans</span>:""}
            </NavLink>
            <NavLink to="/trans"
                className={`h-12 flex  items-center ${style}  text-2xl gap-x-5 text-gray-400 hover:bg-gray-700 rounded-lg`}
                style={({ isActive }) => {
                    return {
                        color: isActive ? "white" : "gray",
                        backgroundColor: isActive ? "#5F6973" : "transparent"
                    }
                }}>
                <IoTrashBin />
                {isMobile==false?<span className="text-sm font-semibold my-auto">Trans</span>:""}
            </NavLink>
        </div>
    )
}

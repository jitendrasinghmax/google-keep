import { useRecoilValue } from "recoil";
import CreateNote from "../component/CreateNote";
import { Sidebar } from "../component/sidebar";
import { dark } from "../style/dark";
import { Notes } from "../component/notes";
import { Navbar } from "../component/navbar";
import { EditNotes } from "../component/editNotes";
import { ShowEditNoteAtom } from "../store/atom";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { Toaster } from "react-hot-toast";

const AppLayout=()=>{
    const ShowEditNote = useRecoilValue(ShowEditNoteAtom)
    return <>
    <Toaster/>
    <div className="h-screen overflow-hidden bg-gray-900 p-x-5">
        <div className={`w-full h-16 border-b-2 ${dark.border}`}><Navbar /></div>
        <div className="h-screen w-full flex">
            <div className="h-full w-16 sm:w-40">
                <Sidebar />
            </div>
            <div className="flex flex-col gap-7 w-full overflow-auto scrollbar-hide relative">
                {ShowEditNote.show && <EditNotes id={ShowEditNote.id} />}
                <Outlet/>
            </div>
        </div>
    </div>
    </>
}

export const Layout = () => {
    // Access Recoil state
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/" element={<AppLayout/>}>
                <Route path='/' element={<><CreateNote/><Notes/></>}/>
                <Route path='/reminder' element={<div>Reminder</div>}/>
                <Route path='/trans' element={<div>trans</div>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

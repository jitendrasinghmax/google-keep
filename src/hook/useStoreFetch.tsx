
export const useStoreFetch=async (url:string,method:"GET"|"POST",body:any)=>{
    const myHeadder=new Headers();
    myHeadder.append("Content-Type","application/json");
    const myInit:RequestInit={
        method:method,
        headers:myHeadder,
        body:JSON.stringify(body),
        credentials: 'include'
    }
    const resp=await fetch(`${import.meta.env.VITE_BASE_URL}${url}`,myInit);
    const data=await resp.json();
    return data;
}



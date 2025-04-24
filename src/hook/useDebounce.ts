let timer:any;
const useDebounce=(func:()=>void,delay:number)=>{
    if(timer){
        clearTimeout(timer)
    }
    timer=setTimeout(()=>{
        func()
    },delay)
}
export default useDebounce;

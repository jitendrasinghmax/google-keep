import { useEffect, useState } from "react"
import toast from "react-hot-toast";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const useFetch = () => {
    const [resp, setResp] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)
    const notify = (msg: string) => toast.error(msg, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        }
    }
    )
    useEffect(() => {
        if (error) {
            notify(error.message)
        }
    }, [error])

    const fetchData = async (url: string, method: "GET" | "POST", body?: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, method == "GET" ? { method } : {
                method,
                body: JSON.stringify(body),
                headers: myHeaders,
                credentials: "include"
            });

            const data = await response.json();
            if (!data) {
                throw new Error("An error occurred");
            }
            if (response.status == 200) {
                setResp(data);
            }
            else if (response.status == 400) {
                setError({
                    message: data.message,
                    errCode: 400
                })
            }
            else if (response.status == 401) {
                setError({
                    message: data.message,
                    errCode: 401
                })
            }
            else if (response.status == 500) {
                setError({
                    message: data.message,
                    errCode: 500
                })
            }
            else {
                throw new Error("An error occurred");
            }
        } catch (err) {
            setError({ message: (err as Error).message });
        } finally {
            setLoading(false);
        }
    };
    return { fetchData, resp, error, loading }

}
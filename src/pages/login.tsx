import { useState, useEffect } from "react"
import { dark } from "../style/dark"
import { useFetch } from "../hook/useFetch"
import { useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"


export const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "example@gmail.com",
        password: "123456"
    })
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { fetchData, resp, loading } = useFetch()


    // Redirect if already logged in
   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        
        if (!credentials.email || !credentials.password) {
            setError("Please fill in all fields")
            return
        }
        
        fetchData("/api/user/login", "POST", {
            email: credentials.email,
            password: credentials.password
        })
    }

    //Process login response
    useEffect(() => {
        if (resp) {
            console.log(resp)
            if (resp.user) {
               navigate("/start");
            } else if (resp.error) {
                setError(resp.error)
            }
        }
    }, [resp])

    return (
        <div className={`min-h-screen w-full ${dark.bg} flex flex-col items-center gap-y-10 pt-20`}>
            <Toaster/>
            <h1 className="text-white text-4xl font-bold">Keep</h1>
            <div className={`w-2/3 md:w-1/2 lg:w-1/3 border-2 ${dark.border} rounded-lg p-6`}>
                <h2 className="text-white text-2xl font-semibold mb-6 text-center">Sign In</h2>
                
                {error && (
                    <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            className={`w-full p-2 rounded bg-gray-800 border ${dark.border} text-white focus:outline-none focus:border-blue-500`}
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className={`w-full p-2 rounded bg-gray-800 border ${dark.border} text-white focus:outline-none focus:border-blue-500`}
                            placeholder="Enter your password"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Logging in...' : 'Sign In'}
                    </button>
                    
                    <div className="mt-4 text-center">
                        <span className="text-gray-400">Don't have an account? </span>
                        <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    )
}
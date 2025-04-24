import { useState, useEffect } from "react"
import { dark } from "../style/dark"
import { useFetch } from "../hook/useFetch"
import { useNavigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"


export const Signup = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const { fetchData, resp, loading } = useFetch()


    // Redirect if already logged in
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }


const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")
    fetchData("/api/user/create", "POST", {email: user.email, password: user.password})   
}
    //Process signup response
    useEffect(() => {
        if (resp) {
            if (resp) {
                setSuccessMessage("Account created successfully! Redirecting to login...")
                setTimeout(() => {
                    navigate("/")
                }, 2000)
                
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
                <h2 className="text-white text-2xl font-semibold mb-6 text-center">Create Account</h2>
                
                {error && (
                    <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}
                
                {successMessage && (
                    <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-500 px-4 py-2 rounded mb-4">
                        {successMessage}
                    </div>
                )}
                
                <form onSubmit={handelSubmit}>

                    
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className={`w-full p-2 rounded bg-gray-800 border ${dark.border} text-white focus:outline-none focus:border-blue-500`}
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className={`w-full p-2 rounded bg-gray-800 border ${dark.border} text-white focus:outline-none focus:border-blue-500`}
                            placeholder="Create a password"
                        />
                    </div>
                    
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-400 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            className={`w-full p-2 rounded bg-gray-800 border ${dark.border} text-white focus:outline-none focus:border-blue-500`}
                            placeholder="Confirm your password"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gray-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                    
                    <div className="mt-4 text-center">
                        <span className="text-gray-400">Already have an account? </span>
                        <a href="/login" className="text-blue-500 hover:underline">Sign In</a>
                    </div>
                </form>
            </div>
        </div>
    )
} 
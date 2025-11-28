import { useAuth } from "@/Providers/AuthProvider";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {

  const [email, setEmail] = useState("lyl.ball@workout.fr");
  const [password, setPassword] = useState("12345678");
  const {user, login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login && login(email, password)
  }
  
  useEffect(() => {
    if(user.status == "connected"){
      navigate("/")
    }
  }, [user])

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-bg text-text font-sans">
      <div className="w-full max-w-md p-8 bg-surface rounded-(--radius) shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-primary text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-muted mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-border rounded-(--radius) focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-text-muted mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-border rounded-(--radius) focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white hover:bg-accent transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-text-muted text-center">
          Don't have an account?{" "}
          <a href="#" className="text-primary font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
    </>
  )
}
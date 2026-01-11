import { useAuth } from "@/Provider/AuthProvider";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {

  const [email, setEmail] = useState<string>("lyl.ball@workout.fr");
  const [password, setPassword] = useState<string>("12345678");
  const { user, login, errorMessage } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }
  
  useEffect(() => {
    if(user.authenticated){
      navigate("/")
    }
  }, [user])

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-bg text-text font-sans">
      <div className="w-full max-w-md p-8 bg-surface rounded-(--radius) shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-primary text-center">
          Se connecter
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
          <div className="flex justify-center text-error">{errorMessage}</div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white hover:bg-accent transition-colors"
          >
            Se connecter
          </button>
        </form>

          <p className="mt-4 text-sm text-text text-center">
            <Link to="/register" className="font-semibold hover:underline">
              S'inscrire
            </Link>
          </p>
      </div>
    </div>
    </>
  )
}
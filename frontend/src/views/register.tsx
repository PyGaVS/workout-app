import { useAuth } from "@/Provider/AuthProvider";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {

  const [email, setEmail] = useState<string>("test@gmail.com");
  const [fullName, setFullName] = useState<string>("John Doe");
  const [password, setPassword] = useState<string>("12345678");
  const [confirmPassword, setConfirmPassword] = useState<string>("12345678");
  const [accessCode, setAccessCode] = useState<string>("HHHHHHHH");
  
  const { user, register, errorMessage } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
      register(email, password, confirmPassword, fullName, accessCode)
  }
  
  useEffect(() => {
    if(user.authenticated){
      navigate("/")
    }
  }, [user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-text font-sans">
      <div className="w-full max-w-md p-8 bg-surface rounded-(--radius) shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-primary text-center">
          S'inscrire
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
            <label className="block text-text-muted mb-1" htmlFor="full-name">
              Nom utilisateur
            </label>
            <input
              type="text"
              id="full-name"
              className="w-full px-4 py-2 border border-border rounded-(--radius) focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-text-muted mb-1" htmlFor="password">
              Mot de passe
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

          <div>
            <label className="block text-text-muted mb-1" htmlFor="confirm-password">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 border border-border rounded-(--radius) focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-text-muted mb-1" htmlFor="access-code">
              Code d'accès
            </label>
            <input
              type="password"
              id="access-code"
              className="w-full px-4 py-2 border border-border rounded-(--radius) focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              required
            />
          </div>

          <p className="text-error">{errorMessage}</p>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white hover:bg-accent transition-colors"
          >
            S'inscrire
          </button>
        </form>

        <p className="mt-4 text-sm text-text-muted text-center">
          Tu as déjà un compte?{" "}
          <a href="/login" className="text-primary font-semibold hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  )
}
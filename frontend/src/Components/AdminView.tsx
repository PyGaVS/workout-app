import { useAuth } from "@/Provider/AuthProvider";
import { use, useEffect, type PropsWithChildren } from "react"
import { useNavigate } from "react-router";
import AuthView from "./AuthView";

interface Props {
  children: React.ReactNode
  title: string 
}

export default function AdminView(props: PropsWithChildren<Props>){

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user.isAdmin) navigate("/") 
  }, [user])

  return <AuthView {...props} />

}
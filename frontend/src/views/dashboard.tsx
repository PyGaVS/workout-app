import type User from "@/api/models/User";
import DrawerView from "@/Components/DrawerView";
import { useAuth } from "@/Providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {

  const { user } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
      console.log("DASHBOARD", user)
      if(user.status == "disconnected"){
        navigate("/login")
      }
    }, [user])

  return (
    <DrawerView title="dashboard">
        <h1 className="text-blue-400">Dashboard</h1>
    </DrawerView>
  )
}
import type User from "@/api/models/User";
import DrawerView from "@/Components/DrawerView";
import { useAuth } from "@/Providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {

  const { user } = useAuth()

  return (
    <DrawerView title="dashboard">
        <h2 className="text-text">Hi {user.fullName} !</h2>
    </DrawerView>
  )
}
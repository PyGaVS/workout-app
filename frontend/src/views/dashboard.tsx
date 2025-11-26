import DrawerView from "@/Components/DrawerView";
import { useAuth } from "@/Providers/AuthProvider";

export default function Dashboard() {

  const { user } = useAuth()

  return (
    <DrawerView title="dashboard">
        <h2 className="text-text">Hi {user.fullName} !</h2>
    </DrawerView>
  )
}
import { LogOut, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { useAuth } from "@/Provider/AuthProvider";

export default function AppSidebar() {

    const { user, logout } = useAuth();

    const menuItems = [
        { label: 'Dashboard', ariaLabel: 'Dashboard', link: '/', icon: 'fa-solid fa-chart-line' },
        { label: 'History', ariaLabel: 'History', link: '/history', icon: 'fa-solid fa-calendar-check' }
    ];

    return (
        <Sidebar className="border-border">
            <SidebarHeader className="flex flex-row items-center w-full gap-1 cursor-pointer p-4">
                <img src="/logo.png" alt="Workout App Logo" className="w-1/5" />
                <h2 className="text-2xl font-bold"><span className="text-primary">Workout</span> app</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Workouts</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild className="text-text text-xl p-5 hover:bg-accent/70 font-semibold">
                                        <a href={item.link} aria-label={item.ariaLabel}> <i className={item.icon} /> {item.label}</a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarGroup>
                    <SidebarGroupLabel className="space-x-2"><User2 /> <span>{user.fullName}</span></SidebarGroupLabel>
                        <SidebarMenuItem className="flex flex-row items-center gap-2">
                            <SidebarMenuButton className="text-error" onClick={logout}>
                                <LogOut /> Sign out
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )
}
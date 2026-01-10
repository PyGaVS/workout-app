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
import { Link } from "react-router";
import type { MenuGroupItem } from "@/types/MenuGroupItem";

interface Props {
    menuItems: MenuGroupItem[];
}
export default function AppSidebar(props: Props) {

    const { user, logout } = useAuth();

    return (
        <Sidebar className="border-border">
            <SidebarHeader className="flex flex-row items-center w-full gap-1 cursor-pointer p-4">
                <img src="/logo.png" alt="Workout App Logo" className="w-1/5" />
                <h2 className="text-2xl font-bold"><span className="text-primary">Workout</span> app</h2>
            </SidebarHeader>
            <SidebarContent>
                {props.menuItems.map((group) => (
                    <SidebarGroup>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild 
                                        className="text-text text-xl p-5 hover:bg-secondary hover:text-surface font-semibold">
                                            <Link to={item.link} aria-label={item.ariaLabel}> 
                                                <i className={item.icon} style={{ color: "var(--accent)" }}/> {item.label}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
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
import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react'
import { useAuth } from '@/Provider/AuthProvider';
import { useNavigate } from 'react-router';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import AppSidebar from './AppSideBar';
import type { MenuGroupItem } from '@/types/MenuGroupItem';
import {AnimatedThemeToggler} from "@/Components/ui/animated-theme-toggler.tsx";

interface Props {
  children: React.ReactNode
  title: string
}

export default function AuthView(props: PropsWithChildren<Props>){

  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = React.useState<MenuGroupItem[]>([
    {
      label: "Workouts",
      items: [
          { label: 'Tableau de bord', ariaLabel: 'Tableau de bord', link: '/', icon: 'fa-solid fa-chart-line' },
          { label: 'Historique', ariaLabel: 'Historique', link: '/history', icon: 'fa-solid fa-calendar-check' },
      ]
    }
  ]);

  useEffect(() => {
    if(user.authenticated === false){
      navigate("/login")
    }

    if(user.isAdmin && !menuItems.find(group => group.label === "Backoffice")){
      setMenuItems([
        ...menuItems,
        {
            label: "Backoffice",
            items: [
                //{ label: 'Users', ariaLabel: 'Users', link: '/backoffice', icon: 'fa-solid fa-users' },
                { label: "Codes d'accès", ariaLabel: 'Access Codes', link: '/backoffice/access-codes', icon: 'fa-solid fa-key' }
            ]
        }
      ])
    }
  }, [user])

  return (
    <SidebarProvider>
      <AppSidebar menuItems={menuItems} />
        <div className='w-full flex flex-col items-center pointer-events-auto'>
            <div className="flex items-center pointer-events-auto w-full justify-between px-10 pt-5">
                <SidebarTrigger size='lg'/>
                <h1 className='!text-4xl xl:!text-6xl font-extrabold pb-1.5 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent'>{props.title}</h1>
                <AnimatedThemeToggler/>
            </div>
            <div className='flex-1 w-full m-5 px-5 py-2'>
                {props.children}
            </div>
        </div>
    </SidebarProvider>
  )
}
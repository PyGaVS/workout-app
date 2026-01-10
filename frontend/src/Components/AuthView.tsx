import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react'
import { useAuth } from '@/Provider/AuthProvider';
import { useNavigate } from 'react-router';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import AppSidebar from './AppSideBar';

interface Props {
  children: React.ReactNode
  title: string 
}

export default function AuthView(props: PropsWithChildren<Props>){

  const { user } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if(user.authenticated === false){
      navigate("/login")
    }
  }, [user])

  return (
    <SidebarProvider>
      <AppSidebar />
        <div className='w-full flex flex-col items-center pointer-events-auto pr-10'>
          <div className='w-full'><SidebarTrigger size='lg' /></div>
          <h1 className='text-5xl font-extrabold pb-1.5 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent'>{props.title}</h1>
          <div className='flex-1 w-full m-5 px-5 py-2'>    
            {props.children}
          </div>
        </div>
    </SidebarProvider>
  )
}
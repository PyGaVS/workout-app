import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react'
import StaggeredMenu from './StaggeredMenu/StaggeredMenu';
import { useAuth } from '@/Provider/AuthProvider';
import { useNavigate } from 'react-router';

interface Props {
  children: React.ReactNode
  title: string 
}

export default function DrawerView(props: PropsWithChildren<Props>){

  const { user } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user)
    if(user.status == "disconnected"){
      navigate("/login")
    }
  }, [user])

  const menuItems = [
    { label: 'Dashboard', ariaLabel: 'Overview', link: '/' },
    { label: 'History', ariaLabel: 'Last workouts', link: '/history' }
  ];

  return (
    <div className='flex flex-row h-screen'>
      <StaggeredMenu
        position="left"
        items={menuItems}
        socialItems={[]}
        displaySocials={true}
        displayItemNumbering={false}
        menuButtonColor="var(--text)"
        openMenuButtonColor="var(--text)"
        changeMenuColorOnOpen={true}
        colors={['var(--primary)', 'var(--secondary)']}
        logoUrl="/logo.png"
        accentColor="var(--accent)"
        isFixed
      />
      <div className='w-screen flex flex-col items-center pointer-events-auto pt-2'>
        <h1 className='text-5xl font-extrabold pb-1.5 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent'>{props.title}</h1>
        <div className='flex-1 w-screen m-5 px-5 py-2'>
          {props.children}
        </div>
      </div>
    </div>
  )
}
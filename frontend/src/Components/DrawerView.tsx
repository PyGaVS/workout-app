import React from 'react';
import type { PropsWithChildren } from 'react'
import StaggeredMenu from './StaggeredMenu/StaggeredMenu';

interface Props {
  children: React.ReactNode
  title: string 
}

export default function DrawerView(props: PropsWithChildren<Props>){

  const menuItems = [
    { label: 'Dashboard', ariaLabel: 'Overview', link: '/' },
    { label: 'History', ariaLabel: 'Last workouts', link: '/history' }
  ];
  return (
    <div className='flex flex-row justify-center h-screen'>
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
        logoUrl="/vite.svg"
        accentColor="var(--accent)"
        isFixed
      />
      <div>
        <h1 className='text-5xl font-extrabold pb-1.5 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent'>{props.title}</h1>
      </div>
    </div>
  )
}
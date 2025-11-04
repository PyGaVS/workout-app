import React from 'react';
import type { PropsWithChildren } from 'react'
import { NavLink } from "react-router";

interface Props {
  children: React.ReactNode
}

export default function NavBarView(props: PropsWithChildren<Props>){
  return (
    <div className='flex flex-row border-4 justify-start'>
      <nav className='border-2'>
        <NavLink to="">
          <div className=''>
            <p>Dashboard</p>
          </div>
        </NavLink>
      </nav>
      <div>
        {props.children}
      </div>
    </div>
  )
}
import React from 'react';
import type { PropsWithChildren } from 'react'
import { NavLink } from "react-router";

interface Props {
  children: React.ReactNode
}

export default function DrawerView(props: PropsWithChildren<Props>){
  return (
    <div className='flex flex-row justify-start'>
      <nav className='border-2'>
        <NavLink to="/">
          <div className=''>
            <p>Dashboard</p>
          </div>
        </NavLink>
        <NavLink to="history">
          <div className=''>
            <p>History</p>
          </div>
        </NavLink>
      </nav>
      <div>
        {props.children}
      </div>
    </div>
  )
}
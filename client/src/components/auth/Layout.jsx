import { useState } from 'react';
import { Outlet } from 'react-router-dom';


export default function Layout() {
    return (
        <main className=''>
            <div className=''>
                <Outlet />
            </div>
        </main>
    )
}

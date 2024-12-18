import React, { useState } from 'react'
import { Dices, Gamepad2, Joystick, LogIn, LogOut, Settings, SquarePen, User, Users } from 'lucide-react'

const Navbar = () => {
    const [auth, setAuth] = useState(false)

  return (
    <div className='navbar bg-base-200'>
        <div className='navbar-start'>
            <a href='/' className='btn btn-ghost hover:bg-base-100'><Gamepad2/>Logo</a>
        </div>
        <div className='navbar-center hidden lg:flex'>
            <ul className='menu menu-horizontal px-1'>
                <li>
                    <details>
                        <summary tabIndex={0}>Games</summary>
                        <ul className='p-2'>
                            <li><a><Joystick size={20}/>Arcade</a></li>
                            <li><a><Users size={20}/>Online</a></li>
                        </ul>
                    </details>
                </li>
                <li><a>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke='currentColor' strokeWidth={0} strokeLinecap='round' strokeLinejoin='round'>
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5ZM13.3272 7.6912C14.3183 7.20148 15 6.18034 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.18034 9.68167 7.20148 10.6728 7.6912L8.50616 13.4689L5.06585 11.1754C5.64125 10.6288 6 9.85629 6 9C6 7.34315 4.65685 6 3 6C1.34315 6 0 7.34315 0 9C0 10.3768 0.927457 11.537 2.19169 11.8898L3.96922 19L3.34051 21.5149C3.02494 22.7772 3.97966 24 5.28079 24H18.7192C20.0204 24 20.9751 22.7772 20.6595 21.5149L20.0308 19L21.8083 11.8898C23.0725 11.537 24 10.3768 24 9C24 7.34315 22.6569 6 21 6C19.3431 6 18 7.34315 18 9C18 9.85629 18.3588 10.6288 18.9341 11.1754L15.4938 13.4689L13.3272 7.6912ZM20.9996 10C20.9997 10 20.9999 10 21 10C21.5523 10 22 9.55228 22 9C22 8.44772 21.5523 8 21 8C20.4477 8 20 8.44772 20 9C20 9.55214 20.4475 9.99976 20.9996 10ZM4 9C4 9.55214 3.55252 9.99976 3.00044 10H3C2.44772 10 2 9.55228 2 9C2 8.44772 2.44772 8 3 8C3.55228 8 4 8.44772 4 9ZM5.28079 22L5.78078 20H18.2192L18.7192 22H5.28079ZM19.4025 13.2668L18.2192 18H5.78078L4.59749 13.2668L8.4453 15.8321C8.69922 16.0013 9.01654 16.0454 9.30697 15.9517C9.59741 15.858 9.82918 15.6369 9.93633 15.3511L12 9.848L14.0637 15.3511C14.1708 15.6369 14.4026 15.858 14.693 15.9517C14.9835 16.0454 15.3008 16.0013 15.5547 15.8321L19.4025 13.2668Z" fill="currentColor"/></svg>
                    Chess</a></li>
                <li><a><Dices size={20}/>Backgammon</a></li>
            </ul>
        </div>
        <div className='navbar-end'>
            <div className='dropdown dropdown-hover'>
                <div tabIndex={0} role='button' className='btn btn-ghost'><User/>Account</div>
                <ul tabIndex={0} className='menu dropdown-content rounded-box shadow'>
                {auth ? 
                    <li><a href='/Logout'><LogOut size={20}/>Logout</a></li>:
                    <li><a href='/Login'><LogIn size={20}/>Login</a></li>
                }
                {auth ? 
                    null:
                    <li><a href='Signup'><SquarePen size={20}/>Signup</a></li>
                }
                </ul>
            </div>
            <button className="btn btn-ghost"><Settings/></button>
        </div>
    </div>
  )
}

export default Navbar
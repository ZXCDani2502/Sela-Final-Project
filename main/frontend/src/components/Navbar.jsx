import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar bg-base-100'>
        <div className='navbar-start'>
            <a className='btn btn-ghost hover:bg-base-100'>Logo</a>
        </div>
        <div className='navbar-center hidden lg:flex'>
            <ul tabIndex={0} className='menu menu-horizontal px-1'>
                <li>
                    <details>
                        <summary>Games</summary>
                        <ul className='p-2'>
                            <li><a href="">Arcade</a></li>
                            <li><a href="">Online</a></li>
                        </ul>
                    </details>
                </li>
                <li><a>Chess</a></li>
                <li><a>Backgammon</a></li>
            </ul>
        </div>
            <div className='navbar-end'>
                <a className='btn btn-ghost'>Login?Logout</a>
                <a className='btn btn-ghost'>Signup?null</a>
            </div>

    </div>
  )
}

export default Navbar
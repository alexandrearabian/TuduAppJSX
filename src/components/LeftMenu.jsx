import React from 'react';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';

const LeftMenu = () => {
    return (
        <div className="left-menu">
            <nav>
                <ul>
                    <li>
                        <Link to="/profile">
                            Profile
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/todolist">
                            To-Do List
                        </Link>
                    </li>
                    <li>
                        <Link to="/habits">
                            Habit Tracker
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/goals">
                            Goals
                        </Link>
                    </li> */}
                    {/* <li>
                        <Link to="/calendar">
                            Calendar
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/shop">
                            Shop
                        </Link>
                    </li>
                    <LogOut />
                </ul>
            </nav>
        </div>
    );
};

export default LeftMenu;

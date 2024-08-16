import { Route, Navigate, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../pages/Profile';
import SignInPage from '../pages/SignInPage';
import GoalsPage from '../pages/GoalsPage';
import { useEffect, useState } from 'react';
import ToDoList from '../pages/ToDoList';
import { getData, setData } from '../functions/LocalStorageFunctions';
import HabitTracker from '../pages/HabitTracker';
import LeftMenu from './LeftMenu';
import Shop from '../pages/Shop';
import Dashboard from '../pages/Dashboard';
import RightMenu from './RightMenu';

export const RouteAssigner = () => {
    const [balance, setBalance] = useState(() => getData('balance'));
    const [isAuth, setIsAuth] = useState(() => getData('AuthState' || false));
    const [completedTasks, setCompletedTasks] = useState(0);
    const [completedHabits, setCompletedHabits] = useState(0);
    const [completedGoals, setCompletedGoals] = useState(0);

    // Fetch completed tasks, habits, and goals from your data source (e.g., local storage, API)
    const tasks = getData('tasks') || [];
    const habits = getData('habits') || [];
    const goals = getData('goals') || [];

    let totalTasks = tasks.length;
    let totalHabits = habits.length;
    let totalGoals = goals.length;



    useEffect(() => {
        setData('AuthState', isAuth);
    }, [isAuth]);

    const changeAuth = () => {
        setIsAuth(prevIsAuth => {
            const newIsAuth = !prevIsAuth;
            setData('AuthState', newIsAuth);
            return newIsAuth;
        });
    };

    useEffect(() => {

        setCompletedTasks(tasks.filter(task => task.taskDone).length);
        setCompletedHabits(habits.filter(habit => habit.habitDone).length);
        setCompletedGoals(goals.filter(goal => goal.goalDone).length);
    }, [completedGoals, completedHabits, completedTasks]);

    const updateBalance = (amount) => {
        let currentBalance = getData('balance');
        currentBalance = parseInt(currentBalance) + amount;
        setData('balance', currentBalance);
        setBalance(currentBalance);
    };


    if (isAuth) {
        return (
            <Router>
                <div className="background-animation">
                    <div className="ball ball1"></div>
                    <div className="ball ball2"></div>
                    <div className="ball ball3"></div>
                    <div className="ball ball4"></div>
                    <div className="ball ball5"></div>
                    <div className="ball ball6"></div>
                </div>

                <LeftMenu />
                <RightMenu
                    balance={balance}
                    completedTasks={completedTasks}
                    completedHabits={completedHabits}
                    completedGoals={completedGoals}
                    totalTasks={totalTasks}
                    totalHabits={totalHabits}
                    totalGoals={totalGoals}
                />
                <Routes>
                    <Route path="*" element={<Navigate to="/todolist" />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/todolist" element={<ToDoList updateBalance={updateBalance} />} />
                    <Route path="/habits" element={<HabitTracker updateBalance={updateBalance} />} />
                    {/* <Route path="/goals" element={<GoalsPage updateBalance={updateBalance} />} /> */}
                    <Route path="/shop" element={<Shop updateBalance={updateBalance} />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </Router>
        );
    } else {
        return (
            <Router>
                <div className="background-animation">
                    <div className="ball ball1"></div>
                    <div className="ball ball2"></div>
                    <div className="ball ball3"></div>
                    <div className="ball ball4"></div>
                    <div className="ball ball5"></div>
                    <div className="ball ball6"></div>
                </div>
                <Routes>
                    <Route path="*" element={<Navigate to="/signin" />} />
                    <Route path="/signin" element={<SignInPage onChangeAuth={changeAuth} />} />
                </Routes>
            </Router>
        );
    }
};

export default RouteAssigner;

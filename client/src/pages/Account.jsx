// About User, XP Donut, Calendar, small achiievement banner 

import { useEffect, useState } from 'react'

export default function Account() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')

        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    if (!user) {
        return <h1>Loading account...</h1>
    }

    return (
        <div>
            <h1>Welcome, {user.firstName}</h1>

            <div>
                <h2>DASHBOARD</h2>

                <p>{user.firstName} {user.lastName || ''}</p>
                <p>{user.email}</p>
                <p>Expertise: {user.expertise || 'beginner'}</p>
            </div>

            <div>
                <h2>Progress</h2>

                <p>Level: {user.level ?? 1}</p>
                <p>XP: {user.xp ?? 0}</p>
                <p>Daily Goal: {user.dailyGoal ?? 0}</p>
                <p>Charms Collected: {user.charms?.length ?? 0 }</p>
            </div>
        </div>
    )
}
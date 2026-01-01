"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '@/context/user-context';
import { User } from '@/types';

const Provider = ({
    children
}: { children: React.ReactNode }) => {

    const [userDetails, setUserDetails] = useState<User | null>(null);

    useEffect(() => {
        createUser();
    }, []);

    const createUser = async () => {
        const result = await axios.post('/api/user');
        setUserDetails(result.data.user);
    }

    return (
        <UserContext.Provider value={{ user: userDetails, setUser: setUserDetails }}>
            {children}
        </UserContext.Provider>
    )
}

export default Provider
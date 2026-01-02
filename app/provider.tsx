"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserContext } from '@/context/user-context';
import { User } from '@/types';

const Provider = ({
    children
}: { children: React.ReactNode }) => {

    const [userDetails, setUserDetails] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        createUser();
    }, []);

    const createUser = async () => {
        try {
            setError(null);
            const result = await axios.post('/api/user');
            setUserDetails(result.data.user);
        } catch (error) {
            setError("Failed to create user");
        }

    }

    return (
        <UserContext.Provider value={{ user: userDetails, setUser: setUserDetails }}>
            {children}
        </UserContext.Provider>
    )
}

export default Provider
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, users as initialUsers } from '@/app/data/mockData';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    signup: (email: string, password: string, name: string, type: 'patient' | 'caretaker') => Promise<{ success: boolean; message?: string; user?: User }>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    voiceEnabled: boolean;
    setVoiceEnabled: (enabled: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => {
        try {
            const saved = localStorage.getItem('voice_enabled');
            return saved !== null ? JSON.parse(saved) : true;
        } catch (e) {
            return true;
        }
    });
    const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
        try {
            const saved = localStorage.getItem('registered_users');
            const parsed = saved ? JSON.parse(saved) : null;

            // Ensure we have an array, even if saved data is invalid
            let merged = Array.isArray(parsed) ? [...parsed] : [...initialUsers];

            // Always merge in initialUsers to ensure mock accounts exist and are UP TO DATE
            // We prioritize initialUsers (demo accounts) by filtering out any existing ones with the same email
            initialUsers.forEach((initUser: User) => {
                merged = merged.filter(u => u.email.toLowerCase() !== initUser.email.toLowerCase());
                merged.push(initUser);
            });
            return merged;
        } catch (e) {
            console.error('Failed to load users from localStorage', e);
            return initialUsers;
        }
    });

    // Save users to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
    }, [registeredUsers]);

    // Save voice preference to localStorage
    useEffect(() => {
        localStorage.setItem('voice_enabled', JSON.stringify(voiceEnabled));
    }, [voiceEnabled]);

    // Check for active session on load - DISABLED to force login on start
    useEffect(() => {
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        const cleanEmail = email.trim();
        const cleanPassword = password.trim();

        // Find user in registered list - case-insensitive email
        const foundUser = registeredUsers.find(
            u => u.email.toLowerCase() === cleanEmail.toLowerCase() && u.password === cleanPassword
        );

        if (foundUser) {
            setUser(foundUser);
            // localStorage.setItem('active_session', JSON.stringify(foundUser)); // Removed to force login on start
            return { success: true };
        }

        return { success: false, message: 'Invalid email or password' };
    };

    const signup = async (email: string, password: string, name: string, type: 'patient' | 'caretaker') => {
        // Check if email already exists - case-insensitive
        if (registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, message: 'Email already registered' };
        }

        const newUser: User = {
            id: `u${Date.now()}`,
            email,
            password,
            type,
            // Create linked IDs immediately
            ...(type === 'patient' ? { patientId: `p${Date.now()}` } : { caretakerId: `c${Date.now()}` })
        };

        setRegisteredUsers(prev => [...prev, newUser]);

        // Auto-login after signup
        setUser(newUser);
        // localStorage.setItem('active_session', JSON.stringify(newUser)); // Removed to force login on start

        return { success: true, user: newUser };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('active_session');
    };

    const updateUser = (updates: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        // localStorage.setItem('active_session', JSON.stringify(updatedUser)); // Removed to force login on start

        // Also update in registeredUsers if needed (for login consistency)
        setRegisteredUsers(prev =>
            prev.map(u => u.id === user.id ? updatedUser : u)
        );
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser, voiceEnabled, setVoiceEnabled }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

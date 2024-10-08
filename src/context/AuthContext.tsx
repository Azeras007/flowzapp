import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { login, register, logout } from '../services/authService';

interface AuthContextProps {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsAuthenticated(!!token);
	}, []);

	const handleLogin = async (email: string, password: string) => {
		await login({ email, password });
		setIsAuthenticated(true);
	};

	const handleRegister = async (
		name: string,
		email: string,
		password: string
	) => {
		await register({ name, email, password });
		setIsAuthenticated(true);
	};

	const handleLogout = () => {
		logout();
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				login: handleLogin,
				register: handleRegister,
				logout: handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

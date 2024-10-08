import api from './axiosInstance';

interface LoginPayload {
	email: string;
	password: string;
}

interface RegisterPayload {
	name: string;
	email: string;
	password: string;
}

interface AuthResponse {
	token: string;
}

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
	const response = await api.post<AuthResponse>('/login', payload);

	if (response.data.token) {
		localStorage.setItem('token', response.data.token);
	}

	return response.data;
};

export const register = async (
	payload: RegisterPayload
): Promise<AuthResponse> => {
	const response = await api.post<AuthResponse>('/register', payload);

	if (response.data.token) {
		localStorage.setItem('token', response.data.token);
	}

	return response.data;
};

export const logout = (): void => {
	localStorage.removeItem('token');
};

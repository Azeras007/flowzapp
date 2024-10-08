import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function OAuthCallback() {
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const token = params.get('token');

		if (token) {
			localStorage.setItem('token', token);
			setTimeout(() => {
				navigate('/dashboard');
			}, 100);
		} else {
			navigate('/login');
		}
	}, [navigate]);

	return <div>Logging you in...</div>;
}

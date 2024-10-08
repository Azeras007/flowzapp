import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple, FaGithub } from 'react-icons/fa';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { login } from '@/services/authService';
import { googleLogin, appleLogin, githubLogin } from '@/services/oauthService';
import logo from '/area.png';

export const description =
	"A simple login form with email and password. The submit button says 'Sign in'.";

export function LoginForm() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await login({ email, password });
			navigate('/dashboard');
		} catch (err) {
			setError('Invalid email or password. Please try again.');
			console.error(err);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-center pt-20">
				<img src={logo} alt="Area Logo" className="mb-6 w-24 h-24" />
				<Card className="mx-auto max-w-sm">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<a
										href="#"
										className="ml-auto inline-block text-sm underline"
									>
										Forgot your password?
									</a>
								</div>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							{error && <p className="text-red-500 text-sm">{error}</p>}
							<Button type="submit" className="w-full">
								Sign in
							</Button>
						</form>
						<div className="relative my-4">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-card text-card-foreground px-2">
									or login with
								</span>
							</div>
						</div>

						<div className="flex justify-center gap-2">
							<Button
								variant="outline"
								className="w-auto"
								onClick={googleLogin}
							>
								<FaGoogle className="h-4 w-4" />
							</Button>
							<Button variant="outline" className="w-auto" onClick={appleLogin}>
								<FaApple className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								className="w-auto"
								onClick={githubLogin}
							>
								<FaGithub className="h-4 w-4" />
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{' '}
							<a href="/register" className="underline">
								Sign up
							</a>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

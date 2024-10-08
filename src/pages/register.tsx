import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { register } from '@/services/authService';
import { googleLogin, appleLogin, githubLogin } from '@/services/oauthService';
import { FaGoogle, FaApple, FaGithub } from 'react-icons/fa';
import logo from '/area.png';

export const description =
	"A sign up form with username, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export function RegisterForm() {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await register({ name: username, email, password });
			navigate('/dashboard');
		} catch (err) {
			setError('Failed to register. Please try again.');
			console.error(err);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-center pt-20">
				<img src={logo} alt="Area Logo" className="mb-6 w-24 h-24" />
				<Card className="mx-auto max-w-sm">
					<CardHeader>
						<CardTitle className="text-xl">Sign Up</CardTitle>
						<CardDescription>
							Enter your information to create an account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="username">Username</Label>
								<Input
									id="username"
									placeholder="Robinson"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</div>
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
								<Label htmlFor="password">Password</Label>
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
								Create an account
							</Button>
						</form>
						<div className="relative my-4">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="bg-card text-card-foreground px-2">
									or sign up with
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
							Already have an account?{' '}
							<a href="/login" className="underline">
								Login
							</a>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

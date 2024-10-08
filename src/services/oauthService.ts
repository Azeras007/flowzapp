export const googleLogin = (): void => {
	const redirectUrl = `${window.location.origin}/oauth-callback`;
	window.location.href = `https://area-development.tech/api/auth/google?redirect_url=${redirectUrl}`;
};

export const appleLogin = (): void => {
	const redirectUrl = `${window.location.origin}/oauth-callback`;
	window.location.href = `https://area-development.tech/api/auth/apple?redirect_url=${redirectUrl}`;
};

export const githubLogin = (): void => {
	const redirectUrl = `${window.location.origin}/oauth-callback`;
	window.location.href = `https://area-development.tech/api/auth/github?redirect_url=${redirectUrl}`;
};

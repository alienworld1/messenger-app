import { signIn } from 'next-auth/react';

export async function login(
  previousState: string | null,
  formData: FormData,
): Promise<string | null> {
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  console.log(credentials);

  try {
    console.log('signing in...');
    const response = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });
    console.log('signed in');
    console.log(response);

    if (!response || !response.ok) {
      return 'Incorrect email or password.';
    }
  } catch (error) {
    console.error(error);
    return 'Incorrect email or password';
  }

  return null;
}
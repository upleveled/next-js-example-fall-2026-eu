import LoginForm from './LoginForm';

export const metadata = {
  title: 'Login',
  description: 'Login to Animals Anonymous',
};

export default async function LoginPage(props: PageProps<'/login'>) {
  const searchParams = await props.searchParams;

  return (
    <>
      <h1>Login</h1>
      <LoginForm returnTo={searchParams.returnTo} />
    </>
  );
}

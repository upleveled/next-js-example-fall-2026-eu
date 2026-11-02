import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Register',
  description: 'Register for Animals Anonymous',
};

export default async function RegisterPage(props: PageProps<'/register'>) {
  const searchParams = await props.searchParams;

  return (
    <>
      <h1>Register</h1>
      <RegisterForm returnTo={searchParams.returnTo} />
    </>
  );
}

export const metadata = {
  title: 'Profile page',
  description: 'Your personal profile page',
};

export default async function ProfilePage(
  props: PageProps<'/profile/[username]'>,
) {
  const { username } = await props.params;
  return (
    <>
      <h1>Profile</h1>
      <label>
        Username
        <input value={username} readOnly />
      </label>
      <button>Update</button>
    </>
  );
}

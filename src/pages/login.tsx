import { InferGetServerSidePropsType } from 'next';
import { getProviders, signIn } from 'next-auth/react';

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return { props: { providers } };
};

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-green-900 to-slate-900'>
      <h1 className='text-white'>Login page</h1>
      {providers ? (
        Object.values(providers).map((provider) => (
          <div key={provider.id}>
            <button
              className='m-16 cursor-pointer rounded-xl bg-green-600 p-4 text-white
              shadow-lg transition-all duration-150 ease-in-out hover:bg-green-500'
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Log in with <span className='font-bold'>{provider.name}</span>
            </button>
          </div>
        ))
      ) : (
        <p>No providers</p>
      )}
    </div>
  );
};

export default Login;

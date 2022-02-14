import { useSession } from 'next-auth/react';

import Layout from '@/components/layout/Layout';
import Loading from '@/components/Loading';
import ProfileSection from '@/components/ProfileSection';
import Seo from '@/components/Seo';

export default function HomePage(): JSX.Element {
  //la sesión contiene todos los datos de usuario de spotify
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === 'loading') {
    return <Loading loadingMessage='Working on your rewind' />;
  }

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo templateTitle='Home' />
      <main>
        <section className=' bg-white'>
          <ProfileSection
            imageSrc={session?.user?.image}
            userName={session?.user?.name}
          />
        </section>
      </main>
    </Layout>
  );
}

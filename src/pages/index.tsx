import { useSession } from 'next-auth/react';

import useUserAudioFeatures from '@/hooks/useUserAudioFeatures';

import Layout from '@/components/layout/Layout';
import Loading from '@/components/Loading';
import ProfileSection from '@/components/ProfileSection';
import Seo from '@/components/Seo';

export default function HomePage(): JSX.Element {
  //la sesión contiene todos los datos de usuario de spotify
  const { data: session, status: sessionStatus } = useSession();

  console.log('sessionStatus: ', session);

  const { audioFeatures, setTimeRange } = useUserAudioFeatures('medium_term');

  if (sessionStatus === 'loading') {
    return <Loading loadingMessage='Working on your rewind' />;
  }

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo templateTitle='Home' />
      <main>
        <ProfileSection
          imageSrc={session?.user?.image}
          userName={session?.user?.name}
        />
        <p>{String(audioFeatures)}</p>
      </main>
    </Layout>
  );
}

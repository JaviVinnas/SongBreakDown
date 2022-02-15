import { FunctionComponent } from 'react';

type ProfileSectionProps = {
  imageSrc: string | null | undefined;
  userName: string | null | undefined;
};
import { AnimatePresence, motion, useCycle, Variants } from 'framer-motion';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

//definimos las variants a usar

const sideVariants: Variants = {
  closed: {
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
  open: { transition: { staggerChildren: 0.2, staggerDirection: 1 } },
};

/**
 * Parte de la ui con el nombre e imagen del usuario con la posibilidad de cerrar sesión o ir al perfil
 * @returns {FunctionComponent}
 */
const ProfileSection: FunctionComponent<ProfileSectionProps> = ({
  imageSrc,
  userName,
}) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const noImageSrc = 'https://picsum.photos/50';
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.button
            className='absolute top-20 right-9 w-36 rounded-full border-2 border-gray-800 bg-red-500 p-2 font-medium shadow-xl hover:bg-red-600 '
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.3 },
            }}
            onClick={() => signOut()}
          >
            Logout
          </motion.button>
        )}
      </AnimatePresence>
      <motion.div
        className='absolute top-5 right-8 hover:opacity-80'
        onClick={() => toggleOpen()}
      >
        <div className='flex cursor-pointer items-center rounded-full border-2 border-gray-800 bg-white shadow-lg '>
          <div className='m-1 flex items-center'>
            <Image
              loader={(_) => imageSrc ?? noImageSrc}
              unoptimized={true}
              src={imageSrc ?? noImageSrc}
              height={40}
              width={40}
              alt='Avatar del usuario'
              className='rounded-full'
            />
          </div>
          <p className='m-3 mx-4 select-none font-medium'>
            {userName ?? 'User'}
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default ProfileSection;

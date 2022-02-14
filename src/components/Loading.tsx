import { RefreshIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { FunctionComponent } from 'react';

const Loading: FunctionComponent<{ loadingMessage?: string }> = ({
  loadingMessage = 'Loading your content...',
}) => {
  return (
    <section className='flex min-h-screen flex-col items-center justify-center text-center'>
      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ ease: 'linear', duration: 1.5, repeat: Infinity }}
      >
        <RefreshIcon className='h-20 w-20 text-gray-900' />
      </motion.div>
      <p className='mt-4 text-lg text-gray-800'>{loadingMessage}</p>
    </section>
  );
};

export default Loading;

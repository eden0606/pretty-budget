'use client';

import { isAuthenticated } from '@/lib/helpers';
import styles from './AuthenticatedStatus.module.scss';
import { useSearchParams } from 'next/navigation';
import OpenLock from '../svgs/OpenLock';
import Lock from '../svgs/Lock';

const AuthenticatedStatus = () => {
  // TODO: if need search params often, extract this into a reusable hook
  const searchParams = useSearchParams();
  const key = searchParams.get('key');

  return <div className={styles.status}>{isAuthenticated(key) ? <Lock /> : <OpenLock />}</div>;
};

export default AuthenticatedStatus;

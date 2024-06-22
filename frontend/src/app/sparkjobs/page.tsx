'use client'

import AppLayout from '@/components/layout';
import SparkJobContainer from '@/containers/sparkjobs';

export default async function Home() {
  return (
    <AppLayout activeMenuKey='sparkjobs'>
       <SparkJobContainer/>
    </AppLayout>
  );
}
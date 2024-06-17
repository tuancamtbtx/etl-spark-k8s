'use client'

import AppLayout from '@/components/layout';

import React from 'react';

import {HeaderWrapper,ContentWrapper} from '@/components/wrapper'

import dynamic from 'next/dynamic';
const DashboardContainer = dynamic(() => import('@/containers/dashboard'), { ssr: false });

export default async function Home() {

  return (
    <AppLayout activeMenuKey='dashboard'>
      <HeaderWrapper>
        <h1>Dashboard</h1>
      </HeaderWrapper>
      <ContentWrapper>
        <DashboardContainer/>
      </ContentWrapper>
    </AppLayout>
  );
}
Home.getInitialProps = async (props:any) => {
  console.log('Home.getInitialProps',props);
};


'use client'
import Head from 'next/head'
import { LayoutWrapper, ContentWrapper, LogoWrapper } from '@/components/wrapper'
import styled from 'styled-components'
import Link from 'next/link'


import {
    ApiOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    ApartmentOutlined,
    SendOutlined
} from '@ant-design/icons';
import {Layout, Menu } from 'antd';
import React, { memo, useState, ReactNode} from 'react';
import UserDropDown from './user-dropdown'



const { Header, Sider, Content,Footer } = Layout;

type IProps = {
	title?: string,
	children?: ReactNode,
	activeMenuKey?: string
}

const App = memo(({ title, activeMenuKey, children}:IProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState(activeMenuKey);


    const handleMenuClick = (e: any) => {
        setSelectedKey(e.key);
    };
    // useEffect(() => {

	// }, [])
    return (
        <LayoutWrapper>
            <Head>
				<title>{title} | Food Order CMS</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
            <Layout style={{ minHeight: '100vh' }}>
            <Header id='headerNav'>
          <div style={{ 'display': 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
            <div style={{
              color: '#fff',
              fontSize: '18px',
              lineHeight: '64px',
              padding: '0 24px',
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}>
              {collapsed ?
                <MenuUnfoldOutlined
                  className="trigger"
                  onClick={() => setCollapsed(false)} /> :
                <MenuFoldOutlined className="trigger"
                  onClick={() => setCollapsed(true)} />}
            </div>
            <LogoWrapper>
              <img src='/next.jpg' />
            </LogoWrapper>
          </div>
          <UserDropDown username="Tuấn Cám" avatar="https://mystickermania.com/cdn/stickers/cute/cute-tiger-512x512.png" />
        </Header>
            <Layout style={{ marginTop: '1px' }}>
                <Sider theme='light' width={200} trigger={null} collapsible collapsed={collapsed}>
                    <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[selectedKey as string]}
                    onClick={handleMenuClick}
                    style={{ padding: '0px' }}
                    items={[
                        {
                            key: 'dashboard',
                            icon: <HomeOutlined />,
                            label: <Link href="/">Dashboard</Link>,
                        },
                        {
                            key: 'connections',
                            icon: <ApiOutlined />,
                            label: <Link href="/connections">Connections</Link>,
                        },
                        {
                            key: 'sources',
                            icon: <ApartmentOutlined />,
                            label: <Link href="/sources">Sources</Link>,
                        },
                        {
                            key: 'destinations',
                            icon: <SendOutlined />,
                            label: <Link href="/destinations">Destinations</Link>,
                        },
                        {
                            key: 'settings',
                            icon: <SettingOutlined />,
                            label: <Link href="/settings">Settings</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout className="site-layout"  style={{ marginTop: '1px' }}>
                <Content style={{ overflow: 'initial', minHeight: '100vh' }}>
							<ContentWrapper>
								{children}
							</ContentWrapper>
                           
						</Content>
                        <Footer style={{ textAlign: 'center' }}>
							©  {new Date().getFullYear()} Nguyen Ba Long Team
						</Footer>
            </Layout>
            </Layout>
            </Layout>
        </LayoutWrapper>
    );
});
export default App;

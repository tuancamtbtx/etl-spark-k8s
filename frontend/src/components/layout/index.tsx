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
              <img src='data:image/png;base64,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' />
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
                            key: 'sparkjobs',
                            icon: <ApiOutlined />,
                            label: <Link href="/sparkjobs">Spark Job</Link>,
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

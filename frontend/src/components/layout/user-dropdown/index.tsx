// export const name: string = 'user-dropdown';
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Menu, Dropdown ,Avatar} from 'antd'
import { SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { LogoutOutlined, DownOutlined, EditOutlined } from '@ant-design/icons'
const Wrapper = styled.a`
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    margin-right: 8px;
  }
  .username {
    font-weight: 700;
    color: #2c3e50;
    margin-right: 4px;
  }
`
type IUserProps = {
    username?: string,
    avatar: string
}

const menu: any = (
    <Menu>
        <Menu.Item>
            <a target='_blank' rel='noopener noreferrer'>
                <EditOutlined />
                Đổi mật khẩu
            </a>
        </Menu.Item>
        <Menu.Item>
            <a onClick={() => console.log("logout")} target='_blank' rel='noopener noreferrer'>
                <LogoutOutlined />
                Đăng Xuất
            </a>
        </Menu.Item>
    </Menu>
)
const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Đổi mật khẩu
        </a>
      ),
      icon: <EditOutlined />,

    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Đăng Xuất
        </a>
      ),
      icon: <SmileOutlined />,
    },
  ];
const UserDropDown: React.FC<IUserProps> = ({ username, avatar }: IUserProps) => {
    return (
        <Dropdown menu={{items}}>
            <Wrapper className='ant-dropdown-link' href='#'>
                <Avatar src={avatar}/>
                <span className='fullname'>{username}</span>
                <DownOutlined />
            </Wrapper>
        </Dropdown>
    )
}
export default UserDropDown;
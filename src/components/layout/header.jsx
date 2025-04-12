// import '../layout/header.css'
import { Menu } from 'antd'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react';
import { HomeOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';

const Header = () => {
    const [current, setCurrent] = useState('');
    const onClick = e => {
      setCurrent(e.key);
    };
    const items = [
        {
            label: <Link to={"/"}>Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>Users</Link>,
            key: 'users',
            icon: <UserOutlined />,
            // disabled: true,
        },
        {
            label: <Link to={"/products"}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
        // {
        //     key: 'alipay',
        //     label: (
        //         <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        //             Navigation Four - Link
        //         </a>
        //     ),
        // },
    ];
    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    )
}

export default Header
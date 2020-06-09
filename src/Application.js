import React, { Component } from 'react';
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import { Layout, Menu } from 'antd';
import { Affix, Button } from 'antd';

import {
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
} from '@ant-design/icons';

import BodyComponent from './components/BodyComponent';
import TopBar from './components/UI/TopBar';

const { Header, Content, Footer, Sider } = Layout;


const Application = () => {
   
        const [top, bottom] = useState(10);
        return (
            <Layout>
                <Sider
                    style={{
                        overflow: '',
                        height: '100vh',
                        position: 'fixed',
                        left: 10,
                        backgroundColor: 'white'
                    }}>
                    <div className="logo" >
                        <center>LOGO HERE<br /><br /></center>

                    </div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="light"
                        
                    >
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to={{ pathname: '/' }}>Compare Schema</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            <Link to={{ pathname: '/compareData' }}>Compare Data</Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<ContainerOutlined />}>
                            <Link to={{ pathname: '/SQLExecutor' }}>Execute SQL</Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<ContainerOutlined />}>
                            <Link to={{ pathname: '/compareFiles' }}>Compare File</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Affix offsetTop={top}>
                        <Header className="site-layout-background" style={{ padding: 0, backgroundColor:'#e6f7ff', border:"1px solid #1890ff", marginLeft:15}} >
                            <TopBar></TopBar>
                        </Header>
                    </Affix>

                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                            <BodyComponent></BodyComponent>
                        </div>
                    </Content>

                    <Affix offsetBottom={bottom}>
                        <Footer style={{ textAlign: 'center' }}>
                            FOOTER
                        </Footer>
                    </Affix>
                    
                </Layout>
            </Layout>
        )
    }

export default Application

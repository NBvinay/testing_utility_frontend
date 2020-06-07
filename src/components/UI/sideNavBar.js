import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Button } from 'antd';
import { Link} from 'react-router-dom';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';

class SideBarNav extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div style={{ width: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to={{pathname: '/'}}>Compare Schema</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
          <Link to={{pathname: '/compareData'}}>Compare Data</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
          <Link to={{pathname: '/SQLExecutor'}}>Execute SQL</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}






// import React, { useState } from 'react';
// import 'antd/dist/antd.css';
// import { Drawer, Button } from 'antd';
// import '../../App.css'
// import { Link} from 'react-router-dom';

// const SideBarNav = () => {
//   const [visible, setVisible] = useState(false);

//   const showDrawer = () => {
//     setVisible(true);
//   };

//   const onClose = () => {
//     setVisible(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showDrawer}>
//         Open
//       </Button>
//       <Drawer
//         title="Basic Drawer"
//         placement="left"
//         closable={false}
//         onClose={onClose}
//         visible={visible}
        
//       >
//         <p> <Link to={{pathname: '/'}}>Compare Schema</Link></p>
//         <p><Link to={{pathname: '/compareData'}}>Compare Data</Link></p>
//         <p> <Link to={{pathname: '/SQLExecutor'}}>Execute SQL</Link></p>
//       </Drawer>
//     </>
   
//   );
// };
export default SideBarNav;

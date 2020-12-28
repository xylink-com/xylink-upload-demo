import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import SingleUpload from './singleFileUpload';
import MulUpload from './mulFileUpload';
import '../style/variables.module.scss';
import '../style/index.module.scss';

const { Header, Sider, Content } = Layout;

const IndexView = () => {
  const [isSingle, setIsSingle] = useState(true);

  useEffect(() => {
    document.title = '文件上传 Demo';
  }, []);

  return (
    <div className="container">
      <Layout>
        <Sider style={{ width: 256 }}>
          <Menu
            className="menu"
            style={{ width: '100%', height: '100%' }}
            defaultSelectedKeys={['1']}
            mode="inline"
          >
            <Menu.Item key="1" onClick={() => setIsSingle(true)}>
              单文件上传
            </Menu.Item>
            <Menu.Item key="2" onClick={() => setIsSingle(false)}>
              多文件上传
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>
          <Header style={{ textAlign: 'center' }}>
            <h2>文件上传 Demo</h2>
          </Header>
          <Content style={{ padding: '0 40px' }}>
            <div className="upload-wrapper">{isSingle ? <SingleUpload /> : <MulUpload />}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default IndexView;

import React, { useEffect } from 'react';
import { Layout } from 'antd';
import SingleUpload from './singleFileUpload';
import '../style/variables.module.scss';
import '../style/index.module.scss';

const { Header, Content } = Layout;

const IndexView = () => {

  useEffect(() => {
    document.title = '文件上传 Demo';
  }, []);

  return (
    <div className="container">
      <Layout>
          <Header style={{ textAlign: 'center' }}>
            <h2>文件上传 Demo</h2>
          </Header>
          <Content style={{ padding: '0 40px' }}>
            <div className="upload-wrapper"><SingleUpload /></div>
          </Content>
        </Layout>
    </div>
  );
};

export default IndexView;

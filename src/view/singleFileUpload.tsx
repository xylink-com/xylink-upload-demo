import { UploadOutlined } from '@ant-design/icons';
import xyUpload from '@xylink/xy-upload-sdk';
import { Button, message, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { statusMap, statusTextMap } from '../constants';
import { IResource, IError } from '../type';
import { config } from '../utils/config';

const IndexView = () => {
  const [status, setStatus] = useState(statusMap.wait);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const uploadClient = useRef<any>();
  const fileRef = useRef<File>();

  useEffect(() => {
    document.title = '单文件上传示例';
  }, []);

  const getClient = () => {
    const client = xyUpload.createClient(config);

    client.on('success', (res: IResource) => {
      setStatus(statusMap.success);
    });

    client.on('error', (err: IError) => {
      message.error(err.errorMessage);
    });

    client.on('progress', (progress: number) => {
      setProgress(progress);
    });

    // 上传暂停
    client.on('pause', () => {
      setStatus(statusMap.paused);
    });

    // 上传取消
    client.on('abort', () => {
      setStatus(statusMap.canceled);
    });

    // 上传开始 开始上传或恢复上传会触发
    client.on('start', () => {
      setStatus(statusMap.inProcessing);
    });

    return client;
  };

  const onUpload = () => {
    uploadClient.current.startUpload(fileRef.current);
  };

  const pauseUpload = () => {
    // 暂停分片上传。
    uploadClient.current.pauseUpload();
  };

  const resumeUpload = () => {
    // 暂停分片上传。
    uploadClient.current.resumeUpload();
  };

  const cancelUpload = () => {
    // 取消分片上传。
    uploadClient.current.abortUpload();
  };

  const beforeUpload = (file: File) => {
    fileRef.current = file;
    setFileName(file.name);
    setStatus(statusMap.wait);
    setProgress(0);
    uploadClient.current = getClient();
    return false;
  };

  const calcProgress = Math.round(progress * 10000) / 100 + '%';

  return (
    <div className="single-upload-wrapper">
      <header style={{ marginBottom: 10 }}>请选择要上传的文件</header>
      <Upload className="single-upload" beforeUpload={beforeUpload}>
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      {!!fileName && (
        <div className="single-upload-info">
          <div>文件名称：{fileName}</div>
          <div>上传进度：{calcProgress}</div>
          <div>状态：{statusTextMap[status]}</div>
          <div className="button-wrapper">
            {status === statusMap.wait && (
              <Button type="primary" onClick={onUpload}>
                开始上传
              </Button>
            )}
            {status === statusMap.inProcessing && (
              <Button type="primary" onClick={pauseUpload}>
                暂停上传
              </Button>
            )}

            {status === statusMap.paused && (
              <Button type="primary" onClick={resumeUpload}>
                继续上传
              </Button>
            )}

            {(status === statusMap.paused || status === statusMap.inProcessing) && (
              <Button type="primary" onClick={cancelUpload}>
                废除上传
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexView;

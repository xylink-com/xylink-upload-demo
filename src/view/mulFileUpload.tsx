import { UploadOutlined } from '@ant-design/icons';
import xyUpload from '@xylink/xy-upload-sdk';
import { Button, message, Upload } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { statusMap, statusTextMap } from '../constants';
import { IClient, IFileData, IError, IResource } from '../type';

const IndexView = () => {
  const uploadClients = useRef<IClient[]>([]);
  const [fileList, setFileList] = useState<IFileData[]>([]);

  useEffect(() => {
    document.title = '多文件上传示例';
  }, []);

  const setFileData = (id: number, data: any) => {
    setFileList((fileList: IFileData[]) => {
      const list = JSON.parse(JSON.stringify(fileList));
      const newList = list.map((item: IFileData) => {
        if (item.id === id) {
          return {
            ...item,
            ...data
          };
        }
        return item;
      });
      return newList;
    });
  };

  const getClient = (id: number) => {
    // todo 此处请填写自己的配置信息
    const config = {
      server: 'xxx',
      enterpriseId: 'xxx',
      sdkToken: 'xxx',
      storeType: 'xxx'
    };
    const client = xyUpload.createClient(config);

    client.on('success', (res: IResource) => {
      setFileData(id, {
        status: statusMap.success
      });
    });

    client.on('error', (err: IError) => {
      message.error(err.errorMessage);
    });

    client.on('progress', (progress: number) => {
      setFileData(id, {
        progress
      });
    });

    // 上传开始 开始上传或恢复上传会触发
    client.on('start', () => {
      setFileData(id, {
        status: statusMap.inProcessing
      });
    });

    // 上传暂停
    client.on('pause', () => {
      setFileData(id, {
        status: statusMap.paused
      });
    });

    // 上传取消
    client.on('abort', () => {
      setFileData(id, {
        status: statusMap.canceled
      });
    });

    return client;
  };

  const beforeUpload = (file: any, files: any[]) => {
    // const files = e.target.files;
    const clients: IClient[] = [];
    const fileList: IFileData[] = [];
    [...files].forEach(async (file: File, index: number) => {
      clients.push({
        id: index,
        file,
        client: getClient(index)
      });
      fileList.push({
        id: index,
        name: file.name,
        status: statusMap.wait, // 0 失败 1成功 2进行中 3暂停 4取消 5未开始 6报错
        progress: 0
      });
    });
    uploadClients.current = clients;
    setFileList(fileList);
    return false;
  };

  const onUpload = async (id: number) => {
    const uploadClient: IClient = uploadClients.current.find((item: IClient) => {
      return item.id === id;
    }) as IClient;
    const { file, client } = uploadClient;
    await client.startUpload(file);
  };

  const pauseUpload = async (id: number) => {
    const uploadClient = uploadClients.current.find((item: IClient) => {
      return item.id === id;
    }) as IClient;
    const { client } = uploadClient;
    // 暂停分片上传。
    await client.pauseUpload();
  };

  const resumeUpload = async (id: number) => {
    const uploadClient = uploadClients.current.find((item: IClient) => {
      return item.id === id;
    }) as IClient;
    const { client } = uploadClient;
    // 暂停分片上传。
    await client.resumeUpload();
  };

  const cancelUpload = async (id: number) => {
    const uploadClient = uploadClients.current.find((item: IClient) => {
      return item.id === id;
    }) as IClient;
    const { client } = uploadClient;
    // 取消分片上传。
    await client.abortUpload();
  };

  return (
    <div className="mul-upload-wrapper">
      <header style={{ marginBottom: 10 }}>请选择多个文件上传</header>
      <Upload className="single-upload" beforeUpload={beforeUpload} multiple={true}>
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      <div className="mul-upload-info">
        {fileList.length > 0 && (
          <div className="upload-item" key={'nav'}>
            <div>文件名称</div>
            <div>上传进度</div>
            <div>上传状态</div>
            <div className="button-wrapper">操作</div>
          </div>
        )}
        {fileList.map((item: IFileData) => {
          const { progress, id, name, status } = item;
          const calcProgress = Math.round(progress * 10000) / 100 + '%';
          return (
            <div className="upload-item" key={id+'A'}>
              <div>
                <div className="title">{name}</div>
              </div>
              <div>{calcProgress}</div>
              <div>{statusTextMap[status]}</div>
              <div className="button-wrapper">
                {status === statusMap.wait && (
                  <Button size="small" type="primary" onClick={() => onUpload(id)}>
                    开始上传
                  </Button>
                )}
                {status === statusMap.inProcessing && (
                  <Button size="small" type="primary" onClick={() => pauseUpload(id)}>
                    暂停
                  </Button>
                )}
                {status === statusMap.paused && (
                  <Button size="small" type="primary" onClick={() => resumeUpload(id)}>
                    继续上传
                  </Button>
                )}

                {(status === statusMap.paused || status === statusMap.inProcessing) && (
                  <Button size="small" type="primary" onClick={() => cancelUpload(id)}>
                    废除
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndexView;

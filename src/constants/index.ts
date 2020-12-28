export const defaultConfig = {
  server: 'https://testdevsdk.xylink.com',
  enterpriseId: 'b251b0fa3a83916deaca628819599047e036482a',
  sdkToken: '6a16b139e040220afa7d6c7e806575c6830315c5d3be67586c6e4c22f47ce01b',
  storeType: 'lanxin-video'
};

// 上传状态
export const statusMap = {
  fail: 0, // 失败
  success: 1, // 成功
  inProcessing: 2, // 进行中
  paused: 3, // 暂停
  canceled: 4, // 已取消
  wait: 5 // 未开始
};

export const statusTextMap = {
  '0': '失败',
  '1': '成功',
  '2': '进行中',
  '3': '暂停',
  '4': '取消',
  '5': '未开始'
};

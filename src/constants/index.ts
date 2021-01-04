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

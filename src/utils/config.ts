/**
 * meeting config file
 */

import store from './store';

type IEnv = 'PRE' | 'PRD' | 'TXDEV' | 'TXQA' | string;

// 默认第三方是prd环境
export const ENV: IEnv = store.get('sdk-env') || process.env.REACT_APP_PROXY_ENV || 'TXDEV';
export const THIRD: boolean = false;

const SERVER_MAP: any = {
  TXDEV: {
    wssServer: 'wss://testdevsdk.xylink.com',
    httpServer: 'https://testdevapi.xylink.com',
    logServer: 'https://txdevlog.xylink.com'
  },
  TXQA: {
    wssServer: 'wss://testqasdk.xylink.com',
    httpServer: 'https://testqaapi.xylink.com',
    logServer: 'https://txdevlog.xylink.com'
  },
  PRE: {
    wssServer: 'wss://sdk.xylink.com',
    httpServer: 'https://cloudapi.xylink.com',
    logServer: 'https://log.xylink.com'
  },
  PRD: {
    wssServer: 'wss://sdk.xylink.com',
    httpServer: 'https://cloudapi.xylink.com',
    logServer: 'https://log.xylink.com'
  }
};

/**
 * 重要提示
 * 重要提示
 * 重要提示
 * PRODUCTION_ACCOUNT需要自行配置
 * 第三方登录，需要填写extId、clientId、clientSecret、token
 * 此值需要从对接负责人处获取
 * 重要提示
 * 重要提示
 * 重要提示
 */
const PRODUCTION_ACCOUNT = {
  extId: '662378169a12b8741a4f4f6f09e490077921e132',
  clientId: 'BIjb2rZD2n4AsHqHlmYyJ9JO',
  clientSecret: 'gedaV3jLpyTgMMGnAoqKP2jNUrko5LxR',
  sdkToken: '388f6df3968c9a7592d2f74354a8ea8a7cd2c2f4efe218625801663b1de50782'
};

const THIRD_ACCOUNT_MAP = {
  TXDEV: {
    extId: '8bea008225dd82616e1f43dcc5c8e3bbbab0d9e5',
    clientId: 'BIjb2rZD2n4AsHqHlmYyJ9JO',
    clientSecret: 'gedaV3jLpyTgMMGnAoqKP2jNUrko5LxR',
    sdkToken: 'ce0afb5541827860ca5841aaa0ac370c1e25dbebbe4e986cfcbf3ed8f3c09503'
  },
  TXQA: {
    extId: '6d9cb3bc7556dd97467aabae448f037737a0ef7b',
    clientId: 'BIjb2rZD2n4AsHqHlmYyJ9JO',
    clientSecret: 'gedaV3jLpyTgMMGnAoqKP2jNUrko5LxR',
    sdkToken: '388f6df3968c9a7592d2f74354a8ea8a7cd2c2f4efe218625801663b1de50782'
  },
  PRE: {
    extId: '6d9cb3bc7556dd97467aabae448f037737a0ef7b',
    clientId: 'BIjb2rZD2n4AsHqHlmYyJ9JO',
    clientSecret: 'gedaV3jLpyTgMMGnAoqKP2jNUrko5LxR',
    sdkToken: '388f6df3968c9a7592d2f74354a8ea8a7cd2c2f4efe218625801663b1de50782'
  },
  PRD: PRODUCTION_ACCOUNT
};

export const SERVER = (env: IEnv = ENV) => SERVER_MAP[env];
export const ACCOUNT: { extId: string; clientId: string; clientSecret: string; sdkToken: string } =
  store.get('ACCOUNT') || THIRD_ACCOUNT_MAP[ENV];

export type Platform = 'app' | 'weixin' | 'alipay' | 'toutiao' | 'xhs'

export function getPlatform(): Platform {
  // uni-app compiles this module per target; keep platform differences behind one API.
  // @ts-expect-error uni import metadata is available at runtime.
  const platform = typeof uni !== 'undefined' ? uni.getSystemInfoSync().uniPlatform : 'app'
  return platform === 'mp-weixin' ? 'weixin' : platform === 'mp-alipay' ? 'alipay' : platform === 'mp-toutiao' ? 'toutiao' : platform === 'mp-xhs' ? 'xhs' : 'app'
}

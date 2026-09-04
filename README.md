# Taxi Service Project

## Master Box 客服 Chat Box

乘客端通过 Taxi 后端接入 Master Box Integration Conversation API。首页及个人中心的客服入口会打开聊天画面，永久 API Key 仅保存在 Taxi 后端。

1. 在 Master Box 创建第三方 Integration，取得 App ID 与 API Key。
2. 按 `.env.example` 配置 `MASTERBOX_BASE_URL`、`MASTERBOX_APP_ID`、`MASTERBOX_API_KEY` 与 `SUPPORT_SESSION_SECRET`。
3. 分别启动 Master Box、Taxi API 与 Taxi 客户端。

目前 Master Box 的 `@masterbox/chat-embed` 尚未实现浏览器消息和 WebSocket 路由，因此客户端每 3 秒通过 Taxi 后端轮询现有 Integration API。待相关路由上线后可改用实时传输。

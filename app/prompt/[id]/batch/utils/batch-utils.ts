// 生成UUID
export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 生成批处理会话ID
export function generateBatchSessionId(): string {
  // 生成一个简短但唯一的ID
  const timestamp = new Date().getTime().toString(36)
  const random = Math.random().toString(36).substring(2, 6)
  return `BATCH-${timestamp}-${random}`.toUpperCase()
}

// 格式化时间戳
export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

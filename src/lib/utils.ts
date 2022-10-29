export const fromBytesToMegabytes = (bytes: number) =>
  Math.round((bytes / 1024 / 1024) * 100) / 100

export const getDuration = (durationMs: number) => {
  const minutes = Math.floor(durationMs / 1000 / 60)
  const seconds = Math.floor((durationMs / 1000) % 60)

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

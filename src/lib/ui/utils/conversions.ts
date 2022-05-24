export const fromBytesToMegabytes = (bytes: number) =>
  Math.round((bytes / 1024 / 1024) * 100) / 100

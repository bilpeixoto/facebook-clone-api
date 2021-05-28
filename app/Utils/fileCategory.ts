const fileCategory = ['avatar', 'post'] as const

type FileCategory = typeof fileCategory[number]
export { fileCategory, FileCategory }

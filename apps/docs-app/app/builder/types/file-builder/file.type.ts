export const FileTypes = {
  Advanced: 'advanced',
  AiAssist: 'ai-assist',
  All: 'all',
  FromStream: 'fromStream',
  Simple: 'simple'
} as const;

export type FileType = (typeof FileTypes)[keyof typeof FileTypes];

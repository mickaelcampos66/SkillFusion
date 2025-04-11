import { loadEnvConfig } from '@next/env'
import { z } from 'zod'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

const envSchema = z.object({
  SERVER_API_URL: z.string().url(),
  EXPIRES_IN: z.string(),
  JWT_SECRET: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format())
  throw new Error('Environment variable validation failed')
}

export const env = parsedEnv.data

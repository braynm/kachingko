import { createServerFn } from '@tanstack/react-start'
import { useSession } from "@tanstack/react-start/server";
import { authSchema } from '../auth';

// TODO USE 
const PASSWORD = process.env.SESSION_PASSWORD

if (!PASSWORD) {
  throw new Error('SESSION_PASSWORD environment variable is required')
}

export const useAppSession = () => useSession({
  password: PASSWORD,
  // maxAge: 60 * 60, 
  cookie: {
    maxAge: 15 * 60, // 1 hour in seconds (3600 seconds)
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  }
})

export const createSession = createServerFn({ method: 'POST' })
  // .validator((d: typeof authSchema) => d)
  .handler(async (data) => {
    const session = await useAppSession()
    session.update(data)

    return await getSession()
  })

export const getSession = createServerFn({ method: 'GET' })
  .handler(async () => {
    const session = await useAppSession() // or however you get your session
    return session.data
  })

export const deleteSession = createServerFn({ method: 'GET' })
  .handler(async () => {
    const session = await useAppSession() // or however you get your session
    await session.clear()
  })

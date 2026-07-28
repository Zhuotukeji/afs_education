import type { Access } from 'payload'

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const adminsOnly: Access = ({ req: { user } }) => (user as { role?: string } | null)?.role === 'admin'

export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { workflowStatus: { equals: 'published' } }
}

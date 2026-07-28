import { assertProductionEnvironment } from '@/lib/env'
export function GET() { try { assertProductionEnvironment(); return Response.json({ status: 'ready' }) } catch { return Response.json({ status: 'blocked', reason: 'Production identity or canonical URL is incomplete.' }, { status: 503 }) } }

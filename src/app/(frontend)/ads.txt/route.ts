export function GET() {
  return new Response(process.env.ADS_TXT_LINE ? `${process.env.ADS_TXT_LINE}\n` : '', { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } })
}

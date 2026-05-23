import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 300

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const competition = searchParams.get('competition') ?? 'PL'
  
  try {
    const res = await fetch(
      `https://api.football-data.org/v4/competitions/${competition}/matches?status=SCHEDULED&limit=10`,
      {
        headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY || '' },
        next: { revalidate: 300 },
      }
    )
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ matches: [] })
  }
}
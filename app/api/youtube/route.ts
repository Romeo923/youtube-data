import { NextResponse } from "next/server"
import { google } from "googleapis"


export async function GET(request: Request) {

  const res = await google.youtube("v3").videos.list({
		key: process.env.API_KEY,
		part: ["id", "snippet", "statistics"],
		chart: "mostPopular",

	})

  const data = res.data.items

  return NextResponse.json(data)
}

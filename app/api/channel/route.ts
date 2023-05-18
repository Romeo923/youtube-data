// import { NextResponse } from "next/server";
// import { google } from "googleapis";

// export async function GET(request: Request) {
//   const res = await google.youtube("v3").channels.list({
//     key: process.env.API_KEY,
//     part: ["id", "snippet", "statistics"],
//     chart: "mostPopular",
//     maxResults: 50,
//     // regionCode: "NP",
//   });

//   const data = res.data;

//   return NextResponse.json(data);
// }

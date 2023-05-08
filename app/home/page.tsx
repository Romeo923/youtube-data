"use client"

import { youtube_v3 } from "googleapis"
import YoutubeVideo from "@/components/YoutubeVideo"

export default async function Home() {
	const res = await fetch(`http://localhost:3000/api/youtube`, {
		next: { revalidate: 90 },
	})
	const data: youtube_v3.Schema$Video[] = await res.json()

	return (
		<main className='flex flex-col items-center justify-between min-h-screen p-24'>
			<div className='z-10 items-center justify-between w-full max-w-5xl font-mono text-sm'>
				{data.map(video => (
					<div key={video.id}>
						<YoutubeVideo {...video} />
					</div>
				))}
			</div>
		</main>
	)
}

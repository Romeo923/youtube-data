import React from "react"
import { youtube_v3 } from "googleapis"
import Image from "next/image"

export default function YoutubeVideo(video: youtube_v3.Schema$Video) {
	const thumbnail_url: string = video!.snippet?.thumbnails?.high?.url!
	const height: number = video?.snippet?.thumbnails?.high?.height!
	const width: number = video?.snippet?.thumbnails?.high?.width!
	return (
		<div>
			<Image
				src={thumbnail_url}
				height={height}
				width={width}
				alt='Video thumbnail'
			/>
			<h2>{video.snippet?.title}</h2>
			<p>Category: {video.snippet?.categoryId}</p>
			<p>Views: {video.statistics?.viewCount}</p>
			<p>Likes: {video.statistics?.likeCount}</p>
			<p>Dislikes: {video.statistics?.dislikeCount}</p>
		</div>
	)
}

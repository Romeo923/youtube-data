import React from "react";
import { youtube_v3 } from "googleapis";
import Image from "next/image";
import Link from "next/link";
export default function YoutubeVideo(video: any) {
  const thumbnail_url: string = video!.snippet?.thumbnails?.high?.url!;
  const height: number = video?.snippet?.thumbnails?.high?.height!;
  const width: number = video?.snippet?.thumbnails?.high?.width!;
  return (
    <>
      <Link href={`/channels/${video?.snippet?.channelId}`}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <Image
            src={thumbnail_url}
            height={height}
            width={width}
            alt="Video thumbnail"
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="flex gap-x-4">
          <Image
            className="h-12 w-12 flex-none rounded-full bg-gray-50 mx-2"
            src={video?.channelThumbnail}
            alt={video?.snippet?.channelTitle}
            width={100}
            height={100}
          />

          <div className="min-w-0 flex-auto">
            <h3 className="mt-4 text-sm text-gray-700">
              {video.snippet?.title}
            </h3>
            <p className="text-sm font-semibold leading-6 text-gray-900 mx-2">
              {video?.snippet?.channelTitle}
            </p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              views: {video.statistics?.viewCount}
            </p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              likes: {video.statistics?.likeCount}
            </p>
            {/* <p className="mt-1 text-lg font-medium text-gray-900">
        Category: {video.snippet?.categoryId}
      </p> */}
          </div>
        </div>
      </Link>
    </>
  );
}

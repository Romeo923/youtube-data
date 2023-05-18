"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const Playlist = ({ channelData }: any) => {
  const [playlists, setPlaylists] = useState<any>([]);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?key=${process.env.NEXT_PUBLIC_API_KEY}&part=snippet,status,player,localizations,contentDetails&channelId=${channelData?.id}`
      );
      const data = await res.json();
      setPlaylists(data.items);
    };

    loadData();
  }, []);
  return (
    <>
      <h3 className="text-lg mt-5 mb-5 text-center font-bold  text-gray-900">
        Playlist Information
      </h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {playlists.length > 0 &&
          playlists.map((playlist: any) => {
            return (
              <Link key={playlist.id} href={`/songs/${playlist?.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    src={playlist?.snippet?.thumbnails?.default?.url}
                    height={100}
                    width={100}
                    alt="Video thumbnail"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>

                <div className="min-w-0 flex-auto">
                  <h3 className="mt-4 text-sm text-gray-700">
                    {playlist.snippet?.title}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-gray-900 mx-2">
                    {playlist?.snippet?.description}
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    Created At : {playlist.snippet?.publishedAt}
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    No of videos : {playlist.contentDetails?.itemCount}
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    Status : {playlist.status?.privacyStatus}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Playlist;

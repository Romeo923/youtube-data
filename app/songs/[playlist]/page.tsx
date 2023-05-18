"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
const SongList = ({ params }: any) => {
  const [songLists, setSongLists] = useState<any>([]);
  const [pageToken, setPageToken] = useState("");
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?key=${process.env.NEXT_PUBLIC_API_KEY}&part=snippet&playlistId=${params?.playlist}`
      );
      const data = await res.json();
      setSongLists(data.items);
      setPageToken(data?.nextPageToken);
    };

    loadData();
  }, []);
  const loadMore = async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${params?.playlist}&pageToken=${pageToken}&key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data: any = await res.json();
    setSongLists([...songLists, ...data?.items]);

    setPageToken(data?.nextPageToken);
  };
  return (
    <>
      <h3 className="text-lg mt-5 mb-5 text-center font-bold  text-gray-900">
        Songs Information
      </h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {songLists.length > 0 &&
          songLists.map((song: any) => {
            return (
              <Link key={song.id} href={`/songs/${song?.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    src={song?.snippet?.thumbnails?.default?.url}
                    height={100}
                    width={100}
                    alt="Video thumbnail"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>

                <div className="min-w-0 flex-auto">
                  <h3 className="mt-4 text-sm text-gray-700">
                    {song.snippet?.title}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-gray-900 mx-2">
                    {song?.snippet?.description.substring(0, 200)}
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    Created At : {song.snippet?.publishedAt}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
      {songLists?.length > 0 && (
        <div className="flex flex-1 justify-center my-2">
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default SongList;

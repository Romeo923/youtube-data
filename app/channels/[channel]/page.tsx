"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ChannelSubscriptions from "@/components/ChannelSubscriptions";
const Channel = ({ params }: any) => {
  const [channelData, setChannelData] = useState<any>(null);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?key=${process.env.NEXT_PUBLIC_API_KEY}&part=snippet,statistics,contentDetails,contentOwnerDetails,brandingSettings&id=${params?.channel}`
      );
      const data = await res.json();
      setChannelData(data.items[0]);
    };

    loadData();
  }, []);
  return (
    <>
      {channelData !== null && (
        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-500 py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-white text-2xl">Channel Detail Page</h1>
            </div>
          </header>

          <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md p-8 ">
              <Image
                src={channelData?.brandingSettings?.image?.bannerExternalUrl}
                alt="Channel Thumbnail"
                width={1000}
                height={10}
                quality={100}
                className="rounded mx-auto"
              />

              <div className="flex justify-around">
                <Image
                  src={channelData?.snippet?.thumbnails?.default?.url}
                  height={88}
                  width={88}
                  alt="Channel Banner"
                  className="rounded mt-5"
                />
                <div className="mt-5">
                  <h2 className="text-2xl font-bold mb-4">
                    {channelData?.snippet?.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {" "}
                    {channelData?.snippet?.description}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {" "}
                    Created Date: {channelData?.snippet?.publishedAt}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="mt-6  border-gray-100">
                  <h3 className="text-base ml-5 font-semibold  text-gray-900">
                    Statistics Information
                  </h3>
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Views Count
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {channelData?.statistics.viewCount}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Subscriber Count
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {channelData?.statistics.subscriberCount}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Video Count
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {channelData?.statistics.videoCount}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <ChannelSubscriptions channelData={channelData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Channel;

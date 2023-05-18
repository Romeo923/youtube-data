"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  console.log(channelData, "cc");
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
            <div className="bg-white shadow-md p-8">
              <Image
                src={channelData?.brandingSettings?.image?.bannerExternalUrl}
                alt="Channel Thumbnail"
                width={1200}
                height={10}
                quality={100}
                className="rounded"
              />

              <div className="flex justify-between">
                <Image
                  src={channelData?.snippet?.thumbnails?.default?.url}
                  height={88}
                  width={88}
                  alt="Channel Banner"
                  className="rounded"
                />
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {channelData?.snippet?.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {" "}
                    {channelData?.snippet?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Channel;

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ChannelSubscriptions = ({ channelData }: any) => {
  const [subscriptions, setSubscriptions] = useState<any>([]);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/subscriptions?key=${process.env.NEXT_PUBLIC_API_KEY}&part=snippet,contentDetails,subscriberSnippet&channelId=${channelData?.id}`
      );
      const data = await res.json();
      setSubscriptions(data.items);
    };

    loadData();
  }, []);
  return (
    <>
      <h3 className="text-lg mt-5 mb-5 text-center font-bold  text-gray-900">
        Subscription Information
      </h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {subscriptions.length > 0 &&
          subscriptions.map((subscription: any) => {
            return (
              <div key={subscription.id}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <Image
                    src={subscription?.snippet?.thumbnails?.default?.url}
                    height={100}
                    width={100}
                    alt="Video thumbnail"
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>

                <div className="min-w-0 flex-auto">
                  <h3 className="mt-4 text-sm text-gray-700">
                    {subscription.snippet?.title}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-gray-900 mx-2">
                    {subscription?.snippet?.description}
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    Created At : {subscription.snippet?.publishedAt}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ChannelSubscriptions;

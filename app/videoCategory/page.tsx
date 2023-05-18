"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
const VideoCategory = ({ params }: any) => {
  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videoCategories?key=${process.env.NEXT_PUBLIC_API_KEY}&part=snippet&regionCode=NP`
      );
      const data = await res.json();
      setCategories(data.items);
    };

    loadData();
  }, []);
  return (
    <>
      {" "}
      <h2 className="text-center mt-5 mb-5 font-bold">Videos Categories</h2>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {categories.length > 0 &&
            categories.map((category: any) => {
              return (
                <div key={category.id}>
                  <h3>{category?.snippet?.title}</h3>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default VideoCategory;

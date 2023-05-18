"use client";
import { useState, useEffect } from "react";
import Search from "@/components/Search";
import YoutubeVideo from "@/components/YoutubeVideo";
import LoadingPage from "../loading";
import { useRouter } from "next/navigation";
const Home = () => {
  const router = useRouter();
  const [videos, setVideos] = useState<any>([]);
  const [pageToken, setPageToken] = useState();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=id,snippet,statistics&chart=mostPopular&maxResults=48&key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const data = await res.json();
      const updatedData: any = await Promise.all(
        data?.items.map(async (video: any) => {
          const res = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${video.snippet.channelId}&key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const data = await res.json();
          video.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
          return video;
        })
      );
      setVideos(updatedData);
      setLoading(false);
      setPageToken(data?.nextPageToken);
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const searchVideos = async () => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=48&q=${query}&type=video&key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const data = await res.json();
      const updatedData: any = await Promise.all(
        data?.items.map(async (video: any) => {
          const res = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video?.id?.videoId}&key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const data = await res.json();
          video.statistics = data?.items[0].statistics;
          video.id = video?.id?.videoId;
          return video;
        })
      );
      setVideos(updatedData);
      setLoading(false);
      setPageToken(data?.pageToken);
    };
    if (query.trim().length > 0) {
      searchVideos();
    }
  }, [query]);

  const loadMore = async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=id,snippet,statistics&chart=mostPopular&maxResults=48&pageToken=${pageToken}&type=video&key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data: any = await res.json();
    setVideos([...videos, ...data?.items]);
    setLoading(false);
    setPageToken(data?.nextPageToken);
  };

  if (loading) {
    return <LoadingPage />;
  }

  const navigateToChannel = () => {
    router.push("/channels");
  };
  return (
    <>
      <div className="flex flex-1 justify-center my-2">
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={navigateToChannel}
        >
          View Channels
        </button>
      </div>
      <section>
        <div className="bg-white">
          <Search query={query} setQuery={setQuery} />
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Videos</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {videos.length > 0 &&
                videos.map((video: any) => {
                  return (
                    <div key={video.id}>
                      <YoutubeVideo {...video} />
                    </div>
                  );
                })}
            </div>
          </div>
          {videos?.length > 0 && (
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
        </div>
      </section>
    </>
  );
};

export default Home;

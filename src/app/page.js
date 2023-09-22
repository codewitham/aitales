'use client'
import React, { useEffect, useState } from 'react';
import StoryCard from '@/components/StoryCard';
import { ProgressBar } from 'react-loader-spinner';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setloading(true)
      try {
        const res = await fetch('/api/story');

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setStories(data.stories);
        } else {
          console.error('Failed to fetch stories');
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
      finally {
        setloading(false)
      }
    };

    fetchData();
  }, []);

  return (
    <div className='min-h-screen p-5'>
      {loading ? (
        <div className='h-full w-full flex items-center justify-center p-5'>
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor='#F4442E'
            barColor='#51E5FF'
          />
        </div>
      ) :
        <div className=" max-w-[1200px] mx-auto p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories && stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      }
    </div>
  );
};

export default Home;

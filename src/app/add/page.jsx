'use client'
import React, { useState } from 'react';
import { IoSendSharp } from "react-icons/io5"
import { BsFillShareFill } from "react-icons/bs"
import { Discuss } from 'react-loader-spinner';
import { useSession } from 'next-auth/react';

const GenerateStory = () => {
    const [prompt, setPrompt] = useState('');
    const [generatedStory, setGeneratedStory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className='h-full w-full flex items-center justify-center p-5'>
                Authentication Required!
            </div>
        )
    }


    const handleGenerateStory = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (response.ok) {
                const { story } = await response.json();
                setGeneratedStory(story);
            } else {
                console.error('Failed to generate story');
            }
        } catch (error) {
            console.error('Error generating story:', error);
        } finally {
            setIsLoading(false)
        }
    };

    const handleShareStory = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session?.user?.id,
                    prompt,
                    story: generatedStory,
                }),
            });

            if (response.ok) {
                console.log('Story shared successfully.');
            } else {
                console.error('Failed to share story');
            }
        } catch (error) {
            console.error('Error sharing story:', error);
        } finally {
            setIsLoading(false)
            setPrompt("")
            setGeneratedStory("")
        }
    };

    return (
        <div className='flex flex-col gap-5 max-w-[700px] mx-auto p-5 h-full'>
            <div className='w-full rounded-lg p-3 h-[500px] overflow-scroll bg-white bg-opacity-5  border border-gray-500'>
                {isLoading ? (
                    <div className='h-full w-full flex items-center justify-center p-5'>
                        <Discuss
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="comment-loading"
                            wrapperStyle={{}}
                            wrapperClass="comment-wrapper"
                            color="#fff"
                            backgroundColor="white"
                        />
                    </div>
                ) : (
                    <p style={{ fontFamily: "inherit" }}>
                        {generatedStory && generatedStory}
                    </p>
                )}
            </div>
            <form onSubmit={handleGenerateStory} className='flex gap-3 items-center rounded-lg p-1 w-full bg-white bg-opacity-5  border border-gray-500'>
                <input type="text" name="prompt" onChange={e => setPrompt(e.target.value)} value={prompt} placeholder='enter prompt...' className=' outline-none p-2 bg-transparent flex-1' />
                <button className=' text-secondary p-2 rounded-lg'><IoSendSharp /></button>
            </form>
            {generatedStory && <button className='px-3 py-2 secondary-bg w-fit rounded-md inline-block' onClick={handleShareStory}>share<BsFillShareFill className='ml-2 inline-block' /></button>}
        </div>
    );
};

export default GenerateStory;

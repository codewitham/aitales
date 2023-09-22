import moment from 'moment';
import React, { useState } from 'react';

const StoryCard = ({ story }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="border border-gray-400 rounded-lg p-4 bg-white bg-opacity-5">
            <h3 className="text-lg font-semibold">{story.prompt}</h3>
            <div className='py-2 flex gap-3 justify-between items-center text-xs text-indigo-300'>
                {moment(story.time).fromNow()}
            </div>
            <p className="text-gray-300 mt-2">{story.story.substring(0, 100)}...</p>
            <button onClick={handleOpenModal} className=' text-indigo-300 mt-3'>Read more...</button>

            {isModalOpen && (
                <div className='w-full h-screen bg-black bg-opacity-50 z-50 fixed inset-0 flex items-center justify-center p-5'>
                    <div className="max-w-[700px] max-h-[500px] flex flex-col gap-3 primary-bg p-6 rounded-lg shadow-lg overflow-y-auto">
                        <div className="text-xl font-semibold">
                            {story.prompt}
                        </div>
                        <div className="text-gray-200 overflow-y-auto">
                            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'inherit' }}>
                                {story.story}
                            </pre>
                        </div>
                        <button className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoryCard;

'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

const ReviewForm = ({ listingId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement the review submission logic here
    console.log({ listingId, rating, comment });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
      <div className="mb-4">
        <label className="block mb-2">Rating</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block mb-2">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
        ></textarea>
      </div>
      <button type="submit" className="bg-terracotta text-white py-2 px-4 rounded hover:bg-terracotta-dark transition-colors duration-300">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
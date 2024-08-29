'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const ReviewList = ({ listingId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://situ-backend-nqpg.vercel.app/api/listings/${listingId}/reviews`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [listingId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">{review.user.name}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
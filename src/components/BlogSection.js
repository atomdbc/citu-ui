import React from 'react';
import { ArrowRight } from 'lucide-react';

const BlogPostCard = ({ title, excerpt, date, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4">{excerpt}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-terracotta">{date}</span>
        <a href="#" className="text-terracotta hover:text-terracotta-dark flex items-center">
          Read more <ArrowRight size={16} className="ml-1" />
        </a>
      </div>
    </div>
  </div>
);

const BlogSection = () => {
  const blogPosts = [
    {
      title: "Top 5 Neighborhoods in Abidjan for Families",
      excerpt: "Discover the best family-friendly areas in Abidjan with great schools and amenities.",
      date: "May 15, 2023",
      image: "/images/placeholder-image.jpg"
    },
    {
      title: "How to Get the Best Mortgage Rates in Ivory Coast",
      excerpt: "Learn the insider tips to secure the most favorable mortgage terms for your new home.",
      date: "May 10, 2024",
      image: "/images/placeholder-image.jpg"
    },
    {
      title: "The Rise of Eco-Friendly Homes in West Africa",
      excerpt: "Explore the growing trend of sustainable housing and its impact on the Ivorian real estate market.",
      date: "May 5, 2024",
      image: "/images/placeholder-image.jpg"
    }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Latest from Our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPostCard key={index} {...post} />
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="#" className="inline-block bg-terracotta hover:bg-terracotta-dark text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            View All Posts
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
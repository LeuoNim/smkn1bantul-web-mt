import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  Search,
  Tag,
  ChevronRight
} from 'lucide-react';
import blogPosts from '../data/blog-posts.json';

// Featured Blog Card (Horizontal)
const FeaturedBlogCard = ({ post }) => (
  <Link 
    to={`/blog/${post.slug}`}
    className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="flex flex-col md:flex-row h-full">
      {/* Image */}
      <div className="md:w-2/5 relative overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/20"></div>
      </div>
      
      {/* Content */}
      <div className="md:w-3/5 p-6 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-gray-400 mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        </div>
        
        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.date).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {post.readTime}
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// Regular Blog Card (Grid)
const BlogCard = ({ post }) => (
  <Link 
    to={`/blog/${post.slug}`}
    className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl"
  >
    {/* Image */}
    <div className="relative overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
    </div>
    
    {/* Content */}
    <div className="p-6">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.slice(0, 2).map((tag) => (
          <span 
            key={tag}
            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </span>
        ))}
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
        {post.title}
      </h3>
      
      {/* Excerpt */}
      <p className="text-gray-400 mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      
      {/* Meta */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          {post.author}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {post.readTime}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <span className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(post.date).toLocaleDateString()}
        </span>
        <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
          Read More
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </Link>
);

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  
  // Convert blog posts object to array and sort by date (newest first)
  const postsArray = Object.values(blogPosts).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  
  // Get all unique tags
  const allTags = [...new Set(postsArray.flatMap(post => post.tags))];
  
  // Filter posts based on search and tag
  const filteredPosts = postsArray.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });
  
  // Get featured posts (first 3)
  const featuredPosts = filteredPosts.slice(0, 3);
  const regularPosts = filteredPosts.slice(3);

  return (
    <>
      <Helmet>
        <title>Blog - Gaming Server Insights | SapphireCloud</title>
        <meta name="description" content="Discover the latest insights, tutorials, and best practices for gaming server management, optimization, and community building." />
        <meta name="keywords" content="gaming server, minecraft server, server hosting, tutorials, guides, tips, best practices" />
      </Helmet>

      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto mb-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover the latest insights, tutorials, and best practices for gaming server management, optimization, and community building.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            {/* Tag Filter */}
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none min-w-[160px]"
            >
              <option value="">All Categories</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Articles */}
          {featuredPosts.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-white mr-3">Featured Articles</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
              </div>
              
              <div className="space-y-6">
                {featuredPosts.map((post) => (
                  <FeaturedBlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Regular Articles */}
          {regularPosts.length > 0 && (
            <section>
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-white mr-3">All Articles</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">No Articles Found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="mt-16 pt-8 border-t border-gray-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{postsArray.length}</div>
                <div className="text-gray-400">Articles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">{allTags.length}</div>
                <div className="text-gray-400">Categories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {[...new Set(postsArray.map(post => post.author))].length}
                </div>
                <div className="text-gray-400">Authors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">
                  {postsArray.reduce((total, post) => total + parseInt(post.readTime.split(' ')[0]), 0)}
                </div>
                <div className="text-gray-400">Total Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
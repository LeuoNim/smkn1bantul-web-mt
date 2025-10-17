import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Tag,
  Share2,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import blogPosts from '../data/blog-posts.json';

// Related Articles Card
const RelatedArticleCard = ({ post }) => (
  <Link 
    to={`/blog/${post.slug}`}
    className="group block bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
  >
    <img
      src={post.image}
      alt={post.title}
      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
    />
    <div className="p-4">
      <h4 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
        {post.title}
      </h4>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>{post.author}</span>
        <span>{post.readTime}</span>
      </div>
    </div>
  </Link>
);

// Table of Contents
const TableOfContents = ({ content }) => {
  const headings = content.match(/^##\s+(.*)$/gm) || [];
  
  if (headings.length === 0) return null;

  return (
    <div className="bg-gray-800/30 rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <div className="w-1 h-6 bg-blue-500 rounded mr-3"></div>
        Table of Contents
      </h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading, index) => {
            const title = heading.replace(/^##\s+/, '');
            const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            
            return (
              <li key={index}>
                <a
                  href={`#${id}`}
                  className="flex items-center text-gray-400 hover:text-blue-400 transition-colors text-sm py-1"
                >
                  <ChevronRight className="w-4 h-4 mr-2 flex-shrink-0" />
                  {title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts[slug];

  // If post not found, show 404
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-white mb-2">Article Not Found</h2>
          <p className="text-gray-400 mb-6">The article you're looking for doesn't exist or may have been moved.</p>
          <Link
            to="/blog"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related articles (same tags, different slug)
  const relatedPosts = Object.values(blogPosts)
    .filter(p => p.slug !== slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  // Convert markdown-style content to HTML-like structure
  const formatContent = (content) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        // Handle headings
        if (paragraph.startsWith('## ')) {
          const title = paragraph.replace(/^## /, '');
          const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <h2 key={index} id={id} className="text-2xl font-bold text-white mt-8 mb-4 scroll-mt-20">
              {title}
            </h2>
          );
        }
        
        if (paragraph.startsWith('### ')) {
          const title = paragraph.replace(/^### /, '');
          return (
            <h3 key={index} className="text-xl font-semibold text-white mt-6 mb-3">
              {title}
            </h3>
          );
        }

        if (paragraph.startsWith('#### ')) {
          const title = paragraph.replace(/^#### /, '');
          return (
            <h4 key={index} className="text-lg font-semibold text-white mt-4 mb-2">
              {title}
            </h4>
          );
        }

        // Handle lists
        if (paragraph.includes('\n- ')) {
          const items = paragraph.split('\n').filter(line => line.startsWith('- '));
          return (
            <ul key={index} className="list-disc list-inside space-y-1 text-gray-300 mb-4 ml-4">
              {items.map((item, i) => (
                <li key={i}>{item.replace(/^- /, '')}</li>
              ))}
            </ul>
          );
        }

        // Handle code blocks
        if (paragraph.startsWith('```')) {
          const code = paragraph.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
          return (
            <pre key={index} className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto mb-4 border border-gray-700/50">
              <code className="text-green-400 text-sm">{code}</code>
            </pre>
          );
        }

        // Handle bold text
        let formattedParagraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
        
        // Handle regular paragraphs
        if (formattedParagraph.trim()) {
          return (
            <p key={index} className="text-gray-300 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedParagraph }} />
          );
        }

        return null;
      })
      .filter(Boolean);
  };

  const shareUrl = window.location.href;
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      // You could add a toast notification here
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | SapphireCloud Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      <article className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
            <Link to="/blog" className="hover:text-blue-400 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blog?tag=${tag}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-400 mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4 border-t border-b border-gray-700/50">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-300">
                  <User className="w-5 h-5 mr-2" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-5 h-5 mr-2" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="w-5 h-5 mr-2" />
                  {post.readTime}
                </div>
              </div>
              
              <button
                onClick={handleShare}
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
              loading="lazy"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-8">
                {/* Table of Contents */}
                <TableOfContents content={post.content} />
                
                {/* Back to Blog */}
                <Link
                  to="/blog"
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Link>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-3 order-1 lg:order-2">
              <div className="prose prose-invert max-w-none">
                {formatContent(post.content)}
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{post.author}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {post.author === 'SapphireCloud Team' 
                        ? 'The SapphireCloud team is dedicated to providing the best gaming server hosting experience with expert insights and comprehensive guides for server administrators and gaming communities.'
                        : 'An experienced gaming server administrator and technical writer, sharing knowledge and best practices with the gaming community.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-8 border-t border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <RelatedArticleCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </section>
          )}

          {/* Navigation */}
          <nav className="mt-16 pt-8 border-t border-gray-700/50">
            <div className="flex justify-between items-center">
              <Link
                to="/blog"
                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Articles
              </Link>
              
              <div className="flex items-center space-x-4 text-gray-400">
                <span>Share this article:</span>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  title="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  title="Share on Twitter"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </nav>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
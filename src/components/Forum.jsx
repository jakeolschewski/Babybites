import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import sanitizeHtml from 'sanitize-html';
import { toast } from 'react-toastify';

const Forum = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = useCallback(() => {
    if (!title.trim() || !content.trim()) {
      toast.error(t('forumEmpty'));
      return;
    }
    const sanitizedTitle = sanitizeHtml(title, { allowedTags: [], allowedAttributes: {} });
    const sanitizedContent = sanitizeHtml(content, { allowedTags: [], allowedAttributes: {} });
    setPosts([...posts, { id: Date.now(), title: sanitizedTitle, content: sanitizedContent, timestamp: new Date().toISOString() }]);
    setTitle('');
    setContent('');
    toast.success(t('forumPosted'));
  }, [title, content, posts, t]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md max-w-2xl mx-auto" role="region" aria-label={t('communityForum')}>
      <h3 className="text-xl font-semibold mb-4">{t('communityForum')}</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-babyPink"
        placeholder={t('postTitle')}
        aria-label={t('postTitle')}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-babyPink"
        placeholder={t('postContent')}
        aria-label={t('postContent')}
        rows="4"
      ></textarea>
      <button onClick={handlePost} className="baby-button" aria-label={t('post')}>
        {t('post')}
      </button>
      <div className="mt-4" role="list">
        {posts.length === 0 && <p className="text-gray-600">{t('noPosts')}</p>}
        {posts.map((post) => (
          <div key={post.id} className="p-2 border-b" role="listitem">
            <h4 className="font-semibold">{post.title}</h4>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">{t('postedAt')}: {new Date(post.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;

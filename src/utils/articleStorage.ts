import { Article } from '../types/support';
import { saveNotification } from './notificationStorage';

export const saveArticle = async (article: Article): Promise<void> => {
  try {
    const storedArticles = localStorage.getItem('articles');
    const articles: Article[] = storedArticles ? JSON.parse(storedArticles) : [];
    
    const existingIndex = articles.findIndex(a => a.id === article.id);
    
    if (existingIndex >= 0) {
      articles[existingIndex] = article;
    } else {
      articles.push(article);
      
      // Notify users of new published articles
      if (article.status === 'published') {
        saveNotification({
          id: Math.random().toString(36).substr(2, 9),
          type: 'article_published',
          title: 'New Knowledge Base Article',
          message: `New article published: ${article.title}`,
          timestamp: new Date().toISOString(),
          read: false,
          articleId: article.id
        });
      }
    }
    
    localStorage.setItem('articles', JSON.stringify(articles));
  } catch (error) {
    console.error('Failed to save article:', error);
    throw new Error('Failed to save article');
  }
};

export const getArticles = (): Article[] => {
  try {
    const storedArticles = localStorage.getItem('articles');
    return storedArticles ? JSON.parse(storedArticles) : [];
  } catch (error) {
    console.error('Failed to get articles:', error);
    return [];
  }
};

export const deleteArticle = (articleId: string): void => {
  try {
    const storedArticles = localStorage.getItem('articles');
    const articles: Article[] = storedArticles ? JSON.parse(storedArticles) : [];
    const updatedArticles = articles.filter(a => a.id !== articleId);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  } catch (error) {
    console.error('Failed to delete article:', error);
    throw new Error('Failed to delete article');
  }
};

export const getPublishedArticles = (): Article[] => {
  return getArticles().filter(article => article.status === 'published');
};
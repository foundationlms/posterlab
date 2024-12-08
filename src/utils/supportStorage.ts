import { Ticket, Article } from '../types/support';
import { saveNotification } from './notificationStorage';

// Initial tickets data
const initialTickets: Ticket[] = [
  {
    id: 'T-1',
    subject: 'Cannot export poster',
    description: 'When I try to export my poster as PDF, nothing happens.',
    status: 'open',
    priority: 'high',
    category: 'Technical',
    user: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    assignedTo: undefined,
    created: '2024-03-10T10:00:00Z',
    lastUpdated: '2024-03-10T10:00:00Z',
    messages: [
      {
        id: 'M-1',
        content: 'I tried multiple times but the export button seems unresponsive.',
        sender: 'user',
        timestamp: '2024-03-10T10:00:00Z'
      }
    ]
  },
  {
    id: 'T-2',
    subject: 'Text alignment issues',
    description: 'Text is being cut off in some sections of my poster.',
    status: 'in-progress',
    priority: 'medium',
    category: 'Technical',
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    assignedTo: {
      name: 'Support Team',
      email: 'support@posterlab.com'
    },
    created: '2024-03-09T15:30:00Z',
    lastUpdated: '2024-03-10T09:15:00Z',
    messages: [
      {
        id: 'M-2',
        content: 'The text in the Results section is being cut off at the bottom.',
        sender: 'user',
        timestamp: '2024-03-09T15:30:00Z'
      },
      {
        id: 'M-3',
        content: 'We are investigating this issue. Could you please provide a screenshot?',
        sender: 'admin',
        timestamp: '2024-03-10T09:15:00Z'
      }
    ]
  }
];

// Initial articles data
const initialArticles: Article[] = [
  {
    id: 'A-1',
    title: 'Getting Started with PosterLab',
    content: `Welcome to PosterLab! This guide will help you create your first scientific poster.

1. Choose a Template
Start by selecting a template that matches your research field and preferred layout.

2. Add Your Content
Click on each section to add your content. You can include text, images, and data visualizations.

3. Customize the Design
Use the Styles tab to customize fonts, colors, and other design elements.

4. Export Your Poster
When you're done, click the Export button to download your poster in PDF format.`,
    category: 'Tutorials',
    author: 'PosterLab Team',
    status: 'published',
    views: 245,
    lastUpdated: '2024-03-01T12:00:00Z'
  },
  {
    id: 'A-2',
    title: 'Best Practices for Scientific Posters',
    content: `Create effective scientific posters with these best practices:

1. Keep it Simple
- Use clear, concise language
- Avoid jargon when possible
- Include only essential information

2. Visual Hierarchy
- Make your title prominent
- Use headings to guide readers
- Highlight key findings

3. Data Visualization
- Use clear, well-labeled graphs
- Include legends where necessary
- Maintain consistent styling

4. Layout Tips
- Use white space effectively
- Align elements consistently
- Follow a logical flow`,
    category: 'Best Practices',
    author: 'PosterLab Team',
    status: 'published',
    views: 189,
    lastUpdated: '2024-03-05T14:30:00Z'
  },
  {
    id: 'A-3',
    title: 'Troubleshooting Common Issues',
    content: `Solutions to common PosterLab issues:

1. Export Problems
- Ensure all images are properly loaded
- Check your internet connection
- Clear browser cache if needed

2. Text Issues
- Adjust font sizes if text is cut off
- Use the overflow indicators
- Check section spacing

3. Image Problems
- Use high-resolution images (300 DPI minimum)
- Check supported file formats
- Optimize large images

4. Layout Issues
- Verify template grid alignment
- Check section boundaries
- Use the preview function`,
    category: 'Troubleshooting',
    author: 'PosterLab Team',
    status: 'published',
    views: 156,
    lastUpdated: '2024-03-08T09:45:00Z'
  }
];

// Load or initialize tickets
export const getStoredTickets = (): Ticket[] => {
  try {
    const storedTickets = localStorage.getItem('tickets');
    if (!storedTickets) {
      localStorage.setItem('tickets', JSON.stringify(initialTickets));
      return initialTickets;
    }
    return JSON.parse(storedTickets);
  } catch (error) {
    console.error('Failed to get tickets:', error);
    return initialTickets;
  }
};

// Load or initialize articles
export const getStoredArticles = (): Article[] => {
  try {
    const storedArticles = localStorage.getItem('articles');
    if (!storedArticles) {
      localStorage.setItem('articles', JSON.stringify(initialArticles));
      return initialArticles;
    }
    return JSON.parse(storedArticles);
  } catch (error) {
    console.error('Failed to get articles:', error);
    return initialArticles;
  }
};

export const saveTicket = async (ticket: Ticket): Promise<void> => {
  try {
    const tickets = getStoredTickets();
    const existingIndex = tickets.findIndex(t => t.id === ticket.id);
    
    if (existingIndex >= 0) {
      tickets[existingIndex] = ticket;
    } else {
      tickets.push(ticket);
    }
    
    localStorage.setItem('tickets', JSON.stringify(tickets));

    // Create notifications for ticket updates
    if (existingIndex >= 0) {
      const existingTicket = tickets[existingIndex];
      if (existingTicket.status !== ticket.status) {
        saveNotification({
          id: Math.random().toString(36).substr(2, 9),
          type: 'ticket_update',
          title: 'Ticket Status Updated',
          message: `Ticket #${ticket.id} status changed to ${ticket.status}`,
          timestamp: new Date().toISOString(),
          read: false,
          ticketId: ticket.id,
          forUser: ticket.user.email
        });
      }
    } else {
      saveNotification({
        id: Math.random().toString(36).substr(2, 9),
        type: 'ticket_created',
        title: 'New Support Ticket',
        message: `New ticket created: ${ticket.subject}`,
        timestamp: new Date().toISOString(),
        read: false,
        ticketId: ticket.id,
        forAdmin: true
      });
    }
  } catch (error) {
    console.error('Failed to save ticket:', error);
    throw new Error('Failed to save ticket');
  }
};

export const saveArticle = async (article: Article): Promise<void> => {
  try {
    const articles = getStoredArticles();
    const existingIndex = articles.findIndex(a => a.id === article.id);
    
    if (existingIndex >= 0) {
      articles[existingIndex] = article;
    } else {
      articles.push(article);
    }
    
    localStorage.setItem('articles', JSON.stringify(articles));

    // Create notification for newly published articles
    if (article.status === 'published' && (!existingIndex || articles[existingIndex].status !== 'published')) {
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
  } catch (error) {
    console.error('Failed to save article:', error);
    throw new Error('Failed to save article');
  }
};

export const deleteTicket = (ticketId: string): void => {
  try {
    const tickets = getStoredTickets();
    const updatedTickets = tickets.filter(t => t.id !== ticketId);
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  } catch (error) {
    console.error('Failed to delete ticket:', error);
    throw new Error('Failed to delete ticket');
  }
};

export const deleteArticle = (articleId: string): void => {
  try {
    const articles = getStoredArticles();
    const updatedArticles = articles.filter(a => a.id !== articleId);
    localStorage.setItem('articles', JSON.stringify(updatedArticles));
  } catch (error) {
    console.error('Failed to delete article:', error);
    throw new Error('Failed to delete article');
  }
};

export const getPublishedArticles = (): Article[] => {
  return getStoredArticles().filter(article => article.status === 'published');
};
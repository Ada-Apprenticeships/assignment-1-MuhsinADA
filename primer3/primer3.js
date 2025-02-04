// Node class representing each post in the social media feed
class Node {
  constructor(data) {
      this.data = data;
      this.next = null;
  }
}

// Validates the timestamp format using RegEx
const isValidTimestamp = (timestamp) => {
  const pattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (!pattern.test(timestamp)) return false;
  
  const date = new Date(timestamp.replace(' ', 'T'));
  return date instanceof Date && !isNaN(date);
};

// Validates a single post object
const validatePost = (post) => {
  // Check if all required properties exist
  if (!post.text || !post.timestamp || !post.author) {
      throw new Error('Post must contain text, timestamp, and author');
  }

  // Validate property types and values
  if (typeof post.text !== 'string' || post.text.trim().length === 0) {
      throw new Error('Post text must be a non-empty string');
  }

  if (typeof post.timestamp !== 'string' || !isValidTimestamp(post.timestamp)) {
      throw new Error('Post timestamp must be a valid date string in format YYYY-MM-DD HH:MM:SS');
  }

  if (typeof post.author !== 'string' || post.author.trim().length === 0) {
      throw new Error('Post author must be a non-empty string');
  }
};

// Creates a linked list from an array of posts
export const createLinkedList = (posts) => {
  if (!Array.isArray(posts) || posts.length === 0) {
      return null;
  }

  // Validate all posts before creating the list
  posts.forEach(validatePost);

  // Create head node
  const head = new Node(posts[0]);
  let current = head;

  // Create rest of the list
  for (let i = 1; i < posts.length; i++) {
      current.next = new Node(posts[i]);
      current = current.next;
  }

  return head;
};

// Searches the social media feed for posts containing a keyword
export const searchSocialMediaFeed = (head, keyword) => {
  if (!head || typeof keyword !== 'string') {
      return [];
  }

  const results = [];
  const searchTerm = keyword.toLowerCase();
  let current = head;

  // Traverse the linked list
  while (current) {
      if (current.data.text.toLowerCase().includes(searchTerm)) {
          results.push(current.data);
      }
      current = current.next;
  }

  return results;
};
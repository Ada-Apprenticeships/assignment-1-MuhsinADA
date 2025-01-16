// Class for individual posts in social media feed
class Node {
  constructor(data) {
      this.data = data;
      this.next = null;
  }
}

// Linked list of social media posts
// with methods for creating, searching, and managing feed
class SocialMediaFeed {
  constructor() {
      this.head = null;
      this.size = 0;
  }

  // Validates the timestamp format (YYYY-MM-DD HH:MM:SS)
  #isValidTimestamp(timestamp) {
      const pattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
      if (!pattern.test(timestamp)) return false;
      
      const date = new Date(timestamp.replace(' ', 'T'));
      return date instanceof Date && !isNaN(date);
  }

  // Validates a single post
  #validatePost(post) {
      // Check if all required entries are entered
      if (!post.text || !post.timestamp || !post.author) {
          throw new Error('Post must contain text, timestamp, and author');
      }

      // Validate property types and values
      if (typeof post.text !== 'string' || post.text.trim().length === 0) {
          throw new Error('Post text must be a non-empty string');
      }

      if (typeof post.timestamp !== 'string' || !this.#isValidTimestamp(post.timestamp)) {
          throw new Error('Post timestamp must be a valid date string in format YYYY-MM-DD HH:MM:SS');
      }

      if (typeof post.author !== 'string' || post.author.trim().length === 0) {
          throw new Error('Post author must be a non-empty string');
      }
  }

  // Creates linked list from array of posts
  createFromArray(posts) {
      if (!Array.isArray(posts)) {
          throw new Error('Input must be an array of posts');
      }

      // Reset the list
      this.head = null;
      this.size = 0;

      if (posts.length === 0) {
          return this;
      }

      // Validate all posts before creating list
      posts.forEach(post => this.#validatePost(post));

      // Create head node
      this.head = new Node(posts[0]);
      let current = this.head;
      this.size = 1;

      // Create rest of list
      for (let i = 1; i < posts.length; i++) {
          current.next = new Node(posts[i]);
          current = current.next;
          this.size++;
      }

      return this;
  }

  // Adds single post to end of feed
  addPost(post) {
      this.#validatePost(post);
      
      const newNode = new Node(post);
      if (!this.head) {
          this.head = newNode;
      } else {
          let current = this.head;
          while (current.next) {
              current = current.next;
          }
          current.next = newNode;
      }
      
      this.size++;
      return this;
  }

  // Searches social media feed for keyword
  search(keyword) {
      if (!keyword || typeof keyword !== 'string') {
          return [];
      }

      const results = [];
      const searchTerm = keyword.toLowerCase();
      let current = this.head;

      while (current) {
          if (current.data.text.toLowerCase().includes(searchTerm)) {
              results.push(current.data);
          }
          current = current.next;
      }

      return results;
  }

  // Gets current size of feed
  getSize() {
      return this.size;
  }

  // Converts feed to array
  toArray() {
      const posts = [];
      let current = this.head;
      
      while (current) {
          posts.push(current.data);
          current = current.next;
      }
      
      return posts;
  }
}

// Export wrapper functions
export const createLinkedList = (posts) => {
  const feed = new SocialMediaFeed();
  feed.createFromArray(posts);
  return feed.head;
};

export const searchSocialMediaFeed = (head, keyword) => {
  const feed = new SocialMediaFeed();
  // Convert head node back to array and create new feed
  const posts = [];
  let current = head;
  while (current) {
      posts.push(current.data);
      current = current.next;
  }
  feed.createFromArray(posts);
  return feed.search(keyword);
};
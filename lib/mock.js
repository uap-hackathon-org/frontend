import { v4 as uuidv4 } from 'uuid';

// Chat mock data
export const chatUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/avatars/sarah.png',
    status: 'online',
    role: 'Career Advisor',
    lastSeen: new Date(),
  },
  {
    id: '2',
    name: 'Prof. David Lee',
    avatar: '/avatars/david.png',
    status: 'offline',
    role: 'Course Instructor',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '3',
    name: 'Tech Support',
    avatar: '/avatars/support.png',
    status: 'online',
    role: 'Support Team',
    lastSeen: new Date(),
  },
  {
    id: '4',
    name: 'Job Opportunities',
    avatar: '/avatars/jobs.png',
    status: 'online',
    role: 'Job Alerts',
    lastSeen: new Date(),
    isGroup: true,
    members: 12,
  },
  {
    id: '5',
    name: 'Web Development 101',
    avatar: '/avatars/webdev.png',
    status: 'online',
    role: 'Class Group',
    lastSeen: new Date(),
    isGroup: true,
    members: 24,
  },
];

export const chatMessages = {
  '1': [
    {
      id: uuidv4(),
      senderId: '1',
      content: 'Hello! How is your job search going? Have you applied to the positions we discussed last week?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: 'Hi Sarah! Yes, I submitted applications to three companies. One of them already invited me for an interview next week!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 15), // 15 minutes after previous message
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '1',
      content: "That's fantastic news! Do you need help preparing for the interview? We could schedule a mock interview session if you'd like.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 30), // 1 day ago + 30 min
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: 'That would be really helpful. When are you available for a mock interview?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 35), // 5 min after previous message
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '1',
      content: 'I can do tomorrow at 3 PM or Friday at 10 AM. Which works better for you?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
    },
  ],
  '2': [
    {
      id: uuidv4(),
      senderId: '2',
      content: 'Just a reminder that your final project is due next week. Please make sure to submit it on time.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: 'Professor, I had a question about the project requirements. Can I use external libraries or should I code everything from scratch?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 45), // 45 minutes after previous message
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '2',
      content: 'You can use external libraries, but make sure to document which ones you used and explain why. The focus should be on demonstrating your understanding of the core concepts.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: "Thank you, that clarifies things. I'll start working on it right away.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 10), // 10 minutes after previous message
      read: true,
    },
  ],
  '3': [
    {
      id: uuidv4(),
      senderId: '3',
      content: 'Hello, thanks for contacting tech support. How can we help you today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: "I'm having trouble accessing the course materials for Web Development 101. When I click on the link, it says 'Access Denied'.",
      timestamp: new Date(Date.now() - 1000 * 60 * 28), // 28 minutes ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '3',
      content: "I'll check that for you right away. Can you please confirm your student ID so I can verify your enrollment?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: 'My student ID is STU-2023-45678',
      timestamp: new Date(Date.now() - 1000 * 60 * 24), // 24 minutes ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '3',
      content: "Thanks for providing your ID. I've checked our system, and it looks like there was a temporary glitch. I've reset your access permissions. Could you please try accessing the materials again and let me know if it works?",
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
      read: false,
    },
  ],
  '4': [
    {
      id: uuidv4(),
      senderId: '4',
      content: '[JOB ALERT] New position available: Junior Web Developer at TechSolutions Inc. Requirements: HTML, CSS, JavaScript, React. Apply by June 15.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '4',
      content: '[JOB ALERT] Virtual Career Fair happening next Wednesday. Companies hiring: Google, Microsoft, Amazon, and 15 more tech companies. Register now!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '4',
      content: '[JOB ALERT] New internship opportunity: Data Science Intern at AnalyticsPro. Perfect for students completing our Data Science 101 course. Limited spots available.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      read: false,
    },
  ],
  '5': [
    {
      id: uuidv4(),
      senderId: '2', // Professor
      content: 'Welcome to Web Development 101! Use this group chat to discuss assignments, share resources, and ask questions.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: 'user-101',
      content: 'Does anyone have recommendations for good CSS frameworks to use for the final project?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
      userName: 'Alex Chen',
    },
    {
      id: uuidv4(),
      senderId: 'user-102',
      content: 'I really like Tailwind CSS! The utility-first approach makes it super easy to customize components.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30), // 30 minutes after previous message
      read: true,
      userName: 'Maya Patel',
    },
    {
      id: uuidv4(),
      senderId: 'user-103',
      content: 'Bootstrap is also a good option if you want something with pre-built components that are easy to use.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 45), // 15 minutes after previous message
      read: true,
      userName: 'Jordan Smith',
    },
    {
      id: uuidv4(),
      senderId: 'currentUser',
      content: "Thanks for the suggestions! I'll take a look at both Tailwind and Bootstrap to see which one works better for my project.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
      read: true,
    },
    {
      id: uuidv4(),
      senderId: '2', // Professor
      content: 'Just a reminder that we have a guest speaker tomorrow discussing real-world web development practices. Attendance is highly recommended!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      read: true,
    },
  ],
};

export const currentUser = {
  id: 'currentUser',
  name: 'You',
  avatar: '/avatars/user.png',
  status: 'online',
};

// Function to get unread messages count
export function getUnreadCount(userId) {
  if (!chatMessages[userId]) return 0;
  return chatMessages[userId].filter(msg => !msg.read && msg.senderId !== 'currentUser').length;
}

// Function to get total unread messages count
export function getTotalUnreadCount() {
  return Object.keys(chatMessages).reduce((total, userId) => {
    return total + getUnreadCount(userId);
  }, 0);
}

// Function to format timestamp
export function formatMessageTime(timestamp) {
  const now = new Date();
  const messageDate = new Date(timestamp);
  
  const isToday = messageDate.getDate() === now.getDate() &&
                 messageDate.getMonth() === now.getMonth() &&
                 messageDate.getFullYear() === now.getFullYear();
                 
  const isYesterday = messageDate.getDate() === now.getDate() - 1 &&
                     messageDate.getMonth() === now.getMonth() &&
                     messageDate.getFullYear() === now.getFullYear();
  
  if (isToday) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (isYesterday) {
    return 'Yesterday';
  } else {
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
}

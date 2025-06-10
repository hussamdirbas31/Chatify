// types/chat.ts
export interface User {
  id: string;
  name: string;
  avatar?: string;
  isBlocked?: boolean;
}

export interface Group {
  id: string;
  name: string;
  avatar?: string;
  members: string[]; // user IDs
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'video' | 'file';
}

export interface Chat {
  id: string; // Matches either user ID (for 1:1) or group ID
  type: 'user' | 'group';
  participants: string[]; // user IDs
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

// Updated mock data with full privacy (no status or last seen)
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Ahmed Mohamed',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 'user2',
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 'user3',
    name: 'Mohammed Ali'
  },
  {
    id: 'user4',
    name: 'Lina Smith',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    id: 'user5',
    name: 'Omar Khan',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    isBlocked: true
  }
];

// Groups remain unchanged as they don't contain status information
export const mockGroups: Group[] = [
  {
    id: 'group1',
    name: 'Work Team',
    members: ['user1', 'user2', 'user4'],
    createdAt: new Date('2023-01-10T09:00:00Z')
  },
  {
    id: 'group2',
    name: 'Friends',
    members: ['user1', 'user3', 'user4'],
    createdAt: new Date('2022-11-15T14:30:00Z')
  },
  {
    id: 'group3',
    name: 'Family',
    members: ['user1', 'user2', 'user3', 'user4'],
    createdAt: new Date('2022-10-05T08:15:00Z')
  }
];

// Chats remain unchanged as they don't contain status information
export const mockChats: Chat[] = [
  // User chat with Sarah Johnson (user2)
  {
    id: 'user2',
    type: 'user',
    participants: ['user1', 'user2'],
    messages: [
      {
        id: 'msg1',
        senderId: 'user2',
        content: 'Hey there! How are you?',
        timestamp: new Date(Date.now() - 1800000), // 30 mins ago
        isRead: true,
        type: 'text'
      },
      {
        id: 'msg2',
        senderId: 'user1',
        content: "I'm good, thanks! How about you?",
        timestamp: new Date(Date.now() - 1500000), // 25 mins ago
        isRead: true,
        type: 'text'
      },
      {
        id: 'msg3',
        senderId: 'user2',
        content: 'Doing well! Just wanted to check in.',
        timestamp: new Date(Date.now() - 600000), // 10 mins ago
        isRead: false,
        type: 'text'
      }
    ],
    lastMessage: {
      id: 'msg3',
      senderId: 'user2',
      content: 'Doing well! Just wanted to check in.',
      timestamp: new Date(Date.now() - 600000),
      isRead: false,
      type: 'text'
    },
    unreadCount: 1
  },
  // User chat with Mohammed Ali (user3)
  {
    id: 'user3',
    type: 'user',
    participants: ['user1', 'user3'],
    messages: [
      {
        id: 'msg4',
        senderId: 'user1',
        content: 'Hi Mohammed, how are you doing?',
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        isRead: true,
        type: 'text'
      },
      {
        id: 'msg5',
        senderId: 'user3',
        content: 'Hello! I was busy with work',
        timestamp: new Date(Date.now() - 165600000), // 1.9 days ago
        isRead: true,
        type: 'text'
      }
    ],
    lastMessage: {
      id: 'msg5',
      senderId: 'user3',
      content: 'Hello! I was busy with work',
      timestamp: new Date(Date.now() - 165600000),
      isRead: true,
      type: 'text'
    },
    unreadCount: 0
  },
  // Group chat with Work Team (group1)
  {
    id: 'group1',
    type: 'group',
    participants: ['user1', 'user2', 'user4'],
    messages: [
      {
        id: 'msg6',
        senderId: 'user4',
        content: 'Team meeting at 3pm today',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        isRead: true,
        type: 'text'
      },
      {
        id: 'msg7',
        senderId: 'user1',
        content: "Got it, I'll be there",
        timestamp: new Date(Date.now() - 82800000), // 23 hours ago
        isRead: true,
        type: 'text'
      },
      {
        id: 'msg8',
        senderId: 'user2',
        content: 'Can we discuss the new project?',
        timestamp: new Date(Date.now() - 79200000), // 22 hours ago
        isRead: true,
        type: 'text'
      },
      {
        id: 'msg9',
        senderId: 'user4',
        content: 'check-this-out.jpg',
        timestamp: new Date(Date.now() - 75600000), // 21 hours ago
        isRead: true,
        type: 'image'
      }
    ],
    lastMessage: {
      id: 'msg9',
      senderId: 'user4',
      content: 'check-this-out.jpg',
      timestamp: new Date(Date.now() - 75600000),
      isRead: true,
      type: 'image'
    },
    unreadCount: 0
  },
  // Group chat with Friends (group2)
  {
    id: 'group2',
    type: 'group',
    participants: ['user1', 'user3', 'user4'],
    messages: [
      {
        id: 'msg10',
        senderId: 'user1',
        content: "Who's up for lunch tomorrow?",
        timestamp: new Date(Date.now() - 43200000), // 12 hours ago
        isRead: true,
        type: 'text'
      },
      {
        id: 'msg11',
        senderId: 'user4',
        content: "I'm in!",
        timestamp: new Date(Date.now() - 39600000), // 11 hours ago
        isRead: true,
        type: 'text'
      }
    ],
    lastMessage: {
      id: 'msg11',
      senderId: 'user4',
      content: "I'm in!",
      timestamp: new Date(Date.now() - 39600000),
      isRead: true,
      type: 'text'
    },
    unreadCount: 0
  }
];
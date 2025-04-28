// mock/mockData.ts

import type { 
  PublicUser, 
  FriendRequest, 
  Post, 
  Notification, 
  Message, 
  Conversation, 
  FriendshipStatus 
} from './types/types';

export const mockUsers: PublicUser[] = [
  {
    id: 'user_1',
    username: 'johndoe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/avatars/john.jpg',
    coverImage: '/covers/john.jpg',
    bio: 'Senior Frontend Developer | React Specialist',
    following: ['user_2', 'user_3', 'user_4'],
    followers: ['user_2', 'user_3', 'user_5'],
    friendshipStatus: 'none',
    interests: ['Programming', 'Photography', 'Travel'],
    skills: ['React', 'TypeScript', 'Node.js'],
    lastActive: new Date().toISOString(),
    mutualFriends: 5,
    joinedAt: '2022-01-15T10:00:00Z',
    isVerified: true,
    online: true
  },
  {
    id: 'user_2',
    username: 'alicesmith',
    name: 'Alice Smith',
    email: 'alice@example.com',
    avatar: '/avatars/alice.jpg',
    bio: 'UX/UI Designer | Creative Thinker',
    following: ['user_1', 'user_3'],
    followers: ['user_1', 'user_4'],
    friendshipStatus: 'friend',
    interests: ['Design', 'Art', 'Music'],
    lastActive: new Date().toISOString(),
    mutualFriends: 3,
    joinedAt: '2022-03-20T14:30:00Z',
    online: true
  },
  {
    id: 'user_3',
    username: 'bobjohnson',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: '/avatars/bob.jpg',
    bio: 'Backend Developer | Database Expert',
    following: ['user_1'],
    followers: ['user_1', 'user_2'],
    friendshipStatus: 'pending',
    interests: ['Databases', 'Server Architecture', 'Gaming'],
    skills: ['Python', 'Django', 'PostgreSQL'],
    lastActive: '2023-06-15T14:25:00Z',
    mutualFriends: 2,
    joinedAt: '2022-05-10T08:45:00Z',
    online: false
  },
  {
    id: 'user_4',
    username: 'emilywilson',
    name: 'Emily Wilson',
    email: 'emily@example.com',
    avatar: '/avatars/emily.jpg',
    bio: 'Full Stack Developer | Open Source Contributor',
    following: ['user_1'],
    followers: ['user_2'],
    friendshipStatus: 'none',
    interests: ['Open Source', 'Machine Learning', 'Hiking'],
    lastActive: '2023-06-15T13:45:00Z',
    mutualFriends: 1,
    joinedAt: '2022-07-05T11:20:00Z',
    online: false
  },
  {
    id: 'user_5',
    username: 'michaelbrown',
    name: 'Michael Brown',
    email: 'michael@example.com',
    avatar: '/avatars/michael.jpg',
    bio: 'Mobile Developer | Flutter Enthusiast',
    following: [],
    followers: ['user_1'],
    friendshipStatus: 'rejected',
    interests: ['Mobile Apps', 'Flutter', 'Photography'],
    skills: ['Dart', 'Flutter', 'Firebase'],
    lastActive: new Date().toISOString(),
    mutualFriends: 0,
    joinedAt: '2022-09-12T16:40:00Z',
    online: true
  }
];

export const mockFriendRequests: FriendRequest[] = [
  {
    id: 'fr_1',
    senderId: 'user_2',
    receiverId: 'user_1',
    status: 'accepted',
    createdAt: '2023-01-10T10:30:00Z',
    updatedAt: '2023-01-11T09:15:00Z'
  },
  {
    id: 'fr_2',
    senderId: 'user_3',
    receiverId: 'user_1',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    message: 'Hey! Let\'s connect on the platform'
  },
  {
    id: 'fr_3',
    senderId: 'user_5',
    receiverId: 'user_1',
    status: 'declined',
    createdAt: '2023-04-15T11:45:00Z',
    updatedAt: '2023-04-16T10:30:00Z'
  },
  {
    id: 'fr_4',
    senderId: 'user_1',
    receiverId: 'user_4',
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

export const mockPosts: Post[] = [
  {
    id: 'post_1',
    userId: 'user_1',
    content: 'Just launched my new portfolio website! Check it out and let me know what you think. #webdev #portfolio',
    createdAt: '2023-06-10T15:30:00Z',
    isPublic: true,
    likes: ['user_2', 'user_3'],
    comments: [
      {
        id: 'comment_1',
        userId: 'user_2',
        content: 'Looks amazing! Great work John!',
        createdAt: '2023-06-10T16:45:00Z',
        likes: ['user_1']
      }
    ],
    images: [
      {
        id: 'img_1',
        url: '/posts/portfolio.jpg',
        alt: 'Portfolio screenshot',
        width: 1200,
        height: 630
      }
    ],
    tags: ['webdev', 'portfolio']
  },
  {
    id: 'post_2',
    userId: 'user_2',
    content: 'Working on a new design system for our project. Excited to share the results soon!',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    isPublic: true,
    likes: ['user_1', 'user_4'],
    comments: [],
    tags: ['design', 'ux']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    userId: 'user_1',
    type: 'friend_request',
    relatedUserId: 'user_3',
    isRead: false,
    createdAt: '2023-06-05T14:20:00Z'
  },
  {
    id: 'notif_2',
    userId: 'user_1',
    type: 'post_like',
    relatedUserId: 'user_2',
    relatedPostId: 'post_1',
    isRead: true,
    createdAt: '2023-06-10T15:45:00Z'
  },
  {
    id: 'notif_3',
    userId: 'user_1',
    type: 'comment',
    relatedUserId: 'user_2',
    relatedPostId: 'post_1',
    isRead: false,
    createdAt: '2023-06-10T16:45:00Z'
  },
  {
    id: 'notif_4',
    userId: 'user_1',
    type: 'message',
    relatedUserId: 'user_2',
    relatedMessageId: 'msg_2',
    isRead: false,
    createdAt: new Date().toISOString()
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    participants: ['user_1', 'user_2'],
    lastMessageId: 'msg_3',
    lastMessage: 'Want to collaborate on the new project?',
    lastMessageTime: new Date(Date.now() - 1800000).toISOString(),
    unreadCount: 0,
    createdAt: '2023-06-10T09:00:00Z',
    updatedAt: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: 'conv_2',
    participants: ['user_1', 'user_3'],
    lastMessageId: 'msg_5',
    lastMessage: 'Sure, I\'ll check it this afternoon',
    lastMessageTime: new Date(Date.now() - 86400000).toISOString(),
    unreadCount: 2,
    createdAt: '2023-06-12T11:20:00Z',
    updatedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'conv_3',
    participants: ['user_1', 'user_5'],
    lastMessageId: 'msg_7',
    lastMessage: 'No problem! Let me know if you need help with Flutter',
    lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
    unreadCount: 1,
    createdAt: '2023-06-14T16:10:00Z',
    updatedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'conv_4',
    participants: ['user_1', 'user_2', 'user_3', 'user_4'],
    lastMessageId: 'msg_8',
    lastMessage: 'Meeting at 3pm tomorrow',
    lastMessageTime: new Date().toISOString(),
    unreadCount: 0,
    isGroup: true,
    groupName: 'Project Team',
    groupAvatar: '/groups/project-team.jpg',
    createdAt: '2023-06-01T10:00:00Z',
    updatedAt: new Date().toISOString()
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg_1',
    senderId: 'user_1',
    receiverId: 'user_2',
    content: 'Hey Alice! How are you?',
    timestamp: '2023-06-10T09:05:00Z',
    read: true,
    status: 'read'
  },
  {
    id: 'msg_2',
    senderId: 'user_2',
    receiverId: 'user_1',
    content: 'Hi John! I\'m good, thanks!',
    timestamp: '2023-06-10T09:10:00Z',
    read: true,
    status: 'read'
  },
  {
    id: 'msg_3',
    senderId: 'user_1',
    receiverId: 'user_2',
    content: 'Want to collaborate on the new project?',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    read: true,
    status: 'read'
  },
  {
    id: 'msg_4',
    senderId: 'user_1',
    receiverId: 'user_3',
    content: 'Hey Bob, can you review my PR?',
    timestamp: '2023-06-12T11:25:00Z',
    read: false,
    status: 'delivered'
  },
  {
    id: 'msg_5',
    senderId: 'user_3',
    receiverId: 'user_1',
    content: 'Sure, I\'ll check it this afternoon',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: false,
    status: 'delivered'
  },
  {
    id: 'msg_6',
    senderId: 'user_5',
    receiverId: 'user_1',
    content: 'Thanks for connecting!',
    timestamp: '2023-06-14T16:15:00Z',
    read: false,
    status: 'delivered',
    reactions: { 'user_1': '👍' }
  },
  {
    id: 'msg_7',
    senderId: 'user_1',
    receiverId: 'user_5',
    content: 'No problem! Let me know if you need help with Flutter',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: true,
    status: 'read'
  },
  {
    id: 'msg_8',
    senderId: 'user_2',
    conversationId: 'conv_4',
    content: 'Meeting at 3pm tomorrow',
    timestamp: new Date().toISOString(),
    read: true,
    status: 'read'
  },
  {
    id: 'msg_9',
    senderId: 'user_1',
    conversationId: 'conv_4',
    content: 'I\'ll be there',
    timestamp: new Date().toISOString(),
    read: true,
    status: 'read'
  },
  {
    id: 'msg_10',
    senderId: 'user_1',
    receiverId: 'user_2',
    content: 'Check out this design I made',
    timestamp: new Date().toISOString(),
    read: false,
    status: 'sent',
    type: 'image',
    fileUrl: '/messages/design.jpg'
  }
];

// Helper functions
export function getCurrentUser(): PublicUser {
  return mockUsers[0];
}

export function getUserById(id: string): PublicUser | undefined {
  return mockUsers.find(user => user.id === id);
}

export function getFriendRequestsForUser(userId: string): FriendRequest[] {
  return mockFriendRequests.filter(
    req => req.receiverId === userId || req.senderId === userId
  );
}

export function getFriends(userId: string): PublicUser[] {
  const user = getUserById(userId);
  if (!user) return [];
  
  return mockUsers.filter(u => 
    u.id !== userId && 
    user.following.includes(u.id) && 
    u.following.includes(userId)
  ).map(u => ({
    ...u,
    friendshipStatus: 'friend' as FriendshipStatus,
    online: mockUsers.find(user => user.id === u.id)?.online || false
  }));
}

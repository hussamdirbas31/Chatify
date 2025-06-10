export type FriendshipStatus = 'none' | 'pending' | 'friend' | 'rejected';

export interface PublicUser {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  following: string[];
  followers: string[];
  friendshipStatus: FriendshipStatus;
  interests?: string[];
  skills?: string[];
  lastActive: string;
  mutualFriends: number;
  joinedAt: string;
  isVerified?: boolean;
  online: boolean;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  updatedAt?: string;
  message?: string;
}

export interface PostComment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  likes: string[];
}

export interface PostImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  isPublic: boolean;
  likes: string[];
  comments: PostComment[];
  images?: PostImage[];
  tags?: string[];
}

export type NotificationType = 'friend_request' | 'post_like' | 'comment' | 'message';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  relatedUserId?: string;
  relatedPostId?: string;
  relatedMessageId?: string;
  isRead: boolean;
  createdAt: string;
}

export type MessageType = 'text' | 'image' | 'video' | 'audio';
export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  senderId: string;
  receiverId?: string;
  conversationId?: string;
  content: string;
  timestamp: string;
  read: boolean;
  status?: MessageStatus;
  reactions?: Record<string, string>;
  isEdited?: boolean;
  isDeleted?: boolean;
  type?: MessageType;
  fileUrl?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessageId?: string;
  lastMessage?: string;
  lastMessageTime: string;
  unreadCount: number;
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
  createdAt: string;
  updatedAt: string;
}
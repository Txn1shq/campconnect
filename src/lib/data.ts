export type User = {
  id: string;
  name: string;
  avatar: string;
  college: string;
  about: string;
};

export type Post = {
  id: string;
  authorId: string;
  content: string;
  image?: string;
  timestamp: string;
  type: 'post' | 'event';
  eventName?: string;
  eventDate?: string;
};

export type MarketItem = {
  id: string;
  sellerId: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'furniture' | 'study material' | 'electronics' | 'other';
  'data-ai-hint'?: string;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

export type Chat = {
  id: string;
  participantIds: string[];
  messages: Message[];
};

export const users: User[] = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    avatar: 'https://placehold.co/100x100.png',
    college: 'State University',
    about: 'Computer Science major, passionate about coding and video games. Looking for study buddies for Algorithms 101.',
  },
  {
    id: 'user2',
    name: 'Brenda Smith',
    avatar: 'https://placehold.co/100x100.png',
    college: 'Oakwood College',
    about: 'Art history student. Love painting and visiting museums. Always up for a coffee and a chat about modern art.',
  },
  {
    id: 'user3',
    name: 'Charlie Brown',
    avatar: 'https://placehold.co/100x100.png',
    college: 'State University',
    about: 'Business student and aspiring entrepreneur. Let\'s connect and talk about startup ideas!',
  },
  {
    id: 'user4',
    name: 'Diana Prince',
    avatar: 'https://placehold.co/100x100.png',
    college: 'Metropolis University',
    about: 'History major, fascinated by ancient civilizations. Also, a big fan of hiking and outdoor adventures.',
  },
];

export const posts: Post[] = [
  {
    id: 'post1',
    authorId: 'user2',
    content: 'Just finished this new piece! What do you all think? #art #painting',
    image: 'https://placehold.co/600x400.png',
    timestamp: '2 hours ago',
    type: 'post',
  },
  {
    id: 'post2',
    authorId: 'user1',
    type: 'event',
    eventName: 'Annual Hackathon',
    content: 'Who is joining the annual hackathon this weekend? I\'m looking for a team! My skills are in React and Node.js. Let\'s build something amazing.',
    eventDate: 'This Saturday',
    timestamp: '5 hours ago',
  },
  {
    id: 'post3',
    authorId: 'user3',
    content: 'Great talk on venture capital today. Feeling inspired! #entrepreneurship',
    timestamp: '1 day ago',
    type: 'post',
  },
  {
    id: 'post4',
    authorId: 'user4',
    type: 'event',
    eventName: 'Mountain Hiking Trip',
    content: 'Planning a hiking trip to Bear Mountain next weekend. Anyone interested in joining?',
    eventDate: 'Next Sunday',
    timestamp: '3 days ago',
  },
];

export const marketItems: MarketItem[] = [
  {
    id: 'item1',
    sellerId: 'user3',
    name: 'Barely Used Study Desk',
    price: 50,
    image: 'https://placehold.co/300x300.png',
    description: 'Great condition study desk. Perfect for a dorm room. Selling because I\'m upgrading.',
    category: 'furniture',
    'data-ai-hint': 'study desk',
  },
  {
    id: 'item2',
    sellerId: 'user1',
    name: 'Introduction to Algorithms Textbook',
    price: 35,
    image: 'https://placehold.co/300x300.png',
    description: 'The required textbook for CS 101. No markings, like new.',
    category: 'study material',
    'data-ai-hint': 'textbook stack',
  },
  {
    id: 'item3',
    sellerId: 'user2',
    name: 'Vintage Polaroid Camera',
    price: 75,
    image: 'https://placehold.co/300x300.png',
    description: 'A classic Polaroid 600 camera. Works perfectly. Includes one pack of film.',
    category: 'electronics',
    'data-ai-hint': 'vintage camera',
  },
  {
    id: 'item4',
    sellerId: 'user4',
    name: '2-Person Camping Tent',
    price: 40,
    image: 'https://placehold.co/300x300.png',
    description: 'Lightweight and easy to set up. Used only twice. Great for weekend trips.',
    category: 'other',
    'data-ai-hint': 'camping tent',
  },
];

export const chats: Chat[] = [
  {
    id: 'chat1',
    participantIds: ['user1', 'user3'],
    messages: [
      { id: 'msg1', senderId: 'user1', text: 'Hey, saw your post about the VC talk. Sounds interesting!', timestamp: '10:30 AM' },
      { id: 'msg2', senderId: 'user3', text: 'Yeah it was great! We should connect and discuss some ideas I have.', timestamp: '10:32 AM' },
    ],
  },
  {
    id: 'chat2',
    participantIds: ['user1', 'user2'],
    messages: [
      { id: 'msg3', senderId: 'user2', text: 'Hi! Are you the CS major?', timestamp: 'Yesterday' },
      { id: 'msg4', senderId: 'user1', text: 'Yep, that\'s me. Need help with your laptop? 😂', timestamp: 'Yesterday' },
      { id: 'msg5', senderId: 'user2', text: 'Haha, maybe later. I was actually wondering if you wanted to grab coffee.', timestamp: 'Yesterday' },
    ],
  },
];

export const currentUser = users[0];

// app/dashboard/chats/[userId]/page.tsx

import React from 'react';

type Props = {
  params: {
    userId: string;
  };
};

export default function ChatPage({ params }: Props) {
  const { userId } = params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chat with User ID: {userId}</h1>
      
      {/* Chat content placeholder */}
      <div className="border rounded-lg p-4 bg-white shadow">
        <p className="text-gray-600">This is the chat window for user <strong>{userId}</strong>.</p>
        {/* ضع هنا مكون الدردشة الفعلي مثل ChatMessages, ChatInput, إلخ */}
      </div>
    </div>
  );
}

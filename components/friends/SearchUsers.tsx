// components/friends/SearchUsers.tsx
'use client';
import { useState, useEffect } from 'react';
import { mockUsers, getCurrentUser } from '@/lib/mockData';
import Link from 'next/link';
import Avatar from '@/components/common/Avatar';

export default function SearchUsers() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof mockUsers>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockUsers.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsDropdownOpen(true);
    } else {
      setResults([]);
      setIsDropdownOpen(false);
    }
  }, [query]);

  return (
    <div className="relative mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for friends..."
        className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      
      {isDropdownOpen && results.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map(user => (
            <Link 
              key={user.id} 
              href={`/users/${user.id}`}
              className="flex items-center p-3 hover:bg-zinc-800 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <Avatar src={user.avatar} name={user.name}  />
              <div className="ml-3">
                <h3 className="text-zinc-100">{user.name}</h3>
                <p className="text-zinc-400 text-sm">{user.email}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
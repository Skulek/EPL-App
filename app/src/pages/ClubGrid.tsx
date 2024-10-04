import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ClubItem } from '../types';
import { ClubGridItem } from '../ClubGridItem';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const fetchClubs = async (): Promise<ClubItem[]> => {
  const response = await axios.get<ClubItem[]>('http://localhost:5201/clubs');
  return response.data;
};

const LogoPlaceholder: React.FC = () => (
  <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md animate-pulse">
    <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
  </div>
);

const ClubGrid: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: clubItems, isLoading, error } = useQuery<ClubItem[], Error>({
    queryKey: ['clubs'],
    queryFn: fetchClubs,
  });

  const handleClubClick = (club: ClubItem) => {
    navigate(`/clubs/${club.id}/players`, { state: { clubName: club.name } });
  };

  const filteredClubs = useMemo(() => {
    return clubItems?.filter(club => 
      club.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clubItems, searchTerm]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <LogoPlaceholder key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <input
        type="text"
        placeholder="Search clubs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredClubs?.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ClubGridItem item={item} onClick={() => handleClubClick(item)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ClubGrid;
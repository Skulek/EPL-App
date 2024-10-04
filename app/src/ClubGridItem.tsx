import React, { memo } from 'react';
import { ClubItem } from './types';
import { motion } from 'framer-motion';

export const ClubGridItem: React.FC<{ item: ClubItem; onClick: (id: number) => void }> = memo(({ item, onClick }) => (
    <motion.div
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(item.id)}
    >
      <img src={item.logoUrl} alt={item.name} className="w-24 h-24 object-contain mb-4" loading="lazy" />
      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
    </motion.div>
  ));
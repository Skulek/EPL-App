import React, { useState } from "react";
import { Player } from "../types/Player";
import { formatDate } from "../utills";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import PlayerImage from "./PlayerImage";

const PlayerTableItem: React.FC<{ player: Player }> = ({ player }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <>
        <tr className="bg-white border-b hover:bg-gray-50 transition-colors duration-200">
          <td className="px-2 py-3 w-12">
            <PlayerImage player={player} />
          </td>
          <td className="px-3 py-3 font-medium text-gray-900 whitespace-nowrap">
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{player.firstName} {player.lastName}</span>
              <span className="text-xs text-gray-500 sm:hidden">{player.position}</span>
            </div>
          </td>
          <td className="px-3 py-3 hidden sm:table-cell whitespace-nowrap">
            {formatDate(player.birthDate)}
          </td>
          <td className="px-3 py-3 hidden sm:table-cell">
            {player.position}
          </td>
          <td className="px-2 py-3 sm:hidden">
            <button 
              onClick={() => setIsExpanded(!isExpanded)} 
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              aria-label={isExpanded ? "Collapse details" : "Expand details"}
            >
              {isExpanded ? (
                <ChevronUpIcon className="h-5 w-5" />
              ) : (
                <ChevronDownIcon className="h-5 w-5" />
              )}
            </button>
          </td>
        </tr>
        <tr className="sm:hidden">
          <td colSpan={5} className="p-0">
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-24" : "max-h-0"
              }`}
            >
              <div className="bg-gray-50 px-3 py-3">
                <div className="text-sm">
                  <p className="mb-1"><span className="font-semibold">Birth Date:</span> {formatDate(player.birthDate)}</p>
                  <p><span className="font-semibold">Position:</span> {player.position}</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </>
    );
  };

  export default PlayerTableItem;
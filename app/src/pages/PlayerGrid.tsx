import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { Player } from "../types/Player";
import api from "../api";
import PlayerTable from "../components/PlayerTable";
import { Helmet } from "react-helmet";

const fetchPlayers = async (clubId: string): Promise<Player[]> => {
  const response = await api.get<Player[]>(`/clubs/${clubId}/players`);
  return response.data;
};

const fetchClubName = async (clubId: string): Promise<string> => {
  const response = await api.get<{ name: string }>(`/clubs/${clubId}`);
  return response.data.name;
};

const PlayerGrid: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>();

  const { data: players, isLoading: playersLoading, error: playersError } = useQuery<Player[], Error>({
    queryKey: ['players', clubId],
    queryFn: () => fetchPlayers(clubId!),
    enabled: !!clubId,
  });

  const { data: clubName, isLoading: clubNameLoading, error: clubNameError } = useQuery<string, Error>({
    queryKey: ['clubName', clubId],
    queryFn: () => fetchClubName(clubId!),
    enabled: !!clubId,
  });

  const renderContent = useCallback(() => {
    if (playersLoading || clubNameLoading) {
      return <div className="text-center">Loading...</div>;
    }

    if (playersError || clubNameError) {
      return (
        <div className="text-center text-red-500 p-4">
          <p>Error: {playersError?.message || clubNameError?.message}</p>
        </div>
      );
    }

    if (!players || players.length === 0 || !clubName) {
      return <div className="text-center">No players found for this club.</div>;
    }

    return <PlayerTable players={players} clubName={clubName} />;
  }, [playersLoading, clubNameLoading, playersError, clubNameError, players, clubName]);

  return (
    <>
    <Helmet>
    <title>{clubName ?? ""} Players | Epl Site</title>
    </Helmet>
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">{clubName} Players</h1>
      {renderContent()}
    </div>
    </>
  );
};

export default PlayerGrid;
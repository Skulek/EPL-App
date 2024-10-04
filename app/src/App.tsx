import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './NavBar';
import ClubGrid from './pages/ClubGrid';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PlayerGrid from './pages/PlayerGrid';

const queryClient = new QueryClient();


const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <div className="App min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
          <Route path="/" element={<ClubGrid />} />
          <Route path="/clubs/:clubId/players" element={<PlayerGrid />} />
          </Routes>
        </main>
        {/* Your other components and routes go here */}
      </div>
    </Router>
    </QueryClientProvider>

  );
}

export default App;
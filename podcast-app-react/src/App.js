import { useState, useEffect } from 'react';
import PodcastCard from './components/podcastCard';
import Modal from './components/modal';

function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(res => res.json())
      .then(data => {
        setPodcasts(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching podcasts:', err);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (podcast) => {
    setSelectedPodcast(podcast);
  };

  const handleCloseModal = () => {
    setSelectedPodcast(null);
  };

  return (
    <>
      <header className="app-header">
        <h1>🎙️ Podcast App</h1>
      </header>

      <main className="grid">
        {loading ? (
          <p style={{ padding: '2rem' }}>Loading podcasts...</p>
        ) : (
          podcasts.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              onClick={handleCardClick}
            />
          ))
        )}
      </main>

      {selectedPodcast && (
        <Modal podcast={selectedPodcast} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
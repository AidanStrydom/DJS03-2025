import React, { useState, useEffect } from 'react';
import PodcastCard from './components/PodcastCard';
import Modal from './components/Modal';
import './App.css';

// Genre data
const genres = [
  {
    id: 1,
    title: "Personal Growth",
    description: "Looking to improve yourself and reach your full potential? Look no further than our collection of personal growth podcasts!",
    shows: ["10716", "10276", "6756", "10660"],
  },
  {
    id: 2,
    title: "Investigative Journalism",
    description: "Looking for a collection of podcasts that will keep you on the edge of your seat? Look no further than our selection of investigative journalism podcasts!",
    shows: ["10716", "5675", "10539", "9177", "8860", "5012", "9054", "7654", "8256", "8291", "5718", "5276", "5964", "6465", "5320", "6451", "5692", "6430"],
  },
  {
    id: 3,
    title: "History",
    description: "Experience the past like never before with our collection of history podcasts!",
    shows: ["5279", "9177", "6807", "8514", "5629", "8364", "5964", "9041", "5702", "5320", "6717", "5968", "8760"],
  },
  {
    id: 4,
    title: "Comedy",
    description: "Get ready to laugh with our collection of comedy podcasts!",
    shows: ["6807"],
  },
  {
    id: 5,
    title: "Entertainment",
    description: "Entertainment lovers, get ready for a treat! Our collection of entertainment podcasts will keep you entertained, informed and up-to-date.",
    shows: ["6807", "6631", "8256", "6756", "5702", "9620", "10758"],
  },
  {
    id: 6,
    title: "Business",
    description: "For those who want to keep their finger on the pulse of the entertainment industry, our collection of entertainment business podcasts is the perfect choice.",
    shows: ["8364", "6717", "8760"],
  },
  {
    id: 7,
    title: "Fiction",
    description: "Get ready to be transported to new worlds and lose yourself in captivating stories.",
    shows: ["6631", "9664", "8188", "9702", "9695", "9994", "9263", "9666"],
  },
  {
    id: 8,
    title: "News",
    description: "Stay informed and on top of the latest events with our collection of current news podcasts.",
    shows: ["8291", "5718"],
  },
  {
    id: 9,
    title: "Kids and Family",
    description: "Bring some fun and learning to your family's ears with our collection of kids and family podcasts.",
    shows: ["8188", "9687", "9702", "9665", "10182", "9994", "9705", "10934", "9694", "9693", "9704", "9739", "9691"],
  },
];

export { genres };

// Utility functions
export const GenreService = {
  getNames(genreIds) {
    return genreIds.map(
      (id) => genres.find((g) => g.id === id)?.title || "Unknown"
    );
  },
};

export const DateUtils = {
  format(dateStr) {
    const date = new Date(dateStr);
    return `Updated ${date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
  },
};

// Main App Component
export default function PodcastApp() {
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
    <div>
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
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { GenreService, DateUtils } from '../podcastApp';

export default function Modal({ podcast, onClose }) {
  const [seasonData, setSeasonData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (podcast) {
      setLoading(true);
      fetch(`https://podcast-api.netlify.app/id/${podcast.id}`)
        .then(res => res.json())
        .then(data => {
          setSeasonData(data.seasons || []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching seasons:', err);
          setLoading(false);
        });
    }
  }, [podcast]);

  if (!podcast) return null;

  const genreNames = GenreService.getNames(podcast.genres);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="title-section">
          <h2>{podcast.title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="banner">
          <img src={podcast.image} className="modal-img" alt={podcast.title} />
          <div className="info-section">
            <h3>Description</h3>
            <p>{podcast.description}</p>
            <h3>Genres</h3>
            <div className="tags">
              {genreNames.map((g, i) => (
                <span key={i} className="tag">{g}</span>
              ))}
            </div>
            <p className="modal-updated-text">{DateUtils.format(podcast.updated)}</p>
          </div>
        </div>
        <h3>Seasons</h3>
        {loading ? (
          <p>Loading seasons...</p>
        ) : (
          <ul className="season-list">
            {seasonData.map((season, index) => (
              <li key={index} className="season-item">
                <strong className="season-title">
                  Season {season.season}: {season.title}
                </strong>
                <span className="episodes">{season.episodes.length} episodes</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
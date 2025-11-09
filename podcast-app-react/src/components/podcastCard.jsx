import { GenreService } from '../utils/genreService';
import { DateUtils } from '../utils/dateUtils';

export default function PodcastCard({ podcast, onClick }) {
  const genreNames = GenreService.getNames(podcast.genres);

  return (
    <div className="card" onClick={() => onClick(podcast)}>
      <img src={podcast.image} alt={`${podcast.title} cover`} />
      <h3>{podcast.title}</h3>
      <p>{podcast.seasons} season{podcast.seasons > 1 ? "s" : ""}</p>
      <div className="tags">
        {genreNames.map((g, i) => (
          <span key={i} className="tag">{g}</span>
        ))}
      </div>
      <p className="updated-text">{DateUtils.format(podcast.updated)}</p>
    </div>
  );
}
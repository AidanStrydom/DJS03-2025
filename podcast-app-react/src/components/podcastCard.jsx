import { GenreService } from '../utils/genreService';
import { DateUtils } from '../utils/dateUtils';

/**
 * Displays a podcast card with title, image, genres, seasons, and last updated date.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.podcast - Podcast data to display.
 * @param {Function} props.onClick - Function called when the card is clicked.
 * @returns {JSX.Element} A card showing podcast info.
 */


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
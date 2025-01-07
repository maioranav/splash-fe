import { IStaff } from "@/app/models/IStaff";
import "./ArtistCard.scss";

export const ArtistCard = ({ artist }: IArtistCard) => {
  return (
    <div className="card artist-card">
      <img className="card-img-top" src={process.env.NEXT_PUBLIC_BASE_API_URL + "/uploads/" + artist.img} alt={artist.nome} />
      <div className="card-body">
        <h5 className="card-title">{artist.nome}</h5>
        <p className="card-text">{artist.ruolo}</p>
        <div className="artist-social-btns">
          {artist.social?.instagram && (
            <a href={artist.social?.instagram} target="_blank" rel="noopener noreferrer" title={`Segui ${artist.nome} su Instagram`}>
              <i className="bi bi-instagram"></i>
            </a>
          )}
          {artist.social?.facebook && (
            <a href={artist.social?.facebook} target="_blank" rel="noopener noreferrer" title={`Segui ${artist.nome} su Facebook`}>
              <i className="bi bi-bi-facebook"></i>
            </a>
          )}
          {artist.social?.sitoweb && (
            <a href={artist.social?.sitoweb} target="_blank" rel="noopener noreferrer" title={`Segui ${artist.nome} sul Web`}>
              <i className="bi bi-link-45deg"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

interface IArtistCard {
  artist: IStaff;
}

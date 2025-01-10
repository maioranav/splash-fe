import "./CoverArt.scss";

export const CoverArt = ({ data, embed = false }: ICoverArt) => {
  // TODO: aggiungere fail-safe immagine
  return (
    <div className={embed ? "d-block d-md-none cover-art-embed" : "col-md-6 col-xxl-3 m-0 p-0 d-none d-md-block"}>
      <img className="cover-art-img" src={"data:image/jpeg;base64," + data} alt="Cover-Art" />
    </div>
  );
};

interface ICoverArt {
  data: string;
  embed?: boolean;
}

import css from "../ImageGallery/imageGallery.module.css";

export const ImageCard = ({ image }) => {
  const {
    urls: { small },
    description,
  } = image;

  return (
    <div>
      <img src={small} alt={description} className={css.item} />
    </div>
  );
};

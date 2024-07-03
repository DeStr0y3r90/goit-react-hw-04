import { ImageCard } from "../ImageCard/ImageCard.jsx";
import css from "../ImageGallery/imageGallery.module.css";

export const ImageGallery = ({ dataImage, onCardClick }) => {
  return (
    <div>
      <ul className={css.list}>
        {dataImage.map((image) => {
          return (
            <li key={image.id} onClick={() => onCardClick(image)}>
              <ImageCard image={image} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

import { Audio } from "react-loader-spinner";
import css from "./Spiner.module.css";

export const Spiner = () => {
  return (
    <div className={css.spiner}>
      <Audio
        height="40"
        width="40"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

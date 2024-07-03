import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

export const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const topic = form.elements.topic.value;

    if (form.elements.topic.value.trim() === "") {
      return toast.error("Please enter a search word.");
    }

    onSearch(topic);
    form.reset();
  };

  const containerStyle = {
    top: "100px",
  };
  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.inp}
          type="text"
          name="topic"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
      <Toaster
        containerStyle={containerStyle}
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "8px",
            color: "#713200",
          },
        }}
        reverseOrder={false}
      />
    </header>
  );
};

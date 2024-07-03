import { useState, useEffect } from "react";
import { SearchBar } from "./Components/SearchBar/SearchBar.jsx";
import { getImages } from "./api.js";
import { ImageGallery } from "./Components/ImageGallery/ImageGallery.jsx";
import { ErrorMessage } from "./Components/ErrorMessage/ErrorMessage.jsx";
import { ImageModal } from "./Components/ImageModal/ImageModal.jsx";
import { LoadMoreBtn } from "./Components/LoadMoreBtn/LoadMoreBtn.jsx";
import { Spiner } from "./Components/Spiner/Spiner.jsx";

import "./App.css";

export function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [totalPage, settotalPage] = useState(0);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getData() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getImages(query, page);
        setImages((prevData) => [...prevData, ...data.results]);
        setIsLoading(false);
        settotalPage(data.total_pages);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    settotalPage(0);
  };

  const handalLoadMore = () => {
    setPage(page + 1);
  };

  function openModal(image) {
    setmodalIsOpen(true);
    setSelectedCard(image);
  }

  function closeModal() {
    setmodalIsOpen(false);
  }

  console.log(images);
  return (
    <>
      <SearchBar onSearch={handleSearch} images={images} />
      {images.length > 0 && (
        <ImageGallery dataImage={images} onCardClick={openModal} />
      )}

      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          valueCard={selectedCard}
          closeModal={closeModal}
        />
      )}

      {images.length > 0 && !isLoading && totalPage !== page && (
        <LoadMoreBtn onClick={handalLoadMore} />
      )}
      {isLoading && <Spiner />}
      {error && <ErrorMessage />}
    </>
  );
}

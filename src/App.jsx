import { useState, useEffect } from "react";
import { SearchBar } from "./components/SearchBar/SearchBar.jsx";
import { getImages } from "./api.js";
import { ImageGallery } from "./components/ImageGallery/ImageGallery.jsx";
import { ErrorMessage } from "./components/ErrorMessage/ErrorMessage.jsx";
import { ImageModal } from "./components/ImageModal/ImageModal.jsx";
import { LoadMoreBtn } from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import { Spiner } from "./components/Spiner/Spiner.jsx";

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

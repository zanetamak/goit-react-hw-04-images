import { Notify } from 'notiflix';
import { useState, useEffect } from 'react'

import css from './App.module.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchPicturesByQuery } from './Api';
// Bez klamr, np. import Searchbar from './Searchbar/Searchbar';, zaimportowana byłaby cała zawartość modułu jako pojedyncza zmienna 
// (jeśli taka składnia byłaby poprawna w danym kontekście, co w przypadku komponentów React jest raczej rzadko stosowane)
export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

// od onSubmit do this.State włącznie,
  const onSubmit = e => {
    e.preventDefault();
    setQuery(e.target.search.value);
    setIsLoading(true);
    setImages([]);
    setPage(1);
  };

const onNextPage = () => { // wywoływana po naciśnięciu Load More
setPage(prevState => prevState + 1);
setIsLoading(true);
fetchGallery(query, page + 1);
};

const onClickImage = (url) => { // wywoływana po naciśnięciu na zdjecie
   setShowModal(true);
  setLargeImageURL(url);
};

const onModalClose = () => { // po zamknięciu
  setShowModal(false);
  setLargeImageURL('');
};

const fetchGallery = (query, page) => { // uywanie fetchP... do pobrania danych
  fetchPicturesByQuery(query, page)
      .then((response) => {
        setImages((prevImages) => [...prevImages, ...response]);
        setShowBtn(response.length === 12);;

      if (response.length === 0) {
        Notify.failure('No matches found!');
      }
    })
    .catch((error) => {
      this.setState({ error });
    })
    .finally(() => { // wykonany niezależnie od tego, czy operacja zakończyła się sukcesem, czy błędem. stan isLoading na false czyli operacja asynchroniczna została zakończona,
      setIsLoading(false);
    });
};
  
  useEffect(() => {
  if (query !== '') {
    fetchGallery(query, page);
  }
}, [query, page]);
    

    return (
      <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery images={images} onClickImage={onClickImage} />
        {isLoading && <Loader />} 
            {showBtn && <Button onNextPage={onNextPage} />}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onModalClose={onModalClose}
          />
        )}
      </div>
    );
  }
// jeśli isLoading = true to renderuje sie Loader
// jeśli showBtn jest prawdzia to renderuje sie Button z funkcją on NextPage
//  pozwala na dynamiczne dodawanie lub usuwanie komponentu w zależności od warunku.

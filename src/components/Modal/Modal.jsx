import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';

export const Modal = ({ onModalClose, largeImageURL }) => {
  //  largeImageURL uzywane do przekazania adresu obrazu, wyswietlanego w modalu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 27 || e.currentTarget === e.target) {
        onModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    //  usuwanie nasłuchiwania po odmontowaniu komponentu
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      //  Gdy komponent jest odmontowywany (czyli usuwany z drzewa komponentów), 
      // usuwam nasłuchiwanie zdarzenia klawiatury
    };
  }, [onModalClose]); // Zależność onModalClose

  return (
    <div className={css.Overlay} onClick={onModalClose}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onModalClose: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};


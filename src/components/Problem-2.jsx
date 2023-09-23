import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [modalAVisible, setModalAVisible] = useState(false);
  const [modalBVisible, setModalBVisible] = useState(false);
  const [modalCVisible, setModalCVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [onlyEven, setOnlyEven] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [modalContact, setModalContact] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const apiBaseUrl = "https://contact.mediusware.com/api-doc";

  useEffect(() => {
    if (modalAVisible || modalBVisible) {
      const endpoint = modalAVisible ? "/contacts/" : "/country-contacts/US/";
      const params = {
        search: searchInput,
        page,
        page_size: pageSize,
      };

      if (onlyEven) {
        params.id__is_even = true;
      }

      axios
        .get(`${apiBaseUrl}${endpoint}`, { params })
        .then((response) => {
          setContacts(response.data.results);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [modalAVisible, modalBVisible, searchInput, onlyEven, page]);

  const openModalA = () => {
    setModalAVisible(true);
    setModalBVisible(false);
    setPage(1);
  };

  const openModalB = () => {
    setModalAVisible(false);
    setModalBVisible(true);
    setPage(1);
  };

  const openModalC = (contact) => {
    setModalContact(contact);
    setModalCVisible(true);
  };

  const closeModalC = () => {
    setModalCVisible(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleOnlyEvenChange = (e) => {
    setOnlyEven(e.target.checked);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

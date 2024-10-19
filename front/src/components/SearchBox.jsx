import React, { useState } from 'react';
import styles from './SearchBox.module.css';
import { FaSearch } from 'react-icons/fa'
import { isHashtag } from '../controller/contentFormatterController';



const SearchBox = ({ changePage, searchTerm, searchHashtag }) => {

    const [searchContent, setSearchContent] = useState("");


    const handleSubmitSearch = async (e) => {
        e.preventDefault();

        const term = searchContent.trim();
        if (term !== "") {
            if (isHashtag(term)) {
                searchHashtag(term);
                changePage('hashtag');
            } else {
                searchTerm(term)
                changePage('result');

            }

        }
        setSearchContent('');


    }

    return (
        <>

            <form onSubmit={handleSubmitSearch} className={styles.searchBox}>
                <div className={styles.searchField}>
                    <input type="text" name="search" id="search" autoComplete='off' maxLength='140' placeholder='Buscar' value={searchContent || ""} onChange={(e) => { setSearchContent(e.target.value) }} />
                    <div className={styles.searchButton}>
                        <button type="submit">
                            <FaSearch />
                        </button>

                    </div>
                </div>


            </form>

        </>
    );
}


export default SearchBox;
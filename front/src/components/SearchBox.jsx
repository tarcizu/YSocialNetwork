import React, { useState } from 'react';
import styles from './SearchBox.module.css';
import { FaSearch } from 'react-icons/fa'



const SearchBox = ({ }) => {

    const [searchContent, setSearchContent] = useState("");


    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        console.log("Apertou Buscar: " + searchContent);
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
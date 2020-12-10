import React, { useState, useEffect } from 'react';
import css from './style.css';
import { API_ROUTES, TYPE_TO_ICON } from '../../utils/Constant';

function DataTable() {
    const [url, setUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(1);
    const [datas, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchBy, setSearchBy] = useState('name');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData(`${API_ROUTES.Data}?page=${page}`);
    }, [page]);

    const fetchData = async (apiRoutes) => {
        setIsLoading(true);

        const requestOpt = {
            method: "GET"
        };

        await fetch(apiRoutes, requestOpt)
            .then(res => res.json())
            .then(resJson => {
                if (resJson.data.length >= 10)
                    setData(resJson.data.slice(0, 9));
                else
                    setData(resJson.data);

                setHasMore(resJson.hasMore);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }

    const postData = async (apiRoutes) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ originalUrl: url })
        };
        await fetch(apiRoutes, requestOptions)
            .then(res => res.json())
            .then(resJson => {
                if (resJson.success)
                    setShortenedUrl(resJson.url.shortenURL);
                else
                    setShortenedUrl(resJson.message);
            })
            .catch(err => console.log(err));
    }

    const nextPage = event => {
        event.preventDefault();
        if (page < hasMore)
            setPage(page + 1);
    }

    const previousPage = event => {
        event.preventDefault();
        if (page > 1)
            setPage(page - 1);
    }

    const handleUrl = input => {
        setUrl(input);
    }

    const shortenUrl = () => {
        postData(`${API_ROUTES.Url}`);
    }

    const handleOnChange = input => {
        setSearchValue(input);

        if (searchValue && searchValue.length >= 1) {
            // TODO: Debounce the user input to reduce server call (Tried but unable to get the expected outcome)
            fetchData(`${API_ROUTES.Search}?searchBy=${searchBy}&searchQuery=${searchValue}`);
        }
    };

    return (
        <div>
            <div className={css.urlShortener}>
                <h1>URL Shortener</h1>
                <form>
                    <input
                        className={css.urlBar}
                        placeholder="Enter URL here"
                        onChange={event => handleUrl(event.target.value)}
                    />
                </form>

                <button
                    onClick={() => shortenUrl()}
                    className={css.urlButton}
                >
                    Submit
                </button>

                <p className={css.url}>
                    Shortened URL:
                    <a href={shortenedUrl}>
                        {shortenedUrl}
                    </a>
                </p>
            </div>

            <div className={css.datas}>
                <h1>Data List</h1>
                {isLoading && <p>Loading Database...</p>}
                <form>
                    <input
                        className={css.searchBar}
                        placeholder="Search"
                        onChange={event => handleOnChange(event.target.value)}
                    />
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Blend Name</th>
                            <th>Origin</th>
                            <th>Variety</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map(data => (
                            <tr
                                key={data.id}
                                className={css.row}
                            >
                                <td className={css.data}>
                                    <div
                                        className={css.icon}
                                        dangerouslySetInnerHTML={{
                                            __html: TYPE_TO_ICON['tea']
                                        }}
                                    ></div>
                                    {data.blend_name}
                                </td>

                                <td>
                                    {data.origin}
                                </td>

                                <td>
                                    {data.variety}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={css.buttonDiv}>
                    <button
                        onClick={evt => previousPage(evt)}
                        className={css.pageButton}
                    >
                        Previous Page
                    </button>

                    <div className={css.pageNumber}>
                        {page}
                    </div>

                    <button
                        onClick={evt => nextPage(evt)}
                        className={css.pageButton}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DataTable;
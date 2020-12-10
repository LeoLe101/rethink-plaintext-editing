import React, { useState, useEffect } from 'react';
import css from './style.css';
import { debounce } from 'lodash';
import { API_ROUTES, TYPE_TO_ICON } from '../../utils/Constant';

function DataTable() {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(1);
    const [datas, setData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [searchBy, setSearchBy] = useState('name');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData(`${API_ROUTES.Search}?page=${page}`);
    }, [page]);

    const fetchData = async (apiRoutes) => {
        setIsLoading(true);

        const requestOpt = {
            method: "GET"
        };

        await fetch(apiRoutes, requestOpt)
            .then(res => res.json())
            .then(resJson => {
                console.log(`Search API: ${resJson}`);
                setData(resJson.data);
                setHasMore(resJson.hasMore);
                setIsLoading(false);
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

    const handleOnChange = input => {
        console.log(`Handling Search Input`, input);
        setSearchValue(input);

        if (searchValue && searchValue.length >= 1) {
            // Debounce the user input to reduce server call
            fetchData(`${API_ROUTES.Search}?searchBy=${searchBy}&searchQuery=${searchValue}`);
        }
    }

    return (
        <div className={css.datas}>
            {isLoading && <p>Loading Database...</p>}
            <form>
                <input
                    placeholder="Search"
                    value={searchValue}
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
    );
}

export default DataTable;
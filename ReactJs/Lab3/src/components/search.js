import { useSearchParams, useNavigate } from "react-router-dom";
import React from 'react';

function Search() {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    var a = '';
    const handleSubmit = (event) => {
        const targets = event.target;
        const value = targets.type === 'text' ? targets.value : null;
        const name = targets.name;
        // navigate('/search?' + name + '=' + value);
        navigate('/search');
        a = searchParams.get('xyz');
    };
    return (
        <div>
            <h2>Your search term:{searchParams.get('q')}</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Search:
                    <input type="text" name="q" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
export default Search;
import React, { useState, useEffect } from 'react';
import './Main.css'

// onClick={() => onSuggestionClick(suggestion.name)}
function Main() {

    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [countryExists, setCountryExists] = useState(true);


    useEffect(() => {
        if (input.length > 0) {
            fetch(`https://restcountries.eu/rest/v2/name/${input}`)
                .then((response) => response.json())
                .then(data => {
                    if (data.status && data.status === 404) {
                        setCountryExists(false)
                    }
                    else {
                        console.log(data);
                        setSuggestions(data);
                    }
                })
                .catch((err) => console.log(err))
        }

    }, [input])

    console.log(input.length);

    const handleChange = (name) => {
        setInput(name)
    }

    const onSuggestionClick = (countryName) => {
        console.log(countryName);
        setInput(countryName)
    }

    const renderSomething = () => {
        if (input.length > 0) {
            if (countryExists) {
                return (
                    <div className="suggestions-container" >
                        {
                            suggestions.map((suggestion, i) => {
                                return <a href="https://restcountries.eu/#rest-countries" target="_blank" className="single-country" key={i} onClick={() => onSuggestionClick(suggestion.name)}  >{suggestion.name}</a>
                            })
                        }
                    </div>)
            }
            else {
                return (
                    <>
                        <h1>Country Doesn't Exist 😟 </h1>
                    </>
                )
            }
        }
    }


    return (
        <div className="Main" >
            <h1>Main Github</h1>

            <form>
                <input value={input} className="input" type="text" onChange={(e) => handleChange(e.target.value)} />
            </form>

            {
                renderSomething()
            }

        </div>
    )
}

export default Main;









    // useEffect(() => {
    //     fetch(`https://api.github.com/users/${search}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data.login);
    //             setRepoName(data.login)
    //         })
    // }, [])

    // const searchUser = (key) => {
    //     fetch(`https://api.github.com/users/${key}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             setRepoName(data.login)
    //         })
    // }
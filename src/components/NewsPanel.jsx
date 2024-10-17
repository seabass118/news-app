import { FaNewspaper } from "react-icons/fa";
import NewsPanelCard from "./NewsPanelCard";
import { IoClose } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const NewsPanel = ({ activeCountry, activeCountryCode, setActiveCountry }) => {

    const [news, setNews] = useState([]);
    // Fetch news data from api in this component
    // use activeCountry prop as query
    // pass data as props into NewsPanelCard component and render data
    // Listen for activeCountry changes and add a loading state when changed

    useEffect(() => {
        console.log(news);
    }, [news])

    useEffect(() => {
        axios
            .get(
                `https://newsapi.org/v2/everything?q=${activeCountry.toLowerCase()}&pageSize=5&apiKey=${import.meta.env.VITE_NEWS_KEY}`
            )
            .then(function (response) {
                // handle success
                console.log(response)
                if(response.data.articles.length) {
                    setNews(response.data.articles);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [activeCountryCode])

    return (
        <div className="rounded animate-in slide-in-from-left-48 absolute z-10 p-2  left-5 top-[100px] max-w-[40%] max-h-[calc(100vh-120px)] bg-white">
            <div className="flex">
                <h1 className="font-bold text-xl mb-2 flex items-center gap-2 bg-black px-4 py-1 rounded text-white"><FaGlobeAmericas />{activeCountry}</h1>
                <IoClose className="ml-auto mt-1 text-2xl cursor-pointer" onClick={() => setActiveCountry("")} />
            </div>


            <div className="overflow-auto  bg-black max-h-[calc(100vh-200px)]">
                {news.length && (
                    <>
                        {news.map((news_item, index) => {
                            return (
                                <NewsPanelCard 
                                    author={news_item.author}
                                    content={news_item.content}
                                    description={news_item.description}
                                    source={news_item.source.name}
                                    title={news_item.title}
                                    imageUrl={news_item.urlToImage}
                                />
                            )
                        })}
                    </>
                )}
            </div>
        </div>
    );
};

export default NewsPanel;

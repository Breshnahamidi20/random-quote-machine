import React, { useState, useEffect } from 'react';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(quote)}" - ${encodeURIComponent(author)}`;
    return tweetUrl;
  };

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <div id="quote-box" className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <p id="text" className="text-center text-xl md:text-2xl lg:text-3xl mb-4">
          "{quote}"
        </p>
        <p id="author" className="text-center text-sm md:text-base lg:text-lg mb-6">
          - {author}
        </p>
        <button 
          id="new-quote" 
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-200 mb-4"
          onClick={fetchQuote}
        >
          New Quote
        </button>
        <a 
          id="tweet-quote" 
          className="bg-blue-700 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-800 transition duration-200"
          href={tweetQuote()}
          target="_blank" 
          rel="noopener noreferrer"
        >
          Tweet Quote
        </a>
      </div>
    </div>
  );
}

export default App;
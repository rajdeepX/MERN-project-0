import React, { useState, useEffect } from "react";
import "./App.css";

type TDeck = {
  title: string;
  _id: string;
};

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:3000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTitle("");
  };

  const fetchDecks = async () => {
    const response = await fetch("http://localhost:3000/decks");
    const newDecks = await response.json();
    setDecks(newDecks);
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((item) => {
          return <li key={item._id}>{item.title}</li>;
        })}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;

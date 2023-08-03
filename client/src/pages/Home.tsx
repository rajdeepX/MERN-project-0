import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getDecks, { TDeck } from "../api/getDecks";
import createDeck from "../api/createDeck";
import deleteDeck from "../api/deleteDeck";

const Home = () => {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const createdDeck = await createDeck(title);
    setDecks([...decks, createdDeck]); //in order to see the changes when we click on the UI
    setTitle("");
  };

  const fetchDecks = async () => {
    const newDecks = await getDecks();
    setDecks(newDecks);
  };

  const handleDeleteDeck = async (deckID: string) => {
    // S2. After we receive the ID, we call the backend with a delete method in order to delete the selected item with the given ID
    // await fetch(`http://localhost:3000/decks/${deckID}`, {
    //   method: "DELETE",
    // });

    // the above code is in the api/deleteDeck.ts

    await deleteDeck(deckID);

    // To show the new deck in the UI immediately after the deleting the deck
    setDecks(decks.filter((deck) => deck._id !== deckID));
  };

  useEffect(() => {
    fetchDecks();
  }, []);
  return (
    <div className="App">
      <ul className="decks">
        {decks.map((item) => {
          return (
            <li key={item._id}>
              {/* S1. with the item._id in the handleDeleteDeck, we are sending the ID to the function above */}
              <button onClick={() => handleDeleteDeck(item._id)}>X</button>
              <Link to={`decks/${item._id}`}>{item.title}</Link>
            </li>
          );
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
};

export default Home;

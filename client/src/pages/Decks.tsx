import React, { useState, useEffect } from "react";
import createCard from "../api/createCard";
import { useParams } from "react-router-dom";
import getDeck from "../api/getDeck";
import { TDeck } from "../api/getDecks";
import deleteCard from "../api/deleteCard";

const Decks = () => {
  const { deckId } = useParams();

  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards); //in order to see the changes when we click on the UI
    setText("");
  };

  const handleDeleteCard = async (index: number) => {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  };

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }
    fetchDeck();
  }, [deckId]);

  return (
    <div className="App">
      <ul className="decks">
        {cards.map((item, index) => {
          return (
            <li key={index}>
              {/* S1. with the item._id in the handleDeleteDeck, we are sending the ID to the function above */}
              <button onClick={() => handleDeleteCard(index)}>X</button>
              {item}
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Card text</label>
        <input
          id="deck-title"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
          value={text}
          required
        />
        <button>Create Card</button>
      </form>
    </div>
  );
};

export default Decks;

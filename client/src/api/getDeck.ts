import { TDeck } from "./getDecks";

export default async function getDeck(deckId: string): Promise<TDeck> {
  const response = await fetch(`http://localhost:3000/decks/${deckId}`);
  return response.json();
}

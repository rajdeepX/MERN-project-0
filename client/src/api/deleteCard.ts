import { TDeck } from "./getDecks";

export default async function deleteCard(
  deckID: string,
  index: number
): Promise<TDeck> {
  const response = await fetch(
    `http://localhost:3000/decks/${deckID}/cards/${index}`,
    {
      method: "DELETE",
    }
  );
  return response.json();
}

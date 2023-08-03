export type TDeck = {
  title: string;
  cards: string[];
  _id: string;
};

export default async function getDecks(): Promise<TDeck[]> {
  const response = await fetch("http://localhost:3000/decks");
  return response.json();
}

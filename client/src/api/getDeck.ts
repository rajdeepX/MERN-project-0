export type TDeck = {
  title: string;
  _id: string;
};

export default async function getDeck(): Promise<TDeck[]> {
  const response = await fetch("http://localhost:3000/decks");
  return response.json();
}

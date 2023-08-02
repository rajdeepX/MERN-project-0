export default async function deleteDeck(deckID: string) {
  await fetch(`http://localhost:3000/decks/${deckID}`, {
    method: "DELETE",
  });
}

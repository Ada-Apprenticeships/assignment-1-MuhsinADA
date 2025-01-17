// Strings to be concatinated to make careds
const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const RANKS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

// Validates the number of decks and then creates the deck
function createAndValidatesDeck(numberOfDecks = 1) {
  if (!Number.isInteger(numberOfDecks) || numberOfDecks < 1) {
    throw new Error('Number of decks must be a positive integer');
  }

  const deck = [];
  for (let i = 0; i < numberOfDecks; i++) {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        deck.push(`${rank} of ${suit}`);
      }
    }
  }
  return deck;
}

// Validates/Error checks the parameters of the main function
function validateDealParameters(numberOfPlayers, cardsPerPlayer, totalCards) {
  if (!Number.isInteger(numberOfPlayers) || numberOfPlayers < 1) {
    throw new Error('Number of players must be a positive integer');
  }
  if (!Number.isInteger(cardsPerPlayer) || cardsPerPlayer < 1) {
    throw new Error('Cards per player must be a positive integer');
  }
  
  const totalCardsNeeded = numberOfPlayers * cardsPerPlayer;
  if (totalCardsNeeded > totalCards) {
    throw new Error('Not enough cards in deck to deal the requested hands');
  }
}

// Shuffles and deals a specific number of cards to a specific number of players based on a specifc number of decks 
function shuffleAndDeal(numberOfPlayers, cardsPerPlayer, numberOfDecks = 1) {
  // Create and validate deck
  const deck = createAndValidatesDeck(numberOfDecks);
  validateDealParameters(numberOfPlayers, cardsPerPlayer, deck.length);
  
  // An implementation of the Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  // Deals the correct amount of cards per player to each player
  const hands = Array(numberOfPlayers).fill().map(() => []);
  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let j = 0; j < numberOfPlayers; j++) {
      hands[j].push(deck[i * numberOfPlayers + j]);
    }
  }
  
  return hands;
}

export default shuffleAndDeal;
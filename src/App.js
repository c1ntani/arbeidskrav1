import React, { useState, useEffect } from "react";
import "./App.css";
//Komponenter
import { Headline } from "./Components/Headline";
import { Link } from "./Components/Link";
//Kortstokken
import cardDeck from "./Data/data.json";

function App() {
  //Dealer
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  //User
  const [userCards, setUserCards] = useState([]);
  const [userScore, setUserScore] = useState(0);
  //Game
  const [startGame, setStartGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const calculateSumUser = (cards) => {
    setUserScore(calculate(cards));
  };

  const calculateSumDealer = (cards) => {
    let value = calculate(cards);
    setDealerScore(value);
  };

  const calculate = (cards) => {
    let sum = 0;
    cards.forEach((card) => {
      switch (card.value) {
        case "K":
          sum += 10;
          break;

        case "Q":
          sum += 10;
          break;

        case "J":
          sum += 10;
          break;

        case "A":
          sum += 1;
          break;

        default:
          sum += Number(card.value);
          break;
      }
    });
    return sum;
  };

  useEffect(() => {
    calculateSumUser(userCards);
  }, [userCards]);

  useEffect(() => {
    calculateSumDealer(dealerCards);
  }, [dealerCards]);

  //BUTTONS
  //Dele ut fra kortstokken til spillerne
  const clickDeal = () => {
    cardDeck = cardDeck.sort(() => Math.random() - 0.5);
    dealerDrawCard();
    userDrawCard();

    setStartGame(true);
  };

  const clickHit = () => {
    userDrawCard();
    if (calculate(userCards) >= 21) {
      setGameOver(true);
    }
  };

  const clickStand = () => {
    let dealerOnHand = [...dealerCards];
    let totalScoreDealer = dealerScore;

    while (totalScoreDealer < 18) {
      dealerOnHand.push(cardDeck.pop());
      setDealerCards([...dealerOnHand]);
      totalScoreDealer = calculate(dealerOnHand);
    }
    setDealerCards(dealerOnHand);
    if (totalScoreDealer >= 18) {
      setGameOver(true);
    }
  };

  const whoWon = () => {
    let totalScoreDealer = dealerScore;
    let dealerOnHand = [...dealerCards];

    if (totalScoreDealer > 21) {
      return <div>Jeg har vunnet</div>;
    } else if (totalScoreDealer > calculate(userCards)) {
      return <div>Dealer har vunnet</div>;
    } else if (calculate(userCards) > 21) {
      return <div>Dealer har vunnet</div>;
    } else {
      return <div>Jeg har vunnet</div>;
    }
  };

  //Trekker et kort fra bunken
  //User
  const userDrawCard = () => {
    let card = cardDeck.pop();
    userCards.push(card);
    setUserCards([...userCards]);
  };

  //Dealer
  const dealerDrawCard = () => {
    let card = cardDeck.pop();
    dealerCards.push(card);
    setDealerCards([...dealerCards]);
  };

  //Vise dealer kort
  const showDealerCards = () => {
    if (dealerCards.length === 0) {
      return <div>Dealer har ingen kort</div>;
    }
    return (
      <div>
        {dealerCards.map((card, i) => (
          <div key={i}>{card.value + card.suit}</div>
        ))}
      </div>
    );
  };

  //Viser brukers kort
  const showUserCards = () => {
    if (userCards.length === 0) {
      return <p>Du har ingen kort</p>;
    }
    return (
      <div>
        {userCards.map((card, i) => (
          <div key={i}>{card.value + card.suit}</div>
        ))}
      </div>
    );
  };

  const saveScore = () => {
    localStorage.setItem("dealerScore", dealerScore);
    localStorage.setItem("userScore", userScore);
  };

  const getScore = () => {
    localStorage.getItem("dealerScore");
    localStorage.getItem("userScore");
  };
  saveScore();
  getScore();

  //JSX
  return (
    <div className="App">
      <Headline />

      <button onClick={() => clickDeal()}>Deal</button>
      <button onClick={() => clickHit()}>Hit</button>
      <button onClick={() => clickStand()}>Stand</button>

      <div className="dealerOnHand">Dealer cards: {showDealerCards()}</div>
      <p>Score dealer: {dealerScore}</p>

      <p>***********************</p>
      <div>{whoWon()}</div>
      <p>***********************</p>

      <div className="userOnHand">Your cards:{showUserCards()}</div>
      <p>Your score: {userScore}</p>
      <Link href="https://www.blackjackapprenticeship.com/how-to-play-blackjack/" text="Se spilleregler her" />
    </div>
  );
}

export default App;

import './App.css';
import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard';


const cardImages = [
  // { "src": "/img/helmet-1.png", matched: false},
  // { "src": "/img/potion-1.png", matched: false},
  // { "src": "/img/ring-1.png", matched: false},
  // { "src": "/img/scroll-1.png", matched: false},
  // { "src": "/img/shield-1.png", matched: false},
  // { "src": "/img/sword-1.png", matched: false}
  { "src": "Magic_Memory_Game/img/angree1.jpg", matched: false},
  { "src": "Magic_Memory_Game/img/angree2.jpg", matched: false},
  { "src": "Magic_Memory_Game/img/angree3.jpg", matched: false},
  { "src": "Magic_Memory_Game/img/angree4.jpg", matched: false},
  { "src": "Magic_Memory_Game/img/angree5.jpg", matched: false},
  { "src": "Magic_Memory_Game/img/angree6.jpg", matched: false}
]

function App() {

  const [cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disabled,setDisabled] = useState(false)

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]  //total 12 elements 6 pairs 
      .sort(() => Math.random() - 0.5)   //when no. is negative then elements stay on same position and when positive they swap arround
      .map((card) => ({ ...card, id: Math.random() }))   // giving id to every card 
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)  
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //reset chice and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  //start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  //compare two selected cards
  useEffect(() => {
    
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }
            else{
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        setTimeout(() => resetTurn(),1000)
      }
    }
  },[choiceOne, choiceTwo])

  return (
    <div className="App">
      <h1>Magic Memory</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}

      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;

//takes card from deck and deletes it
function takeCard(){
  house = Math.floor(Math.random() * 4); //picks a random "house" of cards (hearts, spades, diamonds, clubs)
  cardindex = Math.floor(Math.random() * deck[house].length); //from the chosen house, a random card is chosen
  card = deck[house][cardindex]; //saving in separate variable to avoid gaps in the list
  deck[house].splice(cardindex,1); //removing the card from the deck
  console.log(card)
  return [card, house];
}

//finds the total of all the cards in a list (playerCards, dealerCards)
function sumCards(cardList){
  sum = 0; //counter variable to accumulate sum
  for(let z = 0; z<cardList.length; z++){ //iterates through each card in the cardList argument and adds to the sum variable
    sum = sum + cardList[z];
  }
  return sum;
}

//used for the .includes() method to check for aces
function checkAce(ace){
  return ace == '11';
}

//determines winner of the game from difference to 21 (21 - total)
function getWinner(playerDiff, dealerDiff){
  if(playerDiff < 0){ //player busted
    return "db";
  }else{ //player didnt bust
    if(dealerDiff<0){ //dealer busted player didnt bust
      return "pb";
    }else{ //both dealer and player didnt bust
      if(playerDiff<dealerDiff){ //player closer to 21 than dealer
        return "pc";
      }else if(playerDiff>dealerDiff){ //dealer closer to 21 than player
        return "dc";
      }else{ //the dealer and player have the same
        return "t";
      }
    }
  }
}

//resets all the variables for a new game
function resetVariables(){
  hearts = [2,3,4,5,6,7,8,9,10,10,10,10,11];
  spades = [2,3,4,5,6,7,8,9,10,10,10,10,11];
  diamonds = [2,3,4,5,6,7,8,9,10,10,10,10,11];
  clubs = [2,3,4,5,6,7,8,9,10,10,10,10,11];
  deck = [hearts, spades, diamonds, clubs]; //simulation for a full deck of cards with cards getting removed from it as the game continues
  playerCards = []; dealerCards = [];
  house = 0; cardindex = 0; sum = 0; oc = 0;
  card = ''; newCard = ''; dealerCard = ''; winner = ''; endMessage = '';
}

function displayCard(pd, house, cardm cardAmount){

}

//main operating function
function blackjack(){
  gsap.to("#play-button", {opacity: 0, duration:1});
  // gsap.to("#btn2", {opacity: 0, duration:1})
  resetVariables();



  n = takeCard();
  playerCards.push(n[1]);
  displayCard("p", n[0], n[1], playerCards.length );
  n = takeCard();
  dealerCards.push(n[1]);
  displayCard("d", n[0], n[1], dealerCards.length )
  n = takeCard();
  playerCards.push(n[1]);
  displayCard("p", n[0], n[1], playerCards.length )

  //checks if the player got any aces and allows them to choose for the ace to be 1 or 11
  if(playerCards.includes(11) && playerCards[0] == playerCards[1]){ //if both the player's cards are aces
    if(confirm("You got 2 aces. \nOk to count them as 12, Cancel to count them as 2")){
      playerCards[0] = 1;
    }else{//depending on the choice changes either both aces to 1 or only 1 ace
      playerCards[0] = 1;playerCards[1] = 1;
    }
  }else if(playerCards.includes(11) && playerCards[0] != playerCards[1]){ //if only one of the player's cards are aces
    index = playerCards.findIndex(checkAce); //the index of the ace
    oc = 1 - index; //gets the index of the other card
    if (confirm("You have an ace and a " + parseInt(playerCards[oc]) + ". \nOk to count the ace as 11, Cancel to count it as 1")){
      playerCards[index] = 11;
    }else{
      playerCards[index] = 1;
    }
  }

  //loop for the player to hit, ends when: the player decides to stand, or can't hit anymore
  while(confirm("Your total: "+sumCards(playerCards)+"\nDealers total: "+sumCards(dealerCards)+"\nOk to hit, Cancel to stand.")){
    newCard = takeCard(); //player decides to hit, next card is chosen
    if(newCard == 11){ //checking if the new card is an ace
      if(sumCards(playerCards) > 11){ //checks if the ace being 11 is possible
        newCard = 1;
      }else if(sumCards(playerCards) == 10){ //checks if making the ace 11 will make a blackjack
        newCard = 11;
        break;
      }else{ //ace can be either 1 or 11 without consequences
        if(confirm("You got an ace and your total is"+sumCards(playerCards)+". \nOk to count the ace as 11, Cancel to count it as 1")){
          newCard = 11;
        }else{//choice of aces value
          newCard = 1;
        }
      }
    }else{ //new card isnt an ace so is converted from int to str to avoid k,q,j (10j --> 10)
      newCard = parseInt(newCard);
    }
    playerCards.push(newCard); //adds the new card to the player's card list
    if(sumCards(playerCards) >= 21){ //checks if it is possible for the player to hit again, if not exits the loop
      break;
    }
  }

  //loop for the dealer to hit, dealer has to hit on 16 and below, stand on 17 and above
  while (sumCards(dealerCards) < 17){ //checks if the dealer's total is still less than 17
    if(sumCards(playerCards)>21){
      break;
    }
    dealerCard = takeCard(); //takes new card for dealer
    if (dealerCard == 11){ //checks if the card is an ace
      if (dealerCards.includes(11)){//if it is the dealer's second ace, it has to be one
        dealerCard = 1;
      }
    }
    dealerCards.push(dealerCard); //adds new card to the dealr's card list
  }

  //finds the winner and displays the message before continuing
  winner = getWinner(21- sumCards(playerCards),21 - sumCards(dealerCards)); //calls winner function
  endMessage = "Player total: " + sumCards(playerCards) + "\nDealers total: " + sumCards(dealerCards); //Some statistics for the end message
  if(winner.includes("p")){ //player won
    endMessage+="\nYou won!\n";
    if(winner.includes("b")){ //player won by bust
      endMessage+="Dealer went over 21.";
    }else if(winner.includes("c")){ //player won by difference
      endMessage+="You were closer to 21.";
    }
  }else if(winner.includes("d")){ //dealer won
    endMessage+="\nDealer Won!\n"
    if(winner.includes("b")){ //dealer won by bust
      endMessage+="You went over 21.";
    }else if(winner.includes("c")){ //dealer won by diff
      endMessage+="\nDealer was closest to 21.";
    }
  }else if(winner == 't'){ //tied
    endMessage+="You tied\nReplaying round...";
    alert(endMessage); //displays the message
    blackjack(); //restarts game
  }
  alert(endMessage); //displays the mess
  gsap.set("#shell-div", {opacity: 1, duration:1})
}

// blackjack(); //begins the game of blackjack

//VARIABLE DECLARATION
var hearts; var spades; var diamonds; var clubs;
let deck; let house; let cardindex; let card;
let sum; let playerCards; let dealerCards; let oc;
let newCard; let dealerCard; let winner; let endMessage;let n;var id;

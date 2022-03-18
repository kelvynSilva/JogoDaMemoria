let game = {

    lockMode : false,
    firstCard: null,
    secondCard: null,

    techs : [
        'camera',
        'facebook',
        'filtera',
        'filter',
        'instagrama',
        'instagram-symbol',
        'instagram',
        'like',
        'rotate-image',
        'social-media'
    ],

    setCard: function(id){

       let card= this.cards.filter(card=> card.id === id)[0];

       if (card.flipped || this.lockMode) {
           return false;
       }
       if(!this.firstCard){
           this.firstCard = card;
           this.firstCard.flipped = true;
           return true;
       }else{
           this.secondCard = card;
           this.secondCard.firstCard = true;
           this.lockMode = true;
           return true;
       }


    },

    checkMetch: function (){
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        return this.cards
    },
    cards : null,

    createCardsFromTechs: function (){
      this.cards = [];
    
        this.techs.forEach((tech)=>{
            this.cards.push(this.createPairFromTech(tech));
        })
    
        this.cards =  this.cards.flatMap(pair=>pair);

        this.shuffleCards();

       return this.cards.filter(card=>!card.flipped) == 0;
    },
    
    createPairFromTech: function (tech){
    
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        },{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },
    
    createIdWithTech: function (tech){
        return tech + parseInt(Math.random() * 1000)
    },

    shuffleCards: function (cards){
        let currentIndex = this.cards.length;
        let rendomIndex = 0;
    
        while(currentIndex !== 0){
            rendomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            [this.cards[rendomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[rendomIndex]]
        }
    }

    
}
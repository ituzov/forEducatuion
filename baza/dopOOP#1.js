const attacker = {
   archer: 30,
   footSoldier: 55,
   cavalry: 10,
   artillery: 3,

   checkChancesToWin(defenderObject){
   let chancesToWin = 0;
   for (let key in defenderObject){
      if(this[key] > defenderObject[key]){
         chancesToWin++;
      }
   }
   return [chancesToWin, Object.keys(defenderObject).length]
   },


   // improveArmy(){
   //   for (let key in this){
   //      if (typeof this[key] === "number"){    //Не очень безопасно
   //         this[key] += 5;
   //      }
   //   }
   // },

   improveArmy(){
     const keys = ['archer', 'footSoldier', 'cavalry', 'artillery']
      keys.forEach(key =>{
         this[key] +=5 ;
      })
   },

   attack(defenderObject){
     let [change, overallOutcome] = this.checkChancesToWin(defenderObject);
     if (change / overallOutcome < 0.7){
        this.improveArmy();
        console.log(`Наши шансы равны ${change}/${overallOutcome}. Необходимо укрепление`);
     } else {
       console.log(`Мы усилились! Мы несомненно победим! Наши шансы высоки!`)
     }
   },

    getAllKeys(){
      console.log(Object.keys(this));
    }

}

const defender = {
   archer: 33,
   footSoldier: 50,
   cavalry: 40,
   artillery: 10,
}

attacker.getAllKeys();



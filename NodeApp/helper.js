function getAgeGroupCount(results) {

    let data=[];
    var elders=0;
    var adults=0;
    var teens=0;
    
    results.forEach(function (item) {
         if(item.age>15&&item.age<25)
         {
            teens=teens+1;
         }
         else if (item.age>=25&&item.age<=45)
         {
             adults=adults+1;
         }
         else
         {
             elders=elders+1;
         }
    

     });
     let row = {
        label:'Teens',
        value:teens
         }
         data.push(row);
         row = {
            label:'Adults',
            value:adults
             }
             data.push(row);

         row = {
                label:'Elders',
                value:elders
                 }
                 data.push(row);
      
        return data;
}

module.exports = {
    getAgeGroupCount
   };
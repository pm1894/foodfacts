const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
input: fs.createReadStream('FoodFacts.csv')
});

var reg;
var first=0;
var header;
var row;
var count;
var arr=[];
var obj={};
var all=["United Kingdom", "Denmark", "Sweden","Norway","France","Belgium", "Germany", "Switzerland", "Netherlands","Portugal", "Greece", "Italy", "Spain", "Croatia", "Albania"];
var northEur=["United Kingdom", "Denmark", "Sweden","Norway"];
var CentralEur=["France", "Belgium", "Germany", "Switzerland", "Netherlands"];
var southEur=["Portugal", "Greece", "Italy", "Spain", "Croatia", "Albania"];
var fatIndex,carbohydratesIndex,proteinsIndex,countriesIndex;
var i;
rl.on('line', function (line)
{

  if(first===0)
  {
  header=line.split(",");
  countriesInd=header.indexOf('countries');
  fatInd=header.indexOf('fat_100g');
  carbohydratesInd=header.indexOf('carbohydrates_100g');
  proteinsInd=header.indexOf('proteins_100g');
  first++;
}

else
 {
row=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
count= row[countriesInd];

if( all.indexOf(count) != -1&&row[fatInd]!=''&&row[carbohydratesInd]!=''&&row[proteinsInd]!='')
{
  fatcon=   parseFloat(row[fatInd]);
  carbocon= parseFloat(row[carbohydratesInd]);
  protcon=  parseFloat(row[proteinsInd]);
  if(arr.length===0)
  {
    if(northEur.indexOf(count) != -1)
    {
      obj["Region"]="northEurope";
      obj["fat_cons"]=fatcon;
      obj["carbo_cons"]= carbocon;
      obj["protein_cons"]= protcon;
      arr.push(obj);
      obj={};
    }
  }
  else {
    if(northEur.indexOf(count)!=-1)
    {
      reg="northEurope";
    }
    else if(southEur.indexOf(count)!=-1)
    {
      reg="southEurope";
    }
    else {
      reg="centralEurope";
    }

    for (i = 0; i < arr.length; i++)
    {
      if(reg==arr[i].Region)
      {
        arr[i]["fat_cons"]+=fatcon;
        arr[i]["carbo_cons"]+=carbocon;
        arr[i]["protein_cons"]+=protcon;
        break;
      }
    }
    if(i===arr.length)
    {
      obj["Region"]=reg;
      obj["fat_cons"]=fatcon;
      obj["carbo_cons"]= carbocon;
      obj["protein_cons"]= protcon;
      arr.push(obj);
      obj={};
    }
  }
}
}
});

rl.on('close', function (){
  var file = 'part2.json';
  var obj=JSON.stringify(arr);
  console.log(arr);
  fs.writeFile('part2.json', obj, function()
{
  console.log('File created successfully');
});
});

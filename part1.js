const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
input: fs.createReadStream('FoodFacts.csv')
});

var sugarInd,saltInd,countriesInd;
var req_countries= ["Netherlands", "Canada", "United Kingdom", "Australia", "France", "Germany", "Spain","South Africa"];

var first=0;
var header;
var row;
var count;
var sugarcon;
var saltcon;
var arr= [];

var obj={};
var i;

 rl.on('line', function (line)
 {

  if(first===0)
  {
  header=line.split(",");
  sugarInd=header.indexOf('sugars_100g');  //102
  // console.log(sugarInd);
  saltInd=header.indexOf('salt_100g');    //116
  // console.log(saltInd);
  countriesInd=header.indexOf('countries');  //31
  // console.log(countriesInd);
  first++;
}

 else
  {
  row=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  count= row[countriesInd];

  if( req_countries.indexOf(count) != -1&&row[sugarInd]!=''&&row[saltInd]!='')
  {
    sugarcon= parseFloat(row[sugarInd]);
    saltcon= parseFloat(row[saltInd]);

    if(arr.length===0)
    {
    obj["country"]=row[countriesInd];
    obj["sugar_consumption"]= sugarcon;
    obj["salt_consumption"]= saltcon;
    arr.push(obj);
    obj={};
    }
   else {
      for (var i = 0; i < arr.length; i++)
      {
        if(arr[i].country===row[countriesInd])
        {
          arr[i]["sugar_consumption"]+=sugarcon;
          arr[i]["salt_consumption"]+=saltcon;
          break;
        }
      }
      if(i===arr.length)
      {
        obj["country"]=row[countriesInd];
        obj["sugar_consumption"]= sugarcon;
        obj["salt_consumption"]= saltcon;
        arr.push(obj);
        obj={};
      }
    }
  }
}

});



rl.on('close', function (){
  var file = 'part1.json';
  var obj=JSON.stringify(arr);
  console.log(arr);
  fs.writeFile('part1.json', obj, function()
{
  console.log('File created successfully');
});
});

function onOpen() {
  
  //set up ranges
  var __KEY = "B4:B13";
  var __VALUE = "C4:C13";
  var __OUTPUT = "F2";
  
  var chart = SpreadsheetApp.getActiveSheet();
  
  var categorical = chart.getRange(__KEY).getValues();
  var numeric = chart.getRange(__VALUE).getValues();
  

  var results = categorical.map( function (category, index) {
    return { categoricalValue : category[0], numericValue : numeric[index][0] };    
  });
  
  chart.getRange(__OUTPUT).setValue(JSON.stringify(results));
}


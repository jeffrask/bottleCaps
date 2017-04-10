// Main app startup event hookup

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    App.init();
    
    colsole.log("device: ready.");
}

// =====================================================================================
//                                    App
// =====================================================================================

// Application Scope Object
var App = {};
App.Config = {};

App.LoadCommonCode = function() {
    
        /*$.get("footer.html", function(data) {
                       $(".footer").html(data);
        });*/
    
    $('.loading').fadeIn('slow').html('<img src="~/img/ajax-loader.gif">');
    
};


App.init = function() {    
    
    // Setup Config
    this.Config.debugMode = true;
    
    // Initialize Each Screen/Page and utility (located in separate js files)
    
    //App.Home.init();
    
    //App.waitForInit();
    
    //App.LoadCommonCode();
    
    //App.SetupGame();
       
};

App.maxWaitTimeForInititalization = 60000; // in milliseconds
App.currentWaitTimeForInitilization = 0;

App.waitForInit = function() {
   /* App.currentWaitTimeForInitilization += 100;
    
    if (App.currentWaitTimeForInitilization < App.maxWaitTimeForInititalization)
    {
        if (!App.Home.initComplete) {
            setTimeout(App.waitForInit, 100);
        } else if (!App.Webservice.initComplete) {
            setTimeout(App.waitForInit, 100);
        } else {
            App.Logger.logInfo("appinitializer", "App Initialized");
            App.LaunchScreen();
        }
    } else {
        App.Logger.logInfo("appinitializer", "Max wait time of " + App.maxWaitTimeForInititalization + " millisecondes for app to initialize was reached.  App Initialization aborted.");
    }*/
};

App.LaunchScreen = function() {
    // Everythings loaded now.  
    // Hide splash screen
    navigator.splashscreen.hide();
    
};

    var Turn = 0;
    var guesses = 0;
    var capSet = 0; 

App.SetupGame = function() {
    
    //alert("setting up game...")
    //window.location.href = "#page-game";
    
    $.mobile.changePage("#page-game", { transition: "slide", changeHash: false, reloadPage:false}); 
	
    // clear gameboard
    $("#gameboard").empty();
    guesses = 0;
    Turn = 1;
    
    App.RandomizeCaps();
 
}

App.PlaceCaps = function(CapOrder) {
    
     for (var i = 0, l = CapOrder.length; i < l; i++)
        {
            if (CapOrder[i] <= 12){
                
                // first instance
                var CapID = CapOrder[i] + "a";
                
                var thisCap = "<div class='cap' id='Container_" + CapID + "'><a href='javascript:App.Guess(&apos;"  + CapID + "&apos;);'><img id='" + CapID + "' src='img/bc_0.png'</a></div>";
                
                } else {
                 
                var primaryCap = (parseInt(CapOrder[i]) - parseInt("12") );     
                // second instance
                var CapID = (CapOrder[i] - 12) + "b";
                
                var thisCap = "<div class='cap' id='Container_" + CapID + "'><a href='javascript:App.Guess(&apos;"  + CapID + "&apos;);'><img id='" + CapID + "' src='img/bc_0.png'</a></div>";

                }
        
            $("#gameboard").append(thisCap);
            //location.reload();
        }
    
}

App.RandomizeCaps = function(CapOrder) {
    
    var CapOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
	App.shuffle(CapOrder);
    //alert(CapOrder);
    
    App.PlaceCaps(CapOrder);
    
}

App.shuffle = function(array) {
    
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

App.Guess = function(Cap) {
    
    var capNumber = Cap.substring(0, Cap.length - 1)
    
    //alert("guess - " + capNumber + " Turn=" + Turn);
    
    $( "#" + Cap ).attr('src',"img/bc_" + capNumber + ".png").fadeIn( 400 );
    
    
    if(Turn == 1){
        Turn += 1; // increment
        capSet = capNumber;
        // one cap has been flipped.
        //alert("capSet=" + capSet);
        
    } else {
        // it's turn 2, two caps have been flipped.
        // if they are a match...
        if(capSet == capNumber){
            
            //alert("it's a match!");
            
        } else {
            setTimeout(function() {
            
                document.getElementById(capSet + "a").src = "img/bc_0.png";
                document.getElementById(capSet + "b").src = "img/bc_0.png";
                
                document.getElementById(capNumber + "a").src = "img/bc_0.png";
                document.getElementById(capNumber + "b").src = "img/bc_0.png";
                
             	//alert("No match!");
                
            }, 1000);
            
            // now reset both guesses
            
    		
        }
        // if they are not a match...
        // reset turn
        Turn = 1;
    }
    
    
    guesses = guesses + 1;
    
    //alert("guesses:" + guesses);
    document.getElementById("guessCount").innerText = guesses;
    
    
}

// =====================================================================================
//                                    App.Logger
// =====================================================================================

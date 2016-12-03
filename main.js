//  ____       _  __       _____                     _   _             
// / ___|  ___| |/ _|     | ____|_  _____  ___ _   _| |_(_)_ __   __ _ 
// \___ \ / _ \ | |_ _____|  _| \ \/ / _ \/ __| | | | __| | '_ \ / _` |
//  ___) |  __/ |  _|_____| |___ >  <  __/ (__| |_| | |_| | | | | (_| |
// |____/ \___|_|_|       |_____/_/\_\___|\___|\__,_|\__|_|_| |_|\__, |
//                                                               |___/ 
//     _                                                      
//    / \   _ __   ___  _ __  _   _ _ __ ___   ___  _   _ ___ 
//   / _ \ | '_ \ / _ \| '_ \| | | | '_ ` _ \ / _ \| | | / __|
//  / ___ \| | | | (_) | | | | |_| | | | | | | (_) | |_| \__ \
// /_/   \_\_| |_|\___/|_| |_|\__, |_| |_| |_|\___/ \__,_|___/
//                            |___/                           
//  _____                 _   _             
// |  ___|   _ _ __   ___| |_(_) ___  _ __  
// | |_ | | | | '_ \ / __| __| |/ _ \| '_ \ 
// |  _|| |_| | | | | (__| |_| | (_) | | | |
// |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|
//
// See http://esbueno.noahstokes.com/post/77292606977/self-executing-anonymous-functions-or-how-to-write
(function() {
    
    
    
    
    //  _   _ _   _ _ _ _           __              _   _             
    // | | | | |_(_) (_) |_ _  _   / _|_  _ _ _  __| |_(_)___ _ _  ___
    // | |_| |  _| | | |  _| || | |  _| || | ' \/ _|  _| / _ \ ' \(_-<
    //  \___/ \__|_|_|_|\__|\_, | |_|  \_,_|_||_\__|\__|_\___/_||_/__/
    //                      |__/                                      
    // 

    //  _                                  
    // |_)   o| _|  _| _._|_ _.|_  _. _ _  
    // |_)|_|||(_| (_|(_| |_(_||_)(_|_>(/_
    //
    // INIT function : fills up a customers orders list
    // Would be CALLED once, on page load, in 'Script Init' section below
    // INPUT : no argument needed
    // OUTPUT : returns a customers orders list as an array of arrays
    var fn_init = function() {

        // Customers list ; will be picked randomly later
        var listeClients = [
            {name:'Client 1',code:'client1'}, 
            {name:'Client 2',code:'client2'}, 
            {name:'Client 3',code:'client3'}, 
            {name:'Client 2',code:'client4'},   // Set duplicate name on purpose
            {name:'Client 5',code:'client5'}, 
            {name:'Client 6',code:'client6'}
        ] ;

        // VAT rates list ; will be picked randomly later
        var tauxTva = [ 2, 10, 20.6 ] ;

        // Declare our variable that will handle our 'database'
        let listeCdesClients = [] ;
        
        // Let's build 1000 lines
        for(let i=0; i<1000; i++) {
            
            // Pick a random element from customers and vat rates lists
            let idxClient   = Math.round(Math.random()*(listeClients.length - 1)) ;
            let idxTva      = Math.round(Math.random()*(tauxTva.length - 1)) ;
            
            // Compute random price between 0 and 1000
            let randomPrice = Math.random() * 1000 ;
            
            // Compute the order line we are about to add to our 'database'
            // our line is an array
            let orderLine = [
                listeClients[idxClient]['name'],    // name of our random customer
                randomPrice,                        // our random order amount
                tauxTva[idxTva],                    // random vat rate
                listeClients[idxClient]['code']     // code of our random customer
            ] ;

            // Push these random values to our 'database'
            listeCdesClients.push(orderLine) ;
        }
        
        // Finally, return our 'database'
        return listeCdesClients ;
    } ;
    // Note : semi-colon is needed at line above because we are DECLARING A VARIABLE
    
    
    
    //                                          
    //  /\  _| _| |o._  _  _|_ _  _|_ _.|_ | _  
    // /--\(_|(_| ||| |(/_  |_(_)  |_(_||_)|(/_ 
    //                                              
    // GUI function : adds a line to customers list table
    // INPUT :  (string) talbeId the html id of the table to add the line to
    //          (array) the table data ; must be same lenght than html static table columns
    // OUTPUT : true if success, false if a problem raise
    // CONSTRAINTS :    given table must exist, otherwise returns false
    //                  lineData must not be empty, otherwise returns false
    // INTERNALS : adds a DOM tr element to given table ; one td per array field
    var fn_addTableLine = function(tableId, lineData){
        
        // Check that lineData exists and is not empty
        if(!lineData || !lineData.length) return false ;
 
        // Check that given table is actually a DOM table
        let targetTable = document.getElementById(tableId) ;
        if(!targetTable) return false ;
        
        // Still there ? Ok, let's move on...
        console.log(targetTable) ;
        
        // Create an empty <tr> element and add it to the 1st position of the table:
        let row = targetTable.insertRow(0);
        
        // Now, insert as many cells as in our input lineData array
        // for( val IN obj) syntax uses INDEXES of obj, with pointer val
        for(cellIndex in lineData) {
            // The variable cellIndex handles the current lineData's element's index
            // The value of cellIndex is equivalent to the variable i you may use 
            // in a for loop with i++ syntax
            
            // Insert new cell (<td> element) at the nth position of the "new" <tr> element:
            let addedCell = row.insertCell(cellIndex);
            
            // Add some text to the new cell:
            addedCell.innerHTML = lineData[cellIndex];
        }
        
        // Return true so that caller function knows everything went well
        return true ;
    } ;
    // Note : semi-colon is needed at line above because we are DECLARING A VARIABLE
    
    
    
    
    //  _                                                                      
    // |_) _. ._ _  _     _|  _. _|_  _.    _. ._   _|    _  _  | |  _   _ _|_
    // |  (_| | _> (/_   (_| (_|  |_ (_|   (_| | | (_|   (_ (_) | | (/_ (_  |_
    //
    // Engine function : parses 'database', collects statistical values we need,
    var fn_parseAndExtract = function (customersOrdersDB) {

        // Check that we actually got a DB to parse (exists and not empty)
        if(!customersOrdersDB || !customersOrdersDB.length) return false ;
        
        // Declare our collector
        // Will be as such : { 'clientCode1' : [ minPriceSeen, MaxPriceSeen], 'clientCode2' : [ ... ], ... }
        let _customersCollector = {} ;
        
        // Loop over our database 
        for(orderLine of customersOrdersDB) {
            // The variable orderLine above contains an array,
            // wich in turn contains our customer order data
            let clientName      = orderLine[0] ;
            let orderAmount     = orderLine[1] ;
            let orderVatRate    = orderLine[2] ;
            let clientCode      = orderLine[3] ;
            
            // Compute transaction real amount
            // TTC = HT * ( 1 + TVAcoeff )
            // avec TVAcoeff = TVApercent / 100
            let orderTtcAmount  = orderAmount * ( 1 + orderVatRate/100 ) ;
                
            // _________________________
            // DO STATISTICAL PROCESSING
            // Collect data
                
            // Check wether this client has been seen already
            // NOTE : use clientCode as key, because several customers may have the same name
            if(_customersCollector[clientCode]) {
                // This customer has been seen already :
                // We must check current amount against already seen minimum and
                // maximum, and eventually adjust one of them
                
                // Check minimum value
                if(_customersCollector[clientCode][1] > orderTtcAmount) {
                    // We have a new minimum value : update it in collector
                    _customersCollector[clientCode][1] = orderTtcAmount ;
                }
                // check maximum value, if ever we did not get a new minimum value
                else if(_customersCollector[clientCode][2] < orderTtcAmount) {
                    _customersCollector[clientCode][2] = orderTtcAmount ;
                }
            }
            else {
                // It's the first time we meet this customer in our 'database' :
                // just create it in our collector
                // Set current amount as minimum and maximum, as these values
                // would change in subsequent iterations when we meet this customer
                // again
                _customersCollector[clientCode] = [ clientName, orderTtcAmount , orderTtcAmount ] ;
            }
            // _________________________
            
            
        }
        
        // Finally, return our collector for further processing
        return _customersCollector ;
        
    } ;
    // Note : semi-colon is needed at line above because we are DECLARING A VARIABLE
    
    
    
    
    //  ___         _      _     _      _ _   
    // / __| __ _ _(_)_ __| |_  (_)_ _ (_) |_ 
    // \__ \/ _| '_| | '_ \  _| | | ' \| |  _|
    // |___/\__|_| |_| .__/\__| |_|_||_|_|\__|
    //               |_|                          
    
    // Actually launch engine

    // First, get some data to play with
    // NOTE : this is synchronous, we can expect our DB to be crafted
    // when next instruction comes to be executed
    let customersOrdersDB       = fn_init() ;
    
    // Then, parse ou DB and extract stat values
    let customersOrdersStats    = fn_parseAndExtract(customersOrdersDB) ;
    console.log(Object.keys(customersOrdersStats)) ;
    
    // And, add lines to our table so that we can see the result
    if(customersOrdersStats && Object.keys(customersOrdersStats).length) {
        
        // We actually have data to play with : we can move on ...
        // Loop over our collector, and add a line per customer
        // NOTE : you must have as many lines in your table
        // as you had customers in your listeClients variable in fn_init function
        for(clientCode in customersOrdersStats) {
            // Get our useful values
            // Note : we already have clientCode variable set
            let clientName  = customersOrdersStats[clientCode][0] ;
            let minAmount   = customersOrdersStats[clientCode][1] ;
            let maxAmount   = customersOrdersStats[clientCode][2] ;
            
            // Craft array to be passed to function fn_addTableLine
            let lineToAddToGui = [clientName, clientCode, minAmount, maxAmount] ;
            
            // and actually add it
            fn_addTableLine('SM3customersStatsTable',lineToAddToGui) ;
        }
    }
   
    
    

})() ;

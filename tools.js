

// setCookie(name, value, days); Name des Cookies und der Wert und wie lange er aktiv sein soll.
// getCookie(name);
// deleteCookie(name);
// UrlParameters();   muss so gecalled werden -> UrlParameters()["user"]; gibt Infos aus der URL wieder
// randomString(length);
// saveDatabase(data);
// getDatabase(data, id, attribute);
// expand(id, size); fügt Table rows hinzu
// newTextNode(welches Element, Data); Fügt Text node hinzu
// getText(nodeElement); returned den Text eines Elemwnts heraus
// copyVar(Variabel); Kopiert eine Variabel und returned sie
// shuffleArray(array); Mischt ein Array in zufälliger Weise
// arrayContains(value,thisArray) schaut ob ein Wert in einem Array existiert
// randomNumber(min, max); eine zufällige nummer zwischen 2 Werten
// toNumber(nummer); string to (float) nummer
// w(data,name); kann man innerhalb eines loops mehrmals machen um zu sehen wie es abläuft. "name" ist optional
// toStorage(name, data); save  local storage
// fromStorage(name); get  local storage
// deleteStorage(name); delete local storage 
// textBetween(string, start, end) returns text between certain signs or by index (starts from 1)
// time(timeFormat); not yet done...
// s(array, value); saves values in name/name/value pairs  example s(["customer", "peter", "age"], 18); 
// w(data,name) shows (appends) a variable at the beginning of body. Can be used in loops
// show(data,name) same as w(), it doesn't append the next one, but replaces it
// EJtest() you can code live in the browser at the point where you set this function
// easyJay_Storage(array, value)
// EJinArray(value,data) { // searches in an multidimensional array value and variable name (as string like "variable[0][i][3]]")
// Input to varibale = <input class="changeVar" varName="name of the variable" type="text" />
// saveField(id) copies and saves an element in an array
// setField(classId,attrib,value) changes the attributes and copies and saves the old element  
// resetField(data) resets an element to a previous state, either by id or or the last x(integer) changes elements

//=====================================================================================================

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


//=====================================================================================================


// URL-Parameter.


function UrlParameters() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}


//=====================================================================================================


function randomString(length1) {
    var signs = "0123456789abcdefghijklmnopqrstuvwxyz";
    var newURL = "";
    for (var i8 = 0; i8 < length1; i8++) {
        var randNum = Math.floor(Math.random() * (signs.length));
        newURL += signs.charAt(randNum);
    }
    return newURL;
}



//=====================================================================================================


function saveDatabase(data) {

    dbParam = JSON.stringify(data).replace(/'/g, "aposapos");
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
        }
    };
    xmlhttp.open("POST", "database.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");;
    xmlhttp.send("x=" + dbParam);

}

//=====================================================================================================

function getDatabase(data, id, attribute) {

    dbParam = JSON.stringify(data);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        
        if (this.readyState == 4 && this.status == 200) {
            myObj = this.responseText;

            var preQuestion = myObj;
                document.getElementById(id).setAttribute(attribute, preQuestion); 
        }
    };
    xmlhttp.open("POST", "database.php", false);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + dbParam);
}


//=====================================================================================================

function expand(id, size) {
    var a = document.getElementById(id);
    a.setAttribute('rows',size);
}

//=====================================================================================================


function newTextNode(nodeElement, nodeData) {
    var para = document.getElementById(nodeElement);
    var t = document.createTextNode(decodeURIComponent(nodeData));
    para.removeChild(para.childNodes[0]);            
    para.appendChild(t); 
}  


//=====================================================================================================


function getText(nodeElement) {
    var i = "#" + nodeElement;
    return $($(i).val()).text();    
}


//=====================================================================================================

function copyVar(inputVar) {
    return JSON.parse(JSON.stringify(inputVar));
}

//=====================================================================================================

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//=====================================================================================================

function randomNumber(min, max) {
    var a = Math.floor(Math.random() * (max+1-min)) + min;
    return a;
}

//=====================================================================================================

function toNumber(numb) {
    numb = numb.replace(".", "");
    numb = numb.replace(/,/, ".");
    numb = parseFloat(numb);
    return numb;
}



//=====================================================================================================


function toStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}
function fromStorage(name) {
    var a = JSON.parse(localStorage.getItem(name));
    return a;
}
function deleteStorage(name) {
    localStorage.removeItem(name);
}


//=====================================================================================================


function textBetween(string1, sign1, sign2) { //use integers, signs or "end"(until the end of the string)
    // returns the text between 2 signs
    // starts from 1
    var a, b, c;
    
    if (Number.isInteger(sign1) == true) {a = sign1-1;
    } else {a = string1.indexOf(sign1)+1;}
    
    if (Number.isInteger(sign2) == true) {b = sign2;
    } else if (sign2 == "end") {b = string1.length;
    } else { b = string1.indexOf(sign2);}
    
    c = string1.slice(a, b);
    return c;
}


//=====================================================================================================

function time(timeFormat) { // noch nicht fertig
    var d = new Date();
    
    if (timeFormat == "year") {return d.getFullYear()}
    if (timeFormat == "month") {return d.getMonth()}
    if (timeFormat == "day") {return d.getDate()}
    if (timeFormat == "hour") {return d.getHours()}
    if (timeFormat == "minute") {return d.getMinutes()}
    if (timeFormat == "second") {return d.getSeconds()}
    if (timeFormat == "millisecond") {return d.getMilliseconds()}
    if (timeFormat == "timestamp") {return d.getTime()}
    if (timeFormat == "weekday") {return d.getDay()}
    if (timeFormat == "now") {return d.Date.now()}
    if (timeFormat == "year") {return d.getFullYear()}
    if (timeFormat == "year") {return d.getFullYear()}
    if (timeFormat == "year") {return d.getFullYear()}
    
}


//=====================================================================================================


/*
Examples

 s(["customer", "peter", "age"], 18);
 w(s(["customer", "peter", "age"]), "w");
 s(["customer", "horst", "age"], 19);
 w(s(["customer", "horst" ,"age"]), "w");
 w(easyJay_Storage)
 */

var easyJay_Storage = [];


function s(array, value) {
    var cutPiece;
    var EJarrayPiece = [];
    var tempArray1 = "easyJay_Storage";
    var tempArray2;
    var tempArray3;
    var allIndexes = [];
    
    if (Array.isArray(array)) {EJarrayPiece = array} else {
        while (array.length > 0) {
            cutPiece = textBetween(array, "[", "]");
            array = array.replace("[" + cutPiece + "]", "");
            EJarrayPiece.push(cutPiece);
        }
    }

    
    //####################################################
    
    if (value) { // if value exists...
        for(var j = 0; j < EJarrayPiece.length; j++) { // loop tru the index names
            var k = loopArray(EJarrayPiece[j], eval(tempArray1)); // checks if it exists in the array and return the index or -1
            if(k !== -1) { // if it exists in the array
                allIndexes.push(k);
                tempArray1 = tempArray1 + "[" + k + "]";
                if (j == EJarrayPiece.length-1) {
                    tempArray1 = tempArray1 + "[1][0]";
                    tempArray4 = eval(tempArray1);
                    tempArray4 = value;
                    window.tempArray4;
                    window.easyJay_Storage[1][1][1][1][0] = value;
                }
            } else if (k == -1) { // if it doesn't exist in the array, then..
                var arrayIndex = eval(tempArray1).length;
                while (j < EJarrayPiece.length) {
                    if (j == 0) {eval(tempArray1).push([EJarrayPiece[j]]);}
                        tempArray1 = tempArray1 + "[" + arrayIndex + "]";
                        eval(tempArray1 + " = [EJarrayPiece[j]]");
                        ++j;
                        arrayIndex = 1;
                    if (j == EJarrayPiece.length) {
                        tempArray1 = tempArray1 + "[" + 1 + "]";
                        eval(tempArray1 + " = [value]");
                    }
                }
            }
        }
    } else { // if value doesn't exist...
        for(var j = 0; j < EJarrayPiece.length; j++) { // loop tru the index names
            var k = loopArray(EJarrayPiece[j], eval(tempArray1)); // checks if it exists in the array and return the index or -1
            if (k !== -1) { // if this piece exists in the array...
                tempArray1 = tempArray1 + "[" + k + "]";
                continue;
            }   
        }
        tempArray1 = tempArray1 + "[1][0]";
        return eval(tempArray1);
    }
} 
    //####################################################

function loopArray(value, array2) {
    for(var i = 0; i < array2.length; i++) {
        if (value == array2[i][0]) {
            return i;
        }
    }
    return -1;
}

//#########################################################################################


var testVariable = 0;
function w(data,name,loopVar,onceEveryXIteration) {
    if (testVariable < 10000) {
        if($("#testVariable").length) {} else {
            $("body").prepend("<p id='testVariable'></p>");
        }
        
        var loop = "";
        var stopAt = 50;
        
        if(loopVar || loopVar == 0) {
            if(onceEveryXIteration) {
                stopAt = onceEveryXIteration;
            }
            if(loopVar != 0 && loopVar % stopAt == 0) {
                loop = " Loop (" + loopVar + ") = ";
            } else {return;}
        }
            
        if(name) {
            data = JSON.stringify(data);
            $("#testVariable").append("<br />" + name + " = " + loop + data);
        } else {
            data = JSON.stringify(data);
            $("#testVariable").append("<br />" + loop + data);
        }
        if(data) {} else {
            $("#testVariable").append("Fehler");
        }
        window.testVariable++;
    };
}




var testVariable = 0;
function w1(data,name) { // old copy
    if (testVariable < 10000) {
        if($("#testVariable").length) {} else {
            $("body").prepend("<p id='testVariable'></p>");
        }
        if(name) {
            data = JSON.stringify(data);
            $("#testVariable").append("<br />" + name + " = " + data);
        } else {
            data = JSON.stringify(data);
            $("#testVariable").append("<br />" + data);
        }
        if(data) {} else {
            $("#testVariable").append("Fehler");
        }
        window.testVariable++;
    };
}

var testVariable1 = 0;
function show(data,name) {
    if (testVariable1 < 10000) {
        if($("#testVariable").length) {} else {
            $("body").prepend("<p id='testVariable'></p>");
        }
        if(name) {
            data = JSON.stringify(data);
            $("#testVariable").html("<br />" + name + " = " + data);
        } else {
            data = JSON.stringify(data);
            $("#testVariable").html("<br />" + data);
        }
        if(data) {} else {
            $("#testVariable").html("Fehler");
        }
        window.testVariable1++;
    };
}

//#########################################################################################

var EJpara1;
var EJpara2;
var EJpara3;
var EJpara4;
var EJpara5;
var EJobjectVars = {};


function EJtest(para1, para2, para3, para4, para5){
    if (para1) {window.EJpara1 = para1}
    if (para2) {window.EJpara2 = para2}
    if (para3) {window.EJpara3 = para3}
    if (para4) {window.EJpara4 = para4}
    if (para5) {window.EJpara5 = para5}
    // create the input fields
    $("body").prepend('<div id="EJeditor"></div>');
    $("#EJeditor").html('<p id="EJtext"></p>');
    $("#EJeditor").append('<input placeholder="variable 1" class="EJinput EJI1" id="EJinput"/><input placeholder="variable 2" class="EJinput EJI2"/><input placeholder="variable 3" class="EJinput EJI3"/><input placeholder="variable 4" class="EJinput EJI4"/><input placeholder="variable 5" class="EJinput EJI5"/>');
    $("#EJeditor").append('<textarea class="EJI6" placeholder="Notes" id="EJeditor1" rows="4" cols="70">');
    $("#EJeditor").append('<textarea class="EJI7" placeholder="Code" id="EJeditor2" rows="4" cols="70">');
    // the input is saved and the fields now get filled with the previous input
    
    if(para1) {
        if(para1 != "new") {
            for(var i5 = 1; i5 < 8; i5++) { 
                if(fromStorage("EJI" + i5) != false) {
                    var j = fromStorage("EJI" + i5);
                    $(".EJI" + i5).val(j);
                }
            }
        } 
    }

EJtest2();
}
function EJtest2() {
    setTimeout(function() { 
        EJtest3(); // repeats this function all x seconds
    EJtest2()}, 500);
}
function EJtest3() {
        var EJcode = $("#EJeditor2").val(); // get the code from the input box
        if (EJcode != "") { // if it's not empty'
            var EJinput = []; //will be filled with the variable names from the input fields
            //##########################################################################
            if ($("#EJinput").val() !== "") { // if the first variable name input is not empty
                $(".EJinput").each(function() { // get the variable names and add it to the array "EJinput"
                    EJinput.push($(this).val());  
                })
                toStorage("EJinput", EJinput); // saves the array in the local storage
            };
            //##########################################################################
            var EJinput2 = []; // will be filled with existing/working variable names
            for(var i6 = 0; i6 < EJinput.length; i6++) { // loops tru the variable names array
                if(EJinput[i6] == "") {continue;} // if the first variable name input is not empty
                try {eval(EJinput[i6])} // checks if it's a really javascript code
                catch (err) {if (err instanceof ReferenceError) { // If the variable has not yet been declared
                    continue; // next iteration if the variable does not exist
                }}
                EJinput2.push(EJinput[i6]); // adds the existing variable name to the array
                var varData = JSON.parse(JSON.stringify(eval(EJinput[i6]))); // evals the var name and copies the content
                var varName = "EJobjectVars.a" + i6 + " = varData;"; // builds a variable
                eval(varName) // adds the variable value to an object
            }
            //##########################################################################
            try {eval(EJcode)} // checks if it's a really javascript code
            catch (err) {if (err instanceof SyntaxError) {
                return; // if the code is not working, it returns to the previous function
                }}   
            //##########################################################################
            for(var i8 = 0; i8 < EJinput2.length; i8++) { // loops through var names that actually exist
                var p = "EJobjectVars.a" + i8; 
                var o = EJinput2[i8] + " = JSON.parse(JSON.stringify(" + p + "))" + ";"; // evals the var name and copies the content to build a code string           
                eval(o) // restores the original value of the variable                                        
            }  
            //##########################################################################
            for(var i4 = 1; i4 < 8; i4++) { 
                var l = ".EJI" + i4;                        
                toStorage("EJI" + i4, $(l).val()) 
            }    
        }               
}

function toStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}
function fromStorage(name) {
    if(localStorage.getItem(name)) {
        var a = JSON.parse(localStorage.getItem(name));
        return a;
    } else {
        return false;
    }
}
function deleteStorage(name) {
    localStorage.removeItem(name);
}


//#######################################################################################################################



/*
Examples
 easyJay_Storage1("[customer][peter][age]", 18);
 w(easyJay_Storage1("[customer][peter][age]"), "w");
 easyJay_Storage1("[customer][horst][age]", 19);
 w(easyJay_Storage1("[customer][horst][age]"), "w");
 w(easyJay_Storage)
 */
 

function easyJay_Storage(array, value) {
    var cutPiece;
    var EJarrayPiece = [];
    var tempArray1 = "easyJay_Storage";
    var tempArray2;
    var tempArray3;
    var allIndexes = [];
    
    while (array.length > 0) {
        cutPiece = textBetween(array, "[", "]");
        array = array.replace("[" + cutPiece + "]", "");
        EJarrayPiece.push(cutPiece);
    }
    
    //####################################################
    
    if (value) { // if value exists...
        for(var j = 0; j < EJarrayPiece.length; j++) { // loop tru the index names
            var k = loopArray(EJarrayPiece[j], eval(tempArray1)); // checks if it exists in the array and return the index or -1
            if(k !== -1) { // if it exists in the array
                allIndexes.push(k);
                tempArray1 = tempArray1 + "[" + k + "]";
                if (j == EJarrayPiece.length-1) {
                    tempArray1 = tempArray1 + "[1][0]";
                    tempArray4 = eval(tempArray1);
                    tempArray4 = value;
                    window.tempArray4;
                    window.easyJay_Storage[1][1][1][1][0] = value;
                }
            } else if (k == -1) { // if it doesn't exist in the array, then..
                var arrayIndex = eval(tempArray1).length;
                while (j < EJarrayPiece.length) {
                    if (j == 0) {eval(tempArray1).push([EJarrayPiece[j]]);}
                        tempArray1 = tempArray1 + "[" + arrayIndex + "]";
                        eval(tempArray1 + " = [EJarrayPiece[j]]");
                        ++j;
                        arrayIndex = 1;
                    if (j == EJarrayPiece.length) {
                        tempArray1 = tempArray1 + "[" + 1 + "]";
                        eval(tempArray1 + " = [value]");
                    }
                }
            }
        }
    } else { // if value doesn't exist...
        for(var j = 0; j < EJarrayPiece.length; j++) { // loop tru the index names
            var k = loopArray(EJarrayPiece[j], eval(tempArray1)); // checks if it exists in the array and return the index or -1
            if (k !== -1) { // if this piece exists in the array...
                tempArray1 = tempArray1 + "[" + k + "]";
                continue;
            }   
        }
        tempArray1 = tempArray1 + "[1][0]";
        return eval(tempArray1);
    }
} 
    //####################################################

function loopArray(value, array2) {
    for(var i = 0; i < array2.length; i++) {
        if (value == array2[i][0]) {
            return i;
        }
    }
    return -1;
}


//#########################################################################################

function EJinArray(value,data) { //data has to be the variable name as a string like "variable[0][i][3]"
    var varName = eval(textBetween(data, 1, "["));
    for(var i = 0; i < varName.length; i++) {
        if (value == eval(data)) { 
            return i }
    }
    return -1;
}



//#########################################################################################


// Ändert den Wert einer Variable den man in ein textfeld tippt
// Dazu muss das input feld die class="varName" und purpose="nameDerVariable" haben und eine variable die den gleichen Namen
//   wie das purpose Feld.
// <label>Gesamt:</label> <input class="changeVar" varName="gesamt" type="text" />

$(".changeVar").keyup(function() {
    if(isNaN($(this).val())) {
        eval("window." + $(this).attr("varName") + " = '" + $(this).val() + "'");
    } else {
        eval("window." + $(this).attr("varName") + " = " + $(this).val());
    }
})


//#########################################################################################


function saveField(classId) {
    if(classId[0] != "#") { classId = "#" + classId}
    window.resetElements.push([classId, $(classId).clone(true)]);
}

function setField(classId,attrib,value) {
    if(classId[0] != "#") { classId = "#" + classId}
    saveField(classId)
    $(classId).attr(attrib,value);
}

function resetField(data) {
    if(Number.isInteger(data)) {
        for(var i = (resetElements.length-1); i > (resetElements.length-data-1); i--) {
            $(resetElements[i][0]).replaceWith(resetElements[i][1])
        }
    } else {
        if(data != "#") { data = "#" + data}
        for(var i = (resetElements.length-1); i >= 0; i--) {
            if(resetElements[i][0] == data) {
                $(resetElements[i][0]).replaceWith(resetElements[i][1])
                return;
            }
        }
    }
}




// Reads the settings from the page (Password length, include numbers, etc...)
function readPassGenSettings(){

    var passGeneratorSettings ={
        "iPasswordLength":document.getElementById("example-number-input").value,
        "bIncludeLower":document.getElementById("chkLower").checked,
        "bIncludeUpper":document.getElementById("chkUpper").checked,
        "bIncludeNumber":document.getElementById("chkNumbers").checked,
        "bIncludeSpecial":document.getElementById("chkSpecial").checked
    }
    console.log("settings: -Length " + passGeneratorSettings.iPasswordLength + " -Lower " + passGeneratorSettings.bIncludeLower
    + " -Upper " + passGeneratorSettings.bIncludeUpper+ " -Numbers " + passGeneratorSettings.bIncludeNumber+ " -Special " 
    + passGeneratorSettings.bIncludeSpecial);
    
    return passGeneratorSettings;

}

//assignment/homework requirement is that at least one of the checkboxes should be selected. but no restriction on length
function isValid(passGeneratorSettings){
    var bResult=false;
    if (passGeneratorSettings.bIncludeLower || passGeneratorSettings.bIncludeUpper || passGeneratorSettings.bIncludeNumber || passGeneratorSettings.bIncludeSpecial){
        bResult=true;
    }
    return bResult;
}



// Generates a random number between iMin and iMax (inclusive)
function GetRandomInt(iMin, iMax){
    var iRandom =Math.floor(Math.random() * (iMax - iMin + 1) ) + iMin;
    console.log("GetRandomInt generated: " + iRandom);
    return iRandom;
}

// Generates a password per input parameters
function GeneratePassword(passGeneratorSettings){
            
    var sPswd="";
    var charType =[];
    //"Lower","Upper","Number","Special"
    if (passGeneratorSettings.bIncludeLower)  {charType.push("Lower");}
    if (passGeneratorSettings.bIncludeUpper)  {charType.push("Upper");}
    if (passGeneratorSettings.bIncludeNumber)  {charType.push("Number");}
    if (passGeneratorSettings.bIncludeSpecial)  {charType.push("Special");}
    if (charType.length>0){
        var specialChars=["~","`","!","@","#","$","%","^","&","*","(",")","-","_","+","=","{","[","}","]","|",":",";","<",",",">",".","?","/","\'","\"","\\"];
        for (var i=0;i<passGeneratorSettings.iPasswordLength;i++){
            var iType= GetRandomInt(0,charType.length-1);
            var sType=charType[iType];
            console.log("Selected type char #" + i + ": " + sType);
            switch(sType) {
                case "Lower":
                    // ascii code for lower chars: 97-122 
                    sPswd+=String.fromCharCode(GetRandomInt(97,122));
                    break;
                case "Upper":
                    // ascii code for upper chars: 65-90 
                    sPswd+=String.fromCharCode(GetRandomInt(65,90));
                    break;
                case "Number":
                    // ascii code for upper chars: 48-57
                    sPswd+=String.fromCharCode(GetRandomInt(48,57));
                    break;
                case "Special":
                    // The ascii codes for the Special chars are not sequential, so it's easier to store them in an array
                    sPswd+=specialChars[GetRandomInt(0,specialChars.length-1)];
                    break;
                default:
                    console.log("Error: Invalid char type:" + sType);
                                
            }
        }
    }
    else{console.log("Error: no char type was selected.");}
    console.log ("Generated password:" + sPswd);
    return sPswd;
            
}
// handles the Click event for the Generate button
function btnGen_Click() {
    var passGeneratorSettings=readPassGenSettings();
    var pswd="";
    if (isValid(passGeneratorSettings)){
        pswd= GeneratePassword(passGeneratorSettings);
        document.getElementById("txtPassword").value=pswd;
    }
    else{

        var msg="Invalid input! At least one of the checkboxes should be selected."
        console.log(msg);
        alert(msg);
    }
    document.getElementById("txtPassword").value=pswd;
}

// handles the Click event for the Copy button
function btnCopy_Click(){
    var copyText=document.getElementById("txtPassword");
    copyText.select();
    document.execCommand("copy");
}

document.getElementById("btnGen").addEventListener("click", btnGen_Click);
document.getElementById("btnCopy").addEventListener("click", btnCopy_Click);
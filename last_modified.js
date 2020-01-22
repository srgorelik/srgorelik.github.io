// set up string array for full names of months
var monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// function to return full month name (e.g., "October") 
// given shortened month name (e.g., "Oct")
function searchStringInArray(str, strArray) {
    for (var j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return strArray[j];
    }
    return -1;
}

// function to get XML header field for given URL
function fetchHeader(url, wch) {
    try {
        var req=new XMLHttpRequest();
        req.open("HEAD", url, false);
        req.send(null);
        if(req.status== 200){
            return req.getResponseHeader(wch);
        }
        else return false;
    } catch(er) {
        return er.message;
    }
}

// get last modified date for html page in which this script is called
var lastMod = fetchHeader(location.href,'Last-Modified');
var lastModStrArr = lastMod.split(" "); // convert string to string array

if (lastModStrArr[0] == "Failed") {
    // write nothing if header retrieval failed
    document.write("");
} else {
    // write last modified date if header retrieval did not fail
    var monthShort = lastModStrArr[2];
    var regex = new RegExp(monthShort, 'gi');
    var monthLong = searchStringInArray(regex, monthArr);
    var result = "Last updated " + monthLong + " " + lastModStrArr[3] + ".";
    document.write(result); 
}

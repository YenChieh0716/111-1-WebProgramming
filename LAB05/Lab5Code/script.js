function chgTableWidth200() {
    document.getElementsByTagName('table')[0].style.width = "200px";

}

function chgTableWidth500() {
    document.getElementsByTagName('table')[0].style.width = "500px";

}
function chgBSWidth1() {
    document.getElementById('table1').cellSpacing = "1";
    document.getElementById('table1').style.cssText = "border: black 1px solid;";
    document.getElementsByTagName('td').style.cssText = "border: black 1px solid; ";
}

function chgBSWidth10() {
    document.getElementById('table1').cellSpacing = "10";
    document.getElementById('table1').style.cssText = "border: black 10px solid;";
    document.getElementsByTagName('td').style.cssText = "border: black 10px solid; ";
}

function chgBSWidth20() {
    document.getElementById('table1').cellSpacing = "20";
    document.getElementById('table1').style.cssText = "border: black 20px solid;";
    document.getElementsByTagName('td').style.cssText = "border: black 20px solid;";
}

function chgColorG() {
    document.getElementById('table1').style.backgroundColor = "green";
    var tds = document.getElementsByTagName('td');
    for (var i = 0, max = tds.length; i < max; i++) {
        var node = tds[i];
        node.style.backgroundColor = "green";
    }

}

function chgColorB() {
    document.getElementById('table1').style.backgroundColor = "blue";
    var tds = document.getElementsByTagName('td');
    for (var i = 0, max = tds.length; i < max; i++) {
        var node = tds[i];
        node.style.backgroundColor = "blue";
    }

}

function chgColorP() {
    document.getElementById('table1').style.backgroundColor = "purple";
    var tds = document.getElementsByTagName('td');
    for (var i = 0, max = tds.length; i < max; i++) {
        var node = tds[i];
        node.style.backgroundColor = "purple";
    }

}

function chgColorO() {
    document.getElementById('table1').style.backgroundColor = "orange";
    var tds = document.getElementsByTagName('td');
    for (var i = 0, max = tds.length; i < max; i++) {
        var node = tds[i];
        node.style.backgroundColor = "orange";
    }

}

function Reset() {
    document.getElementById('table1').cellPadding = "1";
    document.getElementById('table1').cellSpacing = "5";
    document.getElementById('table1').style.backgroundColor = "white";
    document.getElementById('table1').style.cssText = "border: black 4px solid;";
    document.getElementsByTagName('td').style.cssText = "border: black 4px solid;";
    var tds = document.getElementsByTagName('td');
    for (var i = 0, max = tds.length; i < max; i++) {
        var node = tds[i];
        node.style.backgroundColor = "yellow";
    }
    document.getElementsByTagName('table')[0].style.width = "300px";

}
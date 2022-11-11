document.write("<table border=0>");

for (j = 1; j < 10; j++) {
    document.write("</tr>");
    for (i = 2; i < 10; i++) {
        var result = i * j;
        document.write();
        document.write("<td style= width:80px;>" + i + " * " + j + " = " + result);
        document.write("</td>");
    }
}
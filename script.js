// Initialize HTTP Request Object
var xmlhttp = new XMLHttpRequest();

// Request URL
var url = "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php";

// Callback function - Called when request completed
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let employees = Object.values(JSON.parse(this.responseText));
    displayEmployees(employees);
  }
};

// Define request method
xmlhttp.open("GET", url, true);

// Send HTTP request to given url
xmlhttp.send();

/**
 * Display employees cards generated from employees array in employees-container div
 * @param employees: Employees array 
 */
function displayEmployees(employees) {
  let htmlString = getHTMLString(employees);
  document.getElementById('employees-container').innerHTML = sanitizeHTML(htmlString);
}

/**
 * Returns Employee card html from employee object
 * @param employees: Employee Object 
 */
function getHTMLString(employees) {
  let htmlString = "";
  for (let employee of employees) {
    console.log(employee)
    htmlString += "<div class='info-content'>";
    htmlString += "<p class='crown'>";
    htmlString += (employee.employeeisfeatured == "1") ? '<img slot="crown-img" class="crown-img" src="crown.png">' : '';;
    htmlString += "</p><br><br>";
    htmlString += "<div class='user-logo-container'>";
    htmlString += '<img class="user-logo" src="http://sandbox.bittsdevelopment.com/code1/employeepics/' + employee.employeeid + '.jpg" />';
    htmlString += "</div>";
    htmlString += "<div>";
    htmlString += "<h2 class='employee-name'>";
    htmlString += employee.employeefname + ' ' + employee.employeelname;
    htmlString += "</h2>";
    htmlString += "<p class='employee-bio'>";
    htmlString += employee.employeebio;
    htmlString += "</p>";
    for (let role of employee.roles) {
      htmlString += '<span class="tag" style="background-color:' + role.rolecolor + ';">' + role.rolename + '</span>';
    }
    htmlString += "</div></div>";
  }
  return htmlString;
}


/**
 * Remove any unwanted script from html content
 * @param html: string = HTML content 
 */
function sanitizeHTML(html) {
  html.replace('<','&lt;');
  html.replace('>','&gt;');
  return html;
}
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
  let htmlElements = getHTMLElements(employees);
  for(let element of htmlElements){
    document.getElementById('employees-container').appendChild(element);
  }
}

/**
 * Returns Employee card html from the employee object
 * @param employees: Employee Object 
 */
function getHTMLElements(employees) {
  let employeesDiv = [];
  for (let employee of employees) {
    console.log(employee)
    let mainDiv = document.createElement("div");
    mainDiv.classList.add('info-content');
    
    if(employee.employeehaspic == "1") {
      let crownP = document.createElement('p');
      crownP.classList.add('crown');
      crownP.innerHTML = (sanitizeHTML(employee.employeeisfeatured) == "1") ? '<img slot="crown-img" class="crown-img" src="assets/images/crown.png">' : '';
      mainDiv.appendChild(crownP);
    }
    
    mainDiv.appendChild(document.createElement('br'));
    mainDiv.appendChild(document.createElement('br'));
    
    let employeeLogo = document.createElement('div');
    employeeLogo.classList.add('user-logo-container');
    let employeeImage = document.createElement('img');
    employeeImage.classList.add('user-logo');
    employeeImage.setAttribute('src', "http://sandbox.bittsdevelopment.com/code1/employeepics/" + sanitizeHTML(employee.employeeid) + ".jpg");
    employeeLogo.appendChild(employeeImage);
    mainDiv.appendChild(employeeLogo);

    let employeeInfo = document.createElement('div');
    let employeeName = document.createElement('h2');
    employeeName.classList.add('employee-name');
    employeeName.innerHTML = sanitizeHTML(employee.employeefname) + ' ' + sanitizeHTML(employee.employeelname);
    employeeInfo.appendChild(employeeName);
    
    let employeeBio = document.createElement('p');
    employeeBio.classList.add('employee-bio');
    employeeBio.innerHTML = sanitizeHTML(employee.employeebio);
    employeeInfo.appendChild(employeeBio);

    for (let role of employee.roles) {
      let employeeBadge = document.createElement('span');
      employeeBadge.classList.add('tag');
      employeeBadge.style.backgroundColor = role.rolecolor;
      employeeBadge.innerHTML = role.rolename;
      employeeInfo.appendChild(employeeBadge);
    }
    mainDiv.appendChild(employeeInfo);
    employeesDiv.push(mainDiv);
  }
  return employeesDiv;
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
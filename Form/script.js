let xmlDoc;

// Load the XML file
function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}

// Initialize the XML document
function init() {
    xmlDoc = loadXMLDoc("data.xml");
}

// Insert data into XML
function insertData() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let location = document.getElementById("location").value;
    let email = document.getElementById("email").value;

    let person = xmlDoc.createElement("person");

    let nameNode = xmlDoc.createElement("name");
    nameNode.appendChild(xmlDoc.createTextNode(name));
    person.appendChild(nameNode);

    let phoneNode = xmlDoc.createElement("phone");
    phoneNode.appendChild(xmlDoc.createTextNode(phone));
    person.appendChild(phoneNode);

    let locationNode = xmlDoc.createElement("location");
    locationNode.appendChild(xmlDoc.createTextNode(location));
    person.appendChild(locationNode);

    let emailNode = xmlDoc.createElement("email");
    emailNode.appendChild(xmlDoc.createTextNode(email));
    person.appendChild(emailNode);

    xmlDoc.getElementsByTagName("data")[0].appendChild(person);
}

// Update data in XML
function updateData() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let location = document.getElementById("location").value;
    let email = document.getElementById("email").value;

    let persons = xmlDoc.getElementsByTagName("person");
    for (let i = 0; i < persons.length; i++) {
        let person = persons[i];
        let personName = person.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        if (personName === name) {
            person.getElementsByTagName("phone")[0].childNodes[0].nodeValue = phone;
            person.getElementsByTagName("location")[0].childNodes[0].nodeValue = location;
            person.getElementsByTagName("email")[0].childNodes[0].nodeValue = email;
            break;
        }
    }
}


function deleteData() {
    let name = document.getElementById("name").value;

    let persons = xmlDoc.getElementsByTagName("person");

    for (let i = 0; i < persons.length; i++) {
        let personName = persons[i].getElementsByTagName("name")[0].textContent;

        if (personName === name) {
            persons[i].parentNode.removeChild(persons[i]);
            break; // Exit loop once the person is deleted
        }
    }
}


// Search data by name in XML
function searchByName() {
    let searchName = prompt("Enter name to search:");
    if (searchName) {
        let persons = xmlDoc.getElementsByTagName("person");
        for (let i = 0; i < persons.length; i++) {
            let name = persons[i].getElementsByTagName("name")[0].textContent;
            if (name.toLowerCase() === searchName.toLowerCase()) {
                currentPersonIndex = i;
                displayCurrentPerson();
                return;
            }
        }
        alert("Name not found");
    }
}


// Function to display search results
function displayResults(results) {
    let resultContainer = document.getElementById("searchResults");
    resultContainer.innerHTML = "";

    if (results.length === 0) {
        resultContainer.innerHTML = "No results found.";
    } else {
        results.forEach((person) => {
            let name = person.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            let phone = person.getElementsByTagName("phone")[0].childNodes[0].nodeValue;
            let location = person.getElementsByTagName("location")[0].childNodes[0].nodeValue;
            let email = person.getElementsByTagName("email")[0].childNodes[0].nodeValue;

            let resultDiv = document.createElement("div");
            resultDiv.classList.add("result");
            resultDiv.innerHTML = `<strong>Name:</strong> ${name}<br>
                                    <strong>Phone:</strong> ${phone}<br>
                                    <strong>Location:</strong> ${location}<br>
                                    <strong>Email:</strong> ${email}<br><br>`;

            resultContainer.appendChild(resultDiv);
        });
    }
}


let currentPersonIndex = 0;

// Display data for the current person
function displayCurrentPerson() {
    let persons = xmlDoc.getElementsByTagName("person");
    let person = persons[currentPersonIndex];

    document.getElementById("name").value = person.getElementsByTagName("name")[0].textContent;
    document.getElementById("phone").value = person.getElementsByTagName("phone")[0].textContent;
    document.getElementById("location").value = person.getElementsByTagName("location")[0].textContent;
    document.getElementById("email").value = person.getElementsByTagName("email")[0].textContent;
}

// Display previous record
function previous() {
    if (currentPersonIndex > 0) {
        currentPersonIndex--;
        displayCurrentPerson();
    }
}

// Display next record
function next() {
    let persons = xmlDoc.getElementsByTagName("person");
    if (currentPersonIndex < persons.length - 1) {
        currentPersonIndex++;
        displayCurrentPerson();
    }
}

// Initialize XML document
init();
displayCurrentPerson();  // Display the first record initially


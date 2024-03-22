<?php
session_start();

$xml = simplexml_load_file('data.xml');

function saveXML($xml) {
    $xml->asXML('data.xml');
}

// Logic for Next and Previous buttons
$currentEmployee = isset($_SESSION['currentEmployee']) ? $_SESSION['currentEmployee'] : 0;

if (isset($_POST['next'])) {
    $currentEmployee = min($currentEmployee + 1, $xml->count() - 1);
} elseif (isset($_POST['previous'])) {
    $currentEmployee = max($currentEmployee - 1, 0);
}

$_SESSION['currentEmployee'] = $currentEmployee;

// Logic for Insert button
if (isset($_POST['insert'])) {
    $employee = $xml->addChild('employee');
    $employee->addChild('name', $_POST['name']);
    $employee->addChild('phone', $_POST['phone']);
    $employee->addChild('location', $_POST['location']);
    $employee->addChild('email', $_POST['email']);
    saveXML($xml);
}

// Logic for Update button
if (isset($_POST['update'])) {
    $employee = $xml->employee[$currentEmployee];
    $employee->name = $_POST['name'];
    $employee->phone = $_POST['phone'];
    $employee->location = $_POST['location'];
    $employee->email = $_POST['email'];
    saveXML($xml);
}

// Logic for Delete button
if (isset($_POST['delete'])) {
    unset($xml->employee[$currentEmployee]);
    saveXML($xml);
    // Reset current employee data after deletion
    $currentEmployeeData = $xml->employee[$currentEmployee];
}

// Logic for Search button
if (isset($_POST['search'])) {
    // Display search prompt
    echo <<<HTML
    <script>
        var name = prompt("Enter name to search:");
        if (name !== null && name.trim() !== "") {
            window.location.href = "actions.php?search=" + name;
        }
    </script>
HTML;
}

// Handle search request
if (isset($_GET['search'])) {
    $searchTerm = $_GET['search'];
    $results = $xml->xpath("//employee[name[contains(., '$searchTerm')]]");
    // Display search results
    foreach ($results as $result) {
        echo "<p>{$result->name}, {$result->phone}, {$result->location}, {$result->email}</p>";
    }
}

// Get current employee details
$currentEmployeeData = $xml->employee[$currentEmployee];

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>
<body>
    <div class="d-flex justify-content-center align-items-center">
        <form method="post" action="actions.php">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" id="name" name="name" value="<?php echo $currentEmployeeData->name; ?>">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" class="form-control" id="phone" name="phone" value="<?php echo $currentEmployeeData->phone; ?>">
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" class="form-control" id="location" name="location" value="<?php echo $currentEmployeeData->location; ?>">
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" id="email" name="email" value="<?php echo $currentEmployeeData->email; ?>">
            </div>
            <br/>
            <button type="submit" class="btn btn-primary" name="insert">Insert</button>
            <button type="submit" class="btn btn-warning" name="update">Update</button>
            <button type="submit" class="btn btn-danger" name="delete">Delete</button>
            <button type="submit" class="btn btn-dark" name="search">Search by Name</button><br><br>
            <button type="submit" class="btn btn-success" name="previous">Previous</button>
            <button type="submit" class="btn btn-success" name="next">Next</button>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>

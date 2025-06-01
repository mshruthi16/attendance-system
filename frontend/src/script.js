const API_URL = "http://localhost:5000/api"; // Backend URL

// Create a new class
async function createClass() {
    const className = document.getElementById("className").value;
    if (!className) {
        alert("Enter a class name!");
        return;
    }

    const response = await fetch(`${API_URL}/classes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class_name: className })
    });

    const data = await response.json();
    document.getElementById("classResponse").innerText = `✅ Class Created: ID ${data.class_id}`;
}

// Mark attendance
async function markAttendance() {
    const classId = document.getElementById("classId").value;
    const uniqueNumber = document.getElementById("uniqueNumber").value;

    if (!classId || !uniqueNumber) {
        alert("Enter Class ID and Student Unique Number!");
        return;
    }

    const response = await fetch(`${API_URL}/classes/${classId}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unique_number: uniqueNumber })
    });

    const data = await response.json();
    document.getElementById("attendanceResponse").innerText = `✅ ${data.message}`;
}

// Upload CSV file
async function uploadCSV() {
    const classId = document.getElementById("csvClassId").value;
    const fileInput = document.getElementById("csvFile");
    
    if (!classId || !fileInput.files.length) {
        alert("Enter Class ID and select a file!");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const response = await fetch(`${API_URL}/classes/${classId}/import`, {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    document.getElementById("csvResponse").innerText = `✅ ${data.message}, Total Users: ${data.total_users}`;
}

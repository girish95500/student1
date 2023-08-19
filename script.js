// script.js
const students = [
    {
      ID: 1,
      name: 'Alice',
      age: 21,
      grade: 'A',
      degree: 'Btech',
      email: 'alice@example.com'
    },
    {
      ID: 2,
      name: 'Bob',
      age: 22,
      grade: 'B',
      degree: 'MBA',
      email: 'bob@example.com'
    },
    {
      ID: 3,
      name: 'Charlie',
      age: 20,
      grade: 'C',
      degree:'Arts',
      email: 'charlie@example.com'
    }
  ];
  
  const studentsList = document.getElementById('studentsList');
  const studentForm = document.getElementById('studentForm');
  const searchInput = document.getElementById('searchInput');
  
  // Display students
  function displayStudents() {
    studentsList.innerHTML = '';
    for (const student of students) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="editButton" data-id="${student.ID}">Edit</button>
          <button class="deleteButton" data-id="${student.ID}">Delete</button>
        </td>
      `;
      studentsList.appendChild(row);
    }
  }
  
  // Handle form submission
  studentForm.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const id = parseInt(studentForm.getAttribute('data-id'));
    const name = studentForm.name.value;
    const age = parseInt(studentForm.age.value);
    const grade = studentForm.grade.value;
    const degree = studentForm.degree.value;
    const email = studentForm.email.value;
  
    if (!name || !age || !grade || !degree || !email) {
      alert('Please fill in all fields.');
      return;
    }
  
    if (id) {
      // Edit existing student
      const index = students.findIndex(student => student.ID === id);
      if (index !== -1) {
        students[index] = { ID: id, name, age, grade, degree, email };
      }
    } else {
      // Add new student
      const newID = students.length + 1;
      students.push({ ID: newID, name, age, grade, degree, email });
    }
  
    studentForm.reset();
    studentForm.removeAttribute('data-id');
    document.getElementById('submitButton').textContent = 'Add Student';
    displayStudents();
  });
  
  // Handle edit and delete buttons
  studentsList.addEventListener('click', function (event) {
    const target = event.target;
    if (target.classList.contains('editButton')) {
      const id = parseInt(target.getAttribute('data-id'));
      const student = students.find(student => student.ID === id);
      if (student) {
        studentForm.name.value = student.name;
        studentForm.age.value = student.age;
        studentForm.grade.value = student.grade;
        studentForm.degree.value = student.degree;
        studentForm.email.value = student.email;
  
        studentForm.setAttribute('data-id', id);
        document.getElementById('submitButton').textContent = 'Edit Student';
      }
    } else if (target.classList.contains('deleteButton')) {
      const id = parseInt(target.getAttribute('data-id'));
      const index = students.findIndex(student => student.ID === id);
      if (index !== -1) {
        students.splice(index, 1);
        displayStudents();
      }
    }
  });
  
  // Handle search
  searchInput.addEventListener('input', function () {
    const searchText = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.degree.toLowerCase().includes(searchText)
    );
    displayFilteredStudents(filteredStudents);
  });
  
  // Display filtered students
  function displayFilteredStudents(filteredStudents) {
    studentsList.innerHTML = '';
    for (const student of filteredStudents) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td>${student.email}</td>
        <td>
          <button class="editButton" data-id="${student.ID}">Edit</button>
          <button class="deleteButton" data-id="${student.ID}">Delete</button>
        </td>
      `;
      studentsList.appendChild(row);
    }
  }
  
  // Initial display
  displayStudents();
  //your JS code here. If required.

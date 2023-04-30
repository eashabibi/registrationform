let userName = document.getElementById("txtUserName");
let email = document.getElementById("txtEmail");
let pwd = document.getElementById("txtPwd");
let conPwd = document.getElementById("txtConPwd");
let dob = document.getElementById("dob");
let form = document.querySelector("form");

function validatePassword() {
    //password

    if (pwd.value.length < 8) {
        pwd.setCustomValidity("Password must be greater than 8 characters");
        pwd.reportValidity();
    } else {
        pwd.setCustomValidity('');
    }
}

pwd.addEventListener('input', () => validatePassword());

function validateInput() {
    validateDOB();
    if (pwd.value.trim() !== conPwd.value.trim()) {
        conPwd.setCustomValidity("Password Must be Same");
        conPwd.reportValidity();
    } else {
        conPwd.setCustomValidity('');
    }
}

function loginForm() {
    validateInput();
    displayEntries();
}

function validateDOB() {
    const dobv = new Date(dob.value);
    const today = new Date();
    const age = Math.floor((today - dobv) / (365.25 * 24 * 60 * 60 * 1000));

    if (age >= 18 && age <= 55) {
        dob.setCustomValidity('');
    } else {
        dob.setCustomValidity("Invalid age. Please enter a date of birth between 18 and 55 years ago");
        dob.reportValidity();
    }
}

let userform = document.getElementById("login")

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}


let userEntries = retrieveEntries();
const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passCell = `<td>${entry.pass}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const chkbtnCell = `<td>${entry.chkbtn}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passCell} ${dobCell} ${chkbtnCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table id="table"><tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>dob</th>
    <th>accepted terms?</th>
    </tr>${tableEntries}</table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("txtUserName").value;
    const email = document.getElementById("txtEmail").value;
    const pass = document.getElementById("txtConPwd").value;
    const dob = document.getElementById("dob").value;
    const chkbtn = document.getElementById("chkbtn").checked;

    const entry = {
        name,
        email,
        pass,
        dob,
        chkbtn
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
    document.getElementById('login').reset();
}
userform.addEventListener('submit', saveUserForm);
displayEntries();
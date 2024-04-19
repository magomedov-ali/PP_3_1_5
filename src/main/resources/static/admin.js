$(async function () {
    await allUsers();
    await newUser();
    deleteUser();
    editCurrentUser();
});

async function allUsers() {
    const table = $('#bodyAllUserTable');
    table.empty()
    fetch("http://localhost:8080/admin")
        .then(r => r.json())
        .then(data => {
            data.forEach(user => {
                let users = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.roles.map(role => " " + role.name)}</td>
                            <td>
                                <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit" data-action="edit" data-id="${user.id}" data-target="#edit">Edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete" data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
                            </td>
                        </tr>)`;
                table.append(users);
            })
        })
        .catch((error) => {
            alert(error);
        })
}

async function newUser() {
    await fetch("http://localhost:8080/role")
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let element = document.createElement("option");
                element.text = role.name;
                element.value = role.id;
                $('#rolesNewUser')[0].appendChild(element);
            })
        })

    const formAddNewUser = document.forms["formAddNewUser"];

    formAddNewUser.addEventListener('submit', function (event) {
        event.preventDefault();
        let rolesNewUser = [];
        for (let i = 0; i < formAddNewUser.roles.options.length; i++) {
            if (formAddNewUser.roles.options[i].selected) rolesNewUser.push({
                id: formAddNewUser.roles.options[i].value,
                name: formAddNewUser.roles.options[i].name
            })
        }

        fetch("http://localhost:8080/admin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formAddNewUser.username.value,
                age: formAddNewUser.age.value,
                email: formAddNewUser.email.value,
                password: formAddNewUser.password.value,
                roles: rolesNewUser
            })
        }).then(() => {
            formAddNewUser.reset();
            allUsers();
            $('#allUsersTable').click();
        })
            .catch((error) => {
                alert(error);
            })
    })

}

function deleteUser() {
    const deleteForm = document.forms["formDeleteUser"];
    deleteForm.addEventListener("submit", function (event) {
        event.preventDefault();
        fetch("http://localhost:8080/admin/" + deleteForm.id.value, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                $('#deleteFormCloseButton').click();
                allUsers();
            })
            .catch((error) => {
                alert(error);
            });
    })
}


$(document).ready(function () {
    $('#delete').on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget);
        const id = button.data("id");
        viewDeleteModal(id);
    })
})

async function viewDeleteModal(id) {
    let userDelete = await getUser(id);
    let formDelete = document.forms["formDeleteUser"];
    formDelete.id.value = userDelete.id;
    formDelete.username.value = userDelete.username;
    formDelete.age.value = userDelete.age;
    formDelete.email.value = userDelete.email;

    $('#deleteRolesUser').empty();

    await fetch("http://localhost:8080/role")
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < userDelete.roles.length; i++) {
                    if (userDelete.roles[i].name === role.name) {
                        selectedRole = true;
                        break;
                    }
                }
                let element = document.createElement("option");
                element.text = role.name;
                element.value = role.id;
                if (selectedRole) element.selected = true;
                $('#deleteRolesUser')[0].appendChild(element);
            })
        })
        .catch((error) => {
            alert(error);
        })
}

async function getUser(id) {

    let url = "http://localhost:8080/admin" + id;
    let response = await fetch(url);
    return await response.json();
}

function editCurrentUser() {
    const editForm = document.forms["formEditUser"];
    editForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let editUserRoles = [];
        for (let i = 0; i < editForm.roles.options.length; i++) {
            if (editForm.roles.options[i].selected) editUserRoles.push({
                id: editForm.roles.options[i].value,
                name: editForm.roles.options[i].name
            })
        }

        fetch("http://localhost:8080/admin", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editForm.id.value,
                username: editForm.username.value,
                age: editForm.age.value,
                email: editForm.email.value,
                password: editForm.password.value,
                roles: editUserRoles
            })
        }).then(() => {
            $('#editFormCloseButton').click();
            allUsers();
        })
            .catch((error) => {
                alert(error);
            })
    })
}

$(document).ready(function () {
    $('#edit').on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget);
        const id = button.data("id");
        viewEditModal(id);
    })
})

async function viewEditModal(id) {
    let userEdit = await getUser(id);
    let form = document.forms["formEditUser"];
    form.id.value = userEdit.id;
    form.username.value = userEdit.username;
    form.age.value = userEdit.age;
    form.email.value = userEdit.email;
    form.password.value = userEdit.password;

    $('#editRolesUser').empty();

    await fetch("http://localhost:8080/role")
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < userEdit.roles.length; i++) {
                    if (userEdit.roles[i].name === role.name) {
                        selectedRole = true;
                        break;
                    }
                }
                let element = document.createElement("option");
                element.text = role.name;
                element.value = role.id;
                if (selectedRole) element.selected = true;
                $('#editRolesUser')[0].appendChild(element);
            })
        })
        .catch((error) => {
            alert(error);
        })
}
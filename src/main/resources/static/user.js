/*
Скрипт заполняет таблицу все поля в navbar и таблицу About User для /admin и /user
 */
$(async function () {
    await loadUser();
});

async function loadUser() {
    fetch("http://localhost:8080/user")
        .then(r => r.json())
        .then(data => {
            $('#navUsername').append(data.username);
            let roles = data.roles.map(role => " " + role.name);
            $('#navRoles').append(roles);
            let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.username}</td>
                <td>${data.age}</td>
                <td>${data.email}</td>
                <td>${roles}</td>)`;
            console.log(user);
            $('#userPanelBody').append(user);
        })
        .catch((error) => {
            alert(error);
        });
}
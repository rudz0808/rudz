let id = "no";
selectData();

function manageData() {
    document.getElementById('msg').innerHTML = "";

    let name = document.getElementById('name').value.trim();
    let age = document.getElementById('age').value.trim();
    let email = document.getElementById('email').value.trim();

    if (name === '' || age === '' || email === '') {
        document.getElementById('msg').innerHTML = 'Por favor complete todos los campos';
    } else {
        let arr = getCrudData();

        let newData = {
            name: name,
            age: age,
            email: email
        };

        if (id === 'no') {
            if (arr == null) {
                let data = [newData];
                setCrudData(data);
            } else {
                arr.push(newData);
                setCrudData(arr);
            }
            document.getElementById('msg').innerHTML = 'Dato agregado';
        } else {
            arr[id] = newData;
            setCrudData(arr);
            document.getElementById('msg').innerHTML = 'Dato actualizado';
        }

        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('email').value = '';
        id = 'no';
        selectData();
    }
}

function selectData() {
    let arr = getCrudData();
    if (arr != null) {
        let html = '';
        let sno = 1;
        for (let k in arr) {
            html += `<tr>
                        <td>${sno}</td>
                        <td>${arr[k].name}</td>
                        <td>${arr[k].age}</td>
                        <td>${arr[k].email}</td>
                        <td>
                            <a href="javascript:void(0)" onclick="editData(${k})">Editar</a> |
                            <a href="javascript:void(0)" onclick="deleteData(${k})">Eliminar</a>
                        </td>
                    </tr>`;
            sno++;
        }
        document.getElementById('root').innerHTML = html;
    } else {
        document.getElementById('root').innerHTML = '';
    }
}

function editData(rid) {
    id = rid;
    let arr = getCrudData();
    document.getElementById('name').value = arr[rid].name;
    document.getElementById('age').value = arr[rid].age;
    document.getElementById('email').value = arr[rid].email;
}

function deleteData(rid) {
    let arr = getCrudData();
    arr.splice(rid, 1);
    setCrudData(arr);
    selectData();
}

function getCrudData() {
    return JSON.parse(localStorage.getItem('crud'));
}

function setCrudData(arr) {
    localStorage.setItem('crud', JSON.stringify(arr));
}

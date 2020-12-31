const base_url = "http://localhost:3000"

async function handleButtonClick() {

    let input_val = document.getElementById("input_num").value;

    if (input_val.length == 0) {

        axios.get(base_url + '/test_endpoint')
        .then(response => {
            console.log(response.data)
            document.getElementById("response").innerHTML = response.data;
        })

    } else {

        axios.post(base_url + '/add_num',
            {
              num: parseInt(input_val),
            }
        )
        .then(response => {
            console.log(response.data)
            document.getElementById("response").innerHTML = response.data;
        })
        .catch(error => {
            console.error(error.response.data.error);
            document.getElementById("response").innerHTML = error.response.data.error;
        })
    }
}

async function handleUserClick() {

    let input_val = document.getElementById("input_num").value;

    axios.get(base_url + '/user/' + input_val)
    .then(response => {
        console.log(response.data)
        document.getElementById("response").innerHTML = response.data;
    })
}

async function createUserClick() {
    
    let user_email = document.getElementById("user_email").value;
    let user_type = document.getElementById("user_type").value;

    axios.post(base_url + '/user/create',
            {
                email: user_email,
                user_type: parseInt(user_type),
            }
        )
        .then(response => {
            var user = response.data
            console.log(user.email + ": " + user.user_type)
            document.getElementById("response_user").innerHTML = user.email + ": " + user.user_type;
        })
        .catch(error => {
            console.error(error.response.data.error);
            document.getElementById("response_user").innerHTML = error.response.data.error;
        })
}

async function loginUserClick() {
    
    let login_email = document.getElementById("login_email").value;

    axios.get(base_url + '/user/' + login_email
        )
        .then(response => {
            var data = response.data
            console.log(data.email + ": " + data.user_type)
            document.getElementById("response_login").innerHTML = data.email + ": " + data.user_type;
        })
        .catch(error => {
            console.error(error.response.data.error);
            document.getElementById("response_login").innerHTML = error.response.data.error;
        })
}

async function editUserClick() {
    
    let old_email = document.getElementById("edit_old_email").value;
    let new_email = document.getElementById("edit_new_email").value;

    axios.put(base_url + '/user/edit/email', 
        {
            old_email: old_email,
            new_email: new_email
        }
        )
        .then(response => {
            var data = response.data
            console.log(data.email + ": " + data.user_type)
            document.getElementById("response_edit").innerHTML = data.email + ": " + data.user_type;
        })
        .catch(error => {
            console.error(error);
            document.getElementById("response_edit").innerHTML = error.response.data.error;
        })
}

async function deleteUserClick() {
    
    let delete_email = document.getElementById("delete_email").value;

    axios.delete(base_url + '/user/delete/' + delete_email)
        .then(response => {
            document.getElementById("response_delete").innerHTML = delete_email + " was deleted successfully";
        })
        .catch(error => {
            console.error(error);
            document.getElementById("response_delete").innerHTML = error.response.data.error;
        })
}



async function getAllUsersClick() {
    axios.get(base_url + '/users')
        .then(response => {
            var data = response.data;
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                var user = data[i];
                console.log(user.email + ": " + user.user_type)
            }
            // document.getElementById("response_login").innerHTML = data.email + ": " + data.user_type;
        })
        .catch(error => {
            console.error(error.response.data.error);
            // document.getElementById("response_login").innerHTML = error.response.data.error;
        })
}
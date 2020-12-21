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
            console.error(error.response.data.error)
        })
    }
}
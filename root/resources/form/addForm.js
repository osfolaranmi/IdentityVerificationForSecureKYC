//  Web3 intializer
//  ABI definition, Binary Data and contract Address in contractDetails.js

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var kycContract = web3.eth.contract(abi);
var deployedContract = kycContract.new({
    data: binaryData,
    from: web3.eth.accounts[0],
    gas: 4700000
});
var contractInstance = kycContract.at(contractAddress);

//  account to make all transactions

var current_account = localStorage.bank_eth_account.toString();

//  function to create a new KYC profile

function onClickAdd() {
    var Data = getInfo();
    var usnm = document.getElementById("username").value;
    if (Data == undefined || usnm == "") {
        alert("Valid details required!");
        window.location = '../bankHomePage.html';
        return;
    }
    //  Data = performEncryption(Data);
    alert("Current bank accout: " + current_account);
    var check = contractInstance.addCustomer.call(usnm.toString(), Data.toString(), {
        from: current_account.toString(),
        gas: 4700000
    });
    if (check == 7) {
        alert("Access denied!");
        window.location = '../bankHomePage.html';
        return false;

    } else if (check == 1) {
        alert("Service limit reached! Try after some time...");
        window.location = '../bankHomePage.html';
        return false;
    } else if (check == 2) {
        alert("Customer already in database! Go to the modify form if you wish to change customer details. Thank you!");
        window.location = '../bankHomePage.html';
        return false;
    } else {
        contractInstance.addCustomer.sendTransaction(usnm, Data, {
            from: current_account.toString(),
            gas: 4700000
        });
        alert("Customer profile successfully created! Check the customer details from the view form tab. Thank you!");
        window.location = '../bankHomePage.html';
        return false;
    }
}

//  function to extract data from the form

function getInfo() {
    var data = document.getElementById("username").value + "!@#" + document.getElementById("first_name").value + "!@#" + document.getElementById("middle_name").value + "!@#" + document.getElementById("last_name").value + "!@#" + document.getElementById("occupation").value + "!@#" + document.getElementById("income_range").value + "!@#" + document.getElementById("DOB").value + "!@#";
    if (document.getElementById("gender_m").checked)
        data = data + "Male";
    else
        data = data + "Female";
    data = data + "!@#" + document.getElementById("address").value + "!@#" + document.getElementById("phone_1").value + "!@#" + document.getElementById("phone_2").value + "!@#" + document.getElementById("email").value + "!@#" + document.getElementById("country_res").value + "!@#" + document.getElementById("bvn").value  + "!@#";

    return data;
}

window.onload = (event) => {
   
    var addForm = document.getElementById('form1')
    var bvnForm = document.getElementById('bvnForm')
    addForm.style.display = 'none';
    document.getElementById("verifyBvn").addEventListener("click", function(event){
        event.preventDefault()
        var bvn = document.getElementById("bvnValue").value;
        const foundBvn = bvnArray.find((el) => el.bvn == bvn )
        if(foundBvn){
            addForm.style.display = "block";
            bvnForm.style.display = "none";
 
            setTimeout(()=> {
                document.getElementById("first_name").value = foundBvn.firstname;
                document.getElementById("middle_name").value = foundBvn.middlename;
                document.getElementById("last_name").value = foundBvn.lastname;
                document.getElementById("DOB").value = foundBvn.birthdate;
                
                document.getElementById("address").value = foundBvn.residentialAddress;
                document.getElementById("phone_1").value  = foundBvn.phone;
                document.getElementById("phone_2").value  = foundBvn.phone || null;
                document.getElementById("email").value = "";
                document.getElementById("country_res").value = "Nigeria" 
                document.getElementById("bvn").value = foundBvn.bvn;

                if(foundBvn.gender = "female"){
                    document.getElementById("gender_f").checked = true;
                }else{
                    document.getElementById("gender_m").checked = true;
                }
                
            }, 500)

        }else{
            Toastify({
                text: "Bvn Can not be found "+ bvn,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(98.3deg, rgb(0, 0, 0) 4.6%, rgb(255, 0, 0) 97.7%)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        }

    });
 };

 var bvnArray = [
    {
        "bvn": "12345678901",
        "firstname": "John",
        "lastname": "Doe",
        "middlename": "Jane",
        "phone": "08066676673",
        "gender": "female",
        "birthdate": "04-04-1944",
        "photo": "Base64 Encoded",
        "maritalStatus": "Single",
        "lgaOfResidence": "Surulere",
        "lgaOfOrigin": "Ijebu ode",
        "residentialAddress": "1 jameson street",
        "stateOfOrigin": "Ogun State",
        "enrollmentBank": "058",
        "enrollmentBranch": "BODIJA",
        "nameOnCard": "JOHN DOE",
        "title": "Mr",
        "levelOfAccount": "Level 2 - Medium Level Accounts",
    },
    {
        "bvn": "12345678902",
        "firstname": "Bruno",
        "lastname": "Fanandex",
        "middlename": "Flich",
        "phone": "08066676673",
        "gender": "male",
        "birthdate": "04-04-1944",
        "photo": "Base64 Encoded",
        "maritalStatus": "Single",
        "lgaOfResidence": "Surulere",
        "lgaOfOrigin": "Ijebu ode",
        "residentialAddress": "1 jameson street",
        "stateOfOrigin": "Ogun State",
        "enrollmentBank": "058",
        "enrollmentBranch": "BODIJA",
        "nameOnCard": "JOHN DOE",
        "title": "Mr",
        "levelOfAccount": "Level 2 - Medium Level Accounts",
    },
    {
        "bvn": "12345678903",
        "firstname": "Brussel",
        "lastname": "Dickson",
        "middlename": "Josh",
        "phone": "08066676673",
        "gender": "female",
        "birthdate": "04-04-1944",
        "photo": "Base64 Encoded",
        "maritalStatus": "Single",
        "lgaOfResidence": "Surulere",
        "lgaOfOrigin": "Ijebu ode",
        "residentialAddress": "1 jameson street",
        "stateOfOrigin": "Ogun State",
        "enrollmentBank": "058",
        "enrollmentBranch": "BODIJA",
        "nameOnCard": "JOHN DOE",
        "title": "Mr",
        "levelOfAccount": "Level 2 - Medium Level Accounts",
    },
    {
        "bvn": "12345678904",
        "firstname": "Hansi",
        "lastname": "Flcik",
        "middlename": "Jane",
        "phone": "08066676673",
        "gender": "male",
        "birthdate": "04-04-1944",
        "photo": "Base64 Encoded",
        "maritalStatus": "Single",
        "lgaOfResidence": "Surulere",
        "lgaOfOrigin": "Ijebu ode",
        "residentialAddress": "1 jameson street",
        "stateOfOrigin": "Ogun State",
        "enrollmentBank": "058",
        "enrollmentBranch": "BODIJA",
        "nameOnCard": "JOHN DOE",
        "title": "Mr",
        "levelOfAccount": "Level 2 - Medium Level Accounts",
    },
    {
        "bvn": "12345678905",
        "firstname": "Hector",
        "lastname": "Grindolf",
        "middlename": "Helro",
        "phone": "08066676673",
        "gender": "female",
        "birthdate": "04-04-1944",
        "photo": "Base64 Encoded",
        "maritalStatus": "Single",
        "lgaOfResidence": "Surulere",
        "lgaOfOrigin": "Ijebu ode",
        "residentialAddress": "1 jameson street",
        "stateOfOrigin": "Ogun State",
        "enrollmentBank": "058",
        "enrollmentBranch": "BODIJA",
        "nameOnCard": "JOHN DOE",
        "title": "Mr",
        "levelOfAccount": "Level 2 - Medium Level Accounts",
    },
    
]; 



const ssAddress = '0x5C51C15f255cC7e05fc901E489E7E2CEc8195b72' 
const ssABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "tutor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isAvail",
          "type": "bool"
        }
      ],
      "name": "LogAvailabilityChange",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tutorId",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "student",
          "type": "address"
        }
      ],
      "name": "LogDeleteBooking",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tutor",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "hourlyrate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "LogTutorAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tutor",
          "type": "uint256"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "student",
          "type": "address"
        }
      ],
      "name": "LogTutorBooked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "bookings",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "idList",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "idListLength",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tutors",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tutorId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "hourlyRate",
          "type": "uint256"
        },
        {
          "internalType": "enum Tutors.Status",
          "name": "status",
          "type": "uint8"
        },
        {
          "internalType": "address payable",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "subject",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "imgUrl",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "tutorsByAddress",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tutorsRegistered",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getTutors",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tutorId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "hourlyRate",
              "type": "uint256"
            },
            {
              "internalType": "enum Tutors.Status",
              "name": "status",
              "type": "uint8"
            },
            {
              "internalType": "address payable",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "subject",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "imgUrl",
              "type": "string"
            }
          ],
          "internalType": "struct Tutors.Tutor[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_hourlyRate",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_subject",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_imgUrl",
          "type": "string"
        }
      ],
      "name": "registerTutor",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tutorId",
          "type": "uint256"
        }
      ],
      "name": "bookTutor",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [],
      "name": "availableTutorIds",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "isAvail",
          "type": "bool"
        }
      ],
      "name": "setAvailability",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getSignups",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tutorId",
          "type": "uint256"
        }
      ],
      "name": "deleteBooking",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

var tutormap;
const statustext = ['Available', 'Booked', 'Not Available'];


async function asyncInitTutorsMap() {

    var web3 = new Web3(window.ethereum)
    const myContract = new web3.eth.Contract(ssABI, ssAddress)
    myContract.setProvider(window.ethereum)

    var tutors = await myContract.methods.getTutors().call()
    tutormap = {}
    for (let i = 0; i < tutors.length; i++) {
        tutormap[tutors[i].tutorId] = tutors[i];
    }
    // console.log(' --> ', tutormap);
    return tutormap;
}

const initTutorMap = (tutormap) => {
    const result = asyncInitTutorsMap();
    return result
}


/*
    Initialize table of rows with info for the tabulator
*/
function loadTable(tmap, table_id, selected_ids = []) {

    var web3 = new Web3(window.ethereum)
    ssTutorTable = document.getElementById(table_id);

    var available_tids = []
    var tableData = []
    for (var i in tmap) {

        if (selected_ids.length > 0
            && !selected_ids.includes(i)) {
            continue;
        }
        tableData.push(
            {
                tutorId: i,
                name: tmap[i].name,
                subject: tmap[i].subject,
                description: tmap[i].description,
                hourlyRate: web3.utils.fromWei(tmap[i].hourlyRate, 'ether'),
                status: statustext[tmap[i].status],
                imgUrl: tmap[i].imgUrl,
            }
        );
    }
    console.log('**** table *** ', tmap);
    if (selected_ids.length > 0) {
        colInfo = [
            { title: "Id", field: "tutorId" },
            { title: "Name", field: "name" },
            { title: "Subject", field: "subject" },
            { title: "Rate", field: "hourlyRate" },
        ]
    } else {
        colInfo = [
            { title: "Id", field: "tutorId" },
            { title: "Name", field: "name" },
            { title: "Subject", field: "subject" },
            { title: "Description", field: "description" },
            { title: "Rate", field: "hourlyRate" },
            { title: "Availability", field: "status" },
            { title: "Image", field: "imgUrl" }
        ]
    }
    var table = new Tabulator("#" + table_id, {
        layout: "fitDataTable",
        data: tableData, //set initial table data
        columns: colInfo,
    });
}

/*
    Remove populated options from select element
*/
function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for (i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
}


/*
    Populate dropdown element with tutor info
*/
function addTutorDropdown(tmap, elementid, selected_ids = []) {
    var select = document.getElementById(elementid);
    removeOptions(select);
    for (var i in tmap) {
        if (selected_ids.length > 0) {
            if (!selected_ids.includes(i)) {
                continue;
            }
        } else if (tmap[i].status !== '0') {
            continue;
        }

        var option = document.createElement('option');
        option.text = tmap[i].name + ' ( ' + tmap[i].subject + ' ) ';
        option.value = i;
        select.add(option, 0);
    }

}


/*
    tutor image grid display
    Return the html code for that
*/
function getTutorImageGrid(tmap) {

    var code = '';
    var closeddiv = true;
    var j = 0;
    for (var i in tmap) {
        tname = tmap[i].name;
        tsubj = tmap[i].subject;
        tavail = 'Available? &#x274C;';
        if (tmap[i].status === '0') {
            tavail = 'Available? &#x2705;';
        }
        trate = tmap[i].hourlyRate;
        tinfo = `<div class="tinfo">${tname} <br/>${tavail}</div>`;

        if (j % 4 === 0) {
            if (!closeddiv) {
                code += '</div>\n';
            }
            code += '<div class="row">';
            closeddiv = false;
        }
        j++;
        tdisplay = '<div class="column"><img src="images/p' + j + '.png" tutorid=' + i + ' alt="' + i + '" style="width:120px" onclick="tutorDetails(this);">' + tinfo + '</div>';
        code += tdisplay;
    }
    if (!closeddiv) {
        code += '</div>\n';
    }

    ssTutorDisplay = document.getElementById('ss-tutor-display');
    ssTutorDisplay.innerHTML = code;


    return 0;
}


/*
    Display tutor profile info with enlarged image
*/
function tutorProfileDetails(imgs) {
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    var imgInfo = document.getElementById("imginfo");
    var id = imgs.alt;
    tname = tutormap[id].name;
    tsubj = tutormap[id].subject;
    tavail = 'Available? &#x274C;';
    if (tutormap[id].status === '0') {
        tavail = 'Available? &#x2705;';
    }
    trate = tutormap[id].hourlyRate;
    tinfo = `<div>Name: ${tname}<br/>Subject: ${tsubj} <br/>Rate: ${trate}/hr<br/>${tavail}</div>`;


    expandImg.src = imgs.src;
    imgInfo.innerHTML = tinfo;
    expandImg.parentElement.style.display = "block";
}

function userTutorId(tmap, addr) {
    for (var i in tmap) {
        if (tmap[i].account.toLowerCase() === addr.toLowerCase()) {
            return i;
        }
    }
    return -1;
}

async function updateUI() {
    var web3 = new Web3(window.ethereum);
    const myContract = new web3.eth.Contract(ssABI, ssAddress)
    myContract.setProvider(window.ethereum);

    tutormap = await asyncInitTutorsMap();

    loadTable(tutormap, 'ss-tutor-table', selected_ids = []);
    getTutorImageGrid(tutormap);

    var available_tids = await myContract.methods.availableTutorIds().call({ from: ethereum.selectedAddress });
    addTutorDropdown(tutormap, 'ss-tid', selected_ids = available_tids);

    var my_tutorids = await myContract.methods.getSignups().call({ from: ethereum.selectedAddress });

    if (my_tutorids.length == 0) {
        my_tutorids = [0];
    }

    loadTable(tutormap, 'ss-mytutor-table', selected_ids = my_tutorids);
    addTutorDropdown(tutormap, 'ss-close-tutor', selected_ids = my_tutorids);

    // check if the current wallet account is a tutor and 
    // if yes, then update their status as to whether they are
    // available or unavailable
    // ethereum.selectedAddress
    tid = userTutorId(tutormap, ethereum.selectedAddress);
    console.log('TID= ', tid)
    // if (tid > -1) {
    //     let t_cb = document.getElementById('tutor-avail-cb');
    //     console.log('CB: ', t_cb)
    //     tid_status = tutormap[tid].status;
    //     if (tid_status == '0') {
    //         t_cb.checked = true;
    //     } else if (tid_status == '2') {
    //         t_cb.checked = false;
    //     }
    // }

}
/********************** MAIN UI interactions ********************************/


// ----------------------------------------------
//     DETECT METAMASK  
// ----------------------------------------------

window.addEventListener('load', function () {
    if (typeof window.ethereum !== 'undefined') {
        let mmDetected = this.document.getElementById('mm-detected');
        mmDetected.innerHTML = 'Metamask Detected';
    } else {
        console.log('Metamask not installed');
        this.alert('You need Metamask installed!');
    }
})

// ----------------------------------------------
//     CONNECT WITH METAMASK  
// ----------------------------------------------

const mmEnable = document.getElementById('mm-connect');

mmEnable.onclick = async () => {
    await ethereum.request({ method: 'eth_requestAccounts' });
    const mmCurrentAccount = document.getElementById('mm-current-account');

    mmCurrentAccount.innerHTML = 'MetaMask Account: ' + ethereum.selectedAddress;

    tutormap = await asyncInitTutorsMap();

    loadTable(tutormap, 'ss-tutor-table', selected_ids = []);
    getTutorImageGrid(tutormap);

    var web3 = new Web3(window.ethereum)
    const myContract = new web3.eth.Contract(ssABI, ssAddress)
    myContract.setProvider(window.ethereum)

    // var available_tids = await myContract.methods.availableTutorIds().call({ from: ethereum.selectedAddress });
    // console.log('AVAIL TIDS: ', available_tids);
    // addTutorDropdown(tutormap, 'ss-tid', selected_ids = available_tids);
    await updateUI();
}

// ----------------------------------------------
//     REGISTER TUTOR 
// ----------------------------------------------
const ssRegister = document.getElementById('ss-register-tutor')

ssRegister.onclick = async () => {

    var web3 = new Web3(window.ethereum)

    tname = document.getElementById("r-name").value;
    subject = document.getElementById("r-subject").value;
    descr = document.getElementById("r-description").value;
    imgURL = 'http://site.com/image.png';  // document.getElementById("r-imgURL").value;
    rate = web3.utils.toWei(document.getElementById("r-rate").value, 'ether');
    taddr = document.getElementById("r-address").value;

    console.log(tname, subject, descr, imgURL, rate, taddr)


    const myContract = new web3.eth.Contract(ssABI, ssAddress)
    myContract.setProvider(window.ethereum)

    await myContract.methods.registerTutor(
        tname,
        taddr,
        rate,
        subject,
        descr,
        imgURL
    ).send({ from: ethereum.selectedAddress });

    tutormap = await asyncInitTutorsMap();

    loadTable(tutormap, 'ss-tutor-table', selected_ids = []);
    getTutorImageGrid(tutormap);

    var available_tids = await myContract.methods.availableTutorIds().call({ from: ethereum.selectedAddress });
    addTutorDropdown(tutormap, 'ss-tid', selected_ids = available_tids);

}

// ----------------------------------------------
//     REMOVE TUTOR REGISTRATION   
// ----------------------------------------------
const ssAvail = document.getElementById('ss-tutor-avail');

ssAvail.onclick = async () => {

    var web3 = new Web3(window.ethereum)

    console.log("Remove tutor: ", ethereum.selectedAddress)

    const myContract = new web3.eth.Contract(ssABI, ssAddress)
    myContract.setProvider(window.ethereum)

    var new_status = document.getElementById("tutor-avail-cb").checked;
    await myContract.methods.setAvailability(new_status).send({ from: ethereum.selectedAddress });

    await updateUI();

}

// ----------------------------------------------
//     BOOK A SESSION WITH A TUTOR   
// ----------------------------------------------
const ssBook = document.getElementById('ss-book-button');

ssBook.onclick = async () => {
    // grab value from input

    const ssInputValue = document.getElementById('ss-tid').value;

    var web3 = new Web3(window.ethereum)

    if (!(ssInputValue in tutormap)) {
        alert('Missing tutor : ', ssInputValue);
        return;
    }

    const myContract = new web3.eth.Contract(ssABI, ssAddress)
    myContract.setProvider(window.ethereum)

    await myContract.methods.bookTutor(ssInputValue).send({ from: ethereum.selectedAddress, value: tutormap[ssInputValue].hourlyRate });

    await updateUI();



}

// ----------------------------------------------
//     MY TUTOR BOOKINGS  
// ----------------------------------------------
const ssBookedTutors = document.getElementById('ss-booked-tutors')

ssBookedTutors.onclick = async () => {

    var web3 = new Web3(window.ethereum)

    const myContract = new web3.eth.Contract(ssABI, ssAddress)
    myContract.setProvider(window.ethereum)

    var tutorids = await myContract.methods.getSignups().call({ from: ethereum.selectedAddress });

    await updateUI();

}


// ----------------------------------------------
//     MARK SESSION WITH TUTOR AS COMPLETED
// ----------------------------------------------
const ssSignoffButton = document.getElementById('ss-signoff-button')

ssSignoffButton.onclick = async () => {

    const ssInputValue = document.getElementById('ss-close-tutor').value;

    var web3 = new Web3(window.ethereum)

    const myContract = new web3.eth.Contract(ssABI, ssAddress)
    myContract.setProvider(window.ethereum)

    await myContract.methods.deleteBooking(ssInputValue).send(
        { from: ethereum.selectedAddress }
    );

    await updateUI();
}


//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
//The Fetch API provides an interface for fetching resources 
// (including across the network). 

// Three stages to taking user input and updating DOM
// 1- Connect script to HTML index using binding variables
// 2- Create function to receive user selected values (updateColor)
// 3- Use addEventListeners to update binding variables

// Colors (variables for color selections)
// select #color & #bg-color attributes from index html

const mainColorPicker = document.querySelector('#color');
const backgroundColorPicker = document.querySelector('#bg-color');

// update the label eg #000000
const mainColorValue = document.querySelector('#color-value');
const backgroundColorValue = document.querySelector('#bg-color-value');

// add user selected color to value variable
const updateColor = e => {
    // e.target.value takes in user input 'value' eg; #000000 ***
    // stored in value which becomes display text
    const value = e.target.value;
    console.log(value);
    // To update label with user selected "value"
    mainColorValue.innerText = value;
}

const updateBackgroundColor = e => {
    const value = e.target.value;
    console.log(value);
    backgroundColorValue.innerText = value;
}

// when user selects a color from the picker it will be sent to the API
// also, we want the eg; id="color-value">#000000 to be updated
// Add Event Listener Function
const addColorPickerEventListeners = () => {
    // * Event listener waits for change
    //** Then passes the user selected value from updateColor Function
    //*** mainColorPicker index.html attribute is updated  */
mainColorPicker.addEventListener('change',updateColor);
backgroundColorPicker.addEventListener('change',updateBackgroundColor);
};

// call
addColorPickerEventListeners();

//Sliders
// 1- create variables to bind user selected values to html attributes
// sizeSlider variable binds to html <input> element with id = #size

const sizeSlider = document.querySelector('#size');
// sizeSlider variable binds to html <input> element with id = #margin
const marginSlider = document.querySelector('#margin');
// sizeValue variable binds to html <span> element with id = #size-value
const sizeValue = document.querySelector('#size-value');
// marginValue variable binds to html <span> element with id = #margin-value
const marginValue = document.querySelector('#margin-value');

// 2 - create event listener function to initiate variable changes
const addSliderEventListeners =() =>{
    sizeSlider.addEventListener('change',updateSize);
    marginSlider.addEventListener('change',updateMargin);
}

// 3- create function to take user data
// add user selected color to value variable
const updateSize = e => {
    const value = e.target.value;
    sizeValue.innerText = `${value} x ${value}`;
}
// *** e parameter is used with the event listener
// it represents the element that was affected
const updateMargin = e => {
    const value = e.target.value;
    marginValue.innerText = `${value} px`;
}
// call
addSliderEventListeners();

// --- IMAGE FORMAT ---

// Take TEXT/URL Data
const dataInput = document.querySelector('#data');
// Hey JS, go to our page and find us an input with the name format that has a state of checked
const imageFormat = document.querySelector('input[name="format"]:checked');

const submitButton = document.querySelector('#cta');

// function if incorrect data entered
const showInputError = () =>{
// add a class to data input
dataInput.classList.add('error');
}
// remove input error when correct input is entered
// add event listener to flag new data event
const dataInputEventListener = () => {
    dataInput.addEventListener('change', e => {
        if (e.target.value !== '') {
            dataInput.classList.remove('error');
            submitButton.removeAttribute('disabled');
        } else {
            dataInput.classList.add('error');
            submitButton.setAttribute('disabled', true);
        }
    });
};




// docs 3.2 states that parameters format must be integer x integer ETC
// function to take attributes as parameters and 
// pass them to API to format
const prepareParameters = params =>{

    // ** create an object then go to the API to format
    // the attributes one by one 
    return {
        data: params.data,
        size: `${params.size}xs${params.size}`,
        // replace # with nothing
        color: params.color.replace('#',''),
        bgcolor: params.bgColor.replace('#',''),
        qzone: params.qZone,
        format: params.format,

    };
}


const settingsContainer = document.querySelector('#qr-code-settings');
const resultsContainer = document.querySelector('#qr-code-result');
const qrCodeImage = document.querySelector('#qr-code-image');

const displayQrCode = imgUrl => {
    settingsContainer.classList.add('flipped');
    resultsContainer.classList.add('flipped');

    qrCodeImage.setAttribute('src', imgUrl);
};

// get QR Code
const getQrCode = parameters =>{
    //API URL
    // URLSearchParams allows you to work with the query string of a URL.
    console.log(new URLSearchParams(parameters).toString());
    //Will use URL search params to read in object items
     // and create a URL string to send to API
    const urlParams = new URLSearchParams(parameters).toString();
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const fullUrl = `${baseUrl}?${urlParams}`;
    // Inspect-Network-Headers to see fetch ** 
    // can see preview also
    // fetch(`${baseUrl}?${urlParams}`);
    // FETCH is a way to communicate with API's
    fetch(fullUrl).then(response => {
        // 200 is status code for ok
        // can proceed withh url-qr
        if (response.status === 200) {
            displayQrCode(fullUrl);
        }
    });
}


// do not use event listener as the click is the event
const onSubmit = () => {
    console.log('submit clicked');

    // take input text/url
    const data = dataInput.value;
    // proof the data
    if (!data.length) {
        return showInputError();
    }
    // submit attribute values
    const color = mainColorPicker.value;
    const bgColor = backgroundColorPicker.value;
    const size = sizeSlider.value;
    // see docs for description of q zone (3.9)
    const qZone = marginSlider.value;
    const format = imageFormat.value;
    // attributes must be formatted as per docs 3.2
    // call function that passes argument to the API and store in variable parameters
    // use curly braces to send params as a single object argument
    const parameters = prepareParameters({data,color,bgColor,size,qZone,format});
     console.log(format + " -format");
    // Call the QR Code API, pass formatted parameters object as argument
    getQrCode(parameters);


} // end onSubmit function

const addSubmitEventListener =() =>{
    
    submitButton.addEventListener('click',onSubmit);
}

addSubmitEventListener();

const editButton = document.querySelector('#edit');
// flip container back
onEdit = () =>{
    // use remove to undo flip
    settingsContainer.classList.remove('flipped');
    resultsContainer.classList.remove('flipped');

    
}

const addEditButtonEventListener = () =>{
    editButton.addEventListener('click',onEdit);
}
addEditButtonEventListener();
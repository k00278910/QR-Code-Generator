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

const updateMargin = e => {
    const value = e.target.value;
    marginValue.innerText = `${value} px`;
}



addSliderEventListeners();


// Colors (variables for color selections)
const mainColorPicker = document.querySelector('#color');
const backgroundColorPicker = document.querySelector('#bg-color');

// update the label eg #000000
const mainColorValue = document.querySelector('#color-value');
const backgroundColorValue = document.querySelector('#bg-color-value');

// add user selected color to value variable
const updateColor = e => {
    // e.target.value takes in value ***
    // stored in value which becomes display text
    const value = e.target.value;
    console.log(value);
    // 
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
    // get the main color picker (above), 
    // add an event listener to it that is going to be called 
    //whenever there is a change and then call function
    // updateColor
mainColorPicker.addEventListener('change',updateColor);
backgroundColorPicker.addEventListener('change',updateBackgroundColor);
};


addColorPickerEventListeners();

//Sliders

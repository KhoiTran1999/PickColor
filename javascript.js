let colors = [
    {
        id:new Date().getTime(),
        color: '#9B72AA',
    },
];
//----------Dom---------------
const input = document.querySelector('form .form-group input');
const submitInput = document.querySelector('form');
const colorList = document.querySelector('ul');
const body = document.querySelector('body');
//----------------------------

submitInput.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    if (validateColor()) {
        colors.unshift(
            {
                id: new Date().getTime(),
                color: input.value
            },
        );
        render();
    }
    input.value='';
})

function validateColor () {
    input.value=input.value.trim();

    // Regular expression to match a hexadecimal color code
    let hexCode = /^#[0-9A-Fa-f]{6}$/;
    
    // Regular expression to match an RGB value
    let rgb = /^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/;
    
    // Regular expression to match an RGBA value
    let rgba = /^rgba\(\d{1,3},\d{1,3},\d{1,3},(0\.[0-9]{1,2}|1)\)$/;
    
    // Regular expression to match an HSL value
    let hsl = /^hsl\(\d{1,3},\d{1,3}%,\d{1,3}%\)$/;
    
    // Regular expression to match an HSLA value
    let hsla = /^hsla\(\d{1,3},\d{1,3}%,\d{1,3}%,(0\.[0-9]{1,2}|1)\)$/;
    
    // Check the format of the value
    if (hexCode.test(input.value)) {
        // If the value is a hexadecimal code, update the background color of an element
        return true;
    } else if (rgb.test(input.value) || rgba.test(input.value) || hsl.test(input.value) || hsla.test(input.value)) {
        // If the value is a valid RGB, RGBA, HSL, or HSLA value, update the background color of an element
        return true;
    } else if (validateColorName()) {
        // If the value is a color name, update the background color of an element
        return true;
    } else {
        // If the value is not a valid color representation, display an error message
        alert("Please enter a valid color representation (color name, hexadecimal, RGB, RGBA, HSL, or HSLA)");
            return false;
        }
}

function validateColorName() {
    if (input.value) {
        let element = document.createElement("div");
        element.style.backgroundColor = input.value;
        let computedColor = element.style.getPropertyValue("background-color");
        if (computedColor === input.value) {
        return true;
        } else {
        return false;
        }
    }
  }

function render () {
    colorList.innerHTML=colors.map((val)=>{
        return (`
        <li>
            <input style="background-color: ${val.color};"  type="text" value="${val.color}" readonly>
            <i class="fa-solid fa-trash-can" id="${val.id}"></i>
        </li>
        `)
    }).join('');
}

function deleteColor () {
    colorList.addEventListener('click', (e)=>{
        const getClassDelete = e.target.getAttribute('class');
        const id = e.target.getAttribute('id')
        if(getClassDelete === 'fa-solid fa-trash-can') {
            colors = colors.filter((val)=>{
                return val.id!= id;
            })
            render();
        }
    })
}

function pickColor () {
    colorList.addEventListener('click', (e)=>{
        let getColorCode = e.target.value;
        body.style.backgroundColor = getColorCode;
    })
}

pickColor();

deleteColor();

render();
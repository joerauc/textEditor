let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

// List of fontlist
//let fontList = ["Arial", "Verdana", "Times New Roman", "Garamond", "Georgia", "Courier New", "cursive"];

// let selection = [0,0]

// Initial Setting
const initializer = () => {
    // function calls for highlighting buttons
    // No highlights for link, unlink, lists, undo, redo, since they are one time operations
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    // Create options for font names
    // fontList.map(value => {
    //     let option = document.createElement("option");
    //     option.value = value;
    //     option.innerHTML = "text";
    //     fontName.appendChild(option);
    // });
    // let option = document.createElement("option");
    // option.value = "";
    // option.innerHTML = "";
    // fontName.appendChild(option)

    // fontSize list 1 - 7
    // for (let i = 1; i <= 7; i++) {
    //     let option = document.createElement("option");
    //     option.value = i;
    //     option.innerHTML = i;
    //     fontSizeRef.appendChild(option);
    // };

    // Default size
    fontSizeRef.value = 3;

    // Set default font on dropdown to Times New Roman
    // Leaving here but not using as I found out how to make the text editor default to Arial
    // fontName[2].selected = true;
};

// Main logic
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

// Operations that don't need a value parameter
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

const changeFontName = () => {
    selection = document.getElementById("fontName");
    const option = selection[selection.selectedIndex];
    modifyText("fontName", false, option.value);
    const value = option.value;
    selection.selectedIndex=0;
    selection[selection.selectedIndex].innerHTML = value;
}

const changeFontSize = () => {
    selection = document.getElementById("fontSize");
    const option = selection[selection.selectedIndex];
    modifyText("fontSize", false, option.value);
    const value = option.value;
    selection.selectedIndex=0;
    selection[selection.selectedIndex].innerHTML = value;
}

const changeHeader = () => {
    selection = document.getElementById("formatBlock");
    const option = selection[selection.selectedIndex];
    modifyText("formatBlock", false, option.value);
    const value = option.value;
    selection.selectedIndex=0;
    selection[selection.selectedIndex].innerHTML = value;
}

// Operations that require a value parameter and don't otherwise have a listener
/*
- Create link
- Font color
- Highlight color
*/
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

// Moved outside of code block above as keeping the comment there breaks highlight and font colors
        // const selection = window.getSelection();
        // const range = selection.getRangeAt(0);
        // const span = document.createElement('span');
        // span.style.fontFamily = button.value;
        // range.surroundContents(span);

// function newSelectionCheck() {
//     const newSelection = [document.getSelection().focusOffset, document.getSelection().anchorOffset];
//     console.log(`New selection: ${newSelection}`)
//     //console.log(`New selection type: ${newSelection.type}`)
//     console.log(`Selection: ${selection}`)
//     if (newSelection[0] === selection[0] && newSelection[1] === selection[1]) {
//         console.log("This is the same selection. Returns False.");
//         return false
//     } else {
//         selection = [newSelection[0], newSelection[1]]
//         console.log("This is a new selection. Returns True.");
//         return true
//     }
// }

// writingArea.addEventListener("selectionchange", () => {
//             modifyText(fontName.id, false, fontName.value)
//     });

// fontName.addEventListener("onfocusout", () => {
//     console.log("I was executed.")
//     modifyText(fontName.id, false, fontName.value)
// });
// fontSizeRef.addEventListener("onBlur", () => {
//     modifyText(fontSizeRef.id, false, fontSizeRef.value)
// });

// fontName.addEventListener("mouseup", () => {
//     if (newSelectionCheck()){
//         modifyText(fontName.id, false, fontName.value)
//     }
// });
// fontSizeRef.addEventListener("mouseup", () => {
//     if (newSelectionCheck()){
//         modifyText(fontSizeRef.id, false, fontSizeRef.value)
//     }
// });

/*
const updateBulletPointSize = () => {
    const listItems = document.querySelectorAll("#text-input ul li");
    const fontSize = parseFloat(fontSizeRef.value);
    const bulletPointSize = fontSize;

    listItems.forEach(item => {
        item.style.fontSize = fontSize + 'px';
        item.style.paddingLeft = `${bulletPointSize}px`;
    });
}

// Listener for updating bullet point size
fontSizeRef.addEventListener("change", updateBulletPointSize());
*/

// link
linkButton.addEventListener(("click"), () => {
    let userLink = prompt("Enter a URL");
    // If link has http then pass directly else add https
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

// Highlight clicked button
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) { // Only one button should be highlighted
                let alreadyActive = false;

                // If currently clicked button is already active
                if (button.classList.contains("active")) {
                    alreadyActive = True;
                }

                // Remove highlight form other buttons
                highlighterRemover(className);
                if (!alreadyActive) {
                    // Highlight clicked button
                    button.classList.add("active");
                }
            }
            else {
                //if other buttons can be highlighted
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

window.onload = initializer();
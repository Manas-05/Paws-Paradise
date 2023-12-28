document.addEventListener("DOMContentLoaded", function() {
    var string = 'hii';
    var boxElement = document.getElementById('box');
    
    console.log(boxElement); // Check if boxElement is not null
    if (boxElement) {
        boxElement.innerHTML = string;
    } else {
        console.error("Element with ID 'box' not found.");
    }
});

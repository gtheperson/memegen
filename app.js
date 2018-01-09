// Meme generator script


// get top and bottom text and asign js vars
var topInput = document.getElementById('topText');
var bottomInput = document.getElementById('bottomText');


// texts as empty strings
window.topText = "";
window.bottomText = "";


// add event listeners to inputs on text
topInput.oninput = textChangeListener;
bottomInput.oninput = textChangeListener;



// add event listeners to buttons so functions execute when they are clicked
document.getElementById("file").addEventListener("change", handleFileSelect);
document.getElementById("saveBtn").addEventListener("click", saveFile);


// redraw the canvas when image or text is changed
function redrawMeme(image, topText, bottomText) {
	var c = document.getElementById("c");
	var ctx = c.getContext("2d");
	
	// draw the image at the start of the canvas, and fit it to 400x400 pixels
	ctx.drawImage(image, 0, 0, 400, 400);
	
	ctx.textAlign = "center"
	ctx.strokeStyle = "black";
	ctx.fillStyle = "white";
	ctx.lineWidth = 6;
	
	// shrink font if long sentence
	if (topText.length < 15) {
		ctx.font = "60px impact";
	} else if (topText.length < 24) {
		ctx.font = "40px impact";
	} else {
		ctx.font = "20px impact";
	}
	ctx.textBaseline = "top";
	ctx.strokeText(topText, 200, 10);
	ctx.fillText(topText, 200, 10);
	
	if (bottomText.length < 15) {
		ctx.font = "60px impact";
	} else if (bottomText.length < 24) {
		ctx.font = "40px impact";
	} else {
		ctx.font = "20px impact";
	}
	ctx.textBaseline = "bottom";
	ctx.strokeText(bottomText, 200, 390);
	ctx.fillText(bottomText, 200, 390);
}


// notice when text is changed and reset variables
function textChangeListener (evt) {
	// set to top or bottom as changed
	var id = evt.target.id;
	var text = evt.target.value;
	
	// check which text was changed
	if (id == "topText") {
		window.topText = text;
	} else {
		window.bottomText = text;
	}
	redrawMeme(window.imageSrc, window.topText, window.bottomText);
}


// function to set canvas image as selected file
function handleFileSelect(evt) {
	var canvasWidth = 400;
	var canvasHeight = 400;
	// files returns a list of selected files, so we choose the first in the list
	var file = evt.target.files[0];
	
	// FileReader allows a web app to read the data of the selected local file
	var reader = new FileReader();
	// when the file is succesfully read
	reader.onload = function(fileObject) {
		// asign the read data to a variable
		var data = fileObject.target.result;
		
		// generate a new html image
		var image = new Image();
		image.onload = function() {
			window.imageSrc = this;
			redrawMeme(window.imageSrc, window.topText, window.bottomText);
		}
		// set background image to read file
		image.src = data;
		console.log(fileObject.target.result);
	};
	// read the processed data as a url for the image source, won't work otherwise!
	reader.readAsDataURL(file);
}

function saveFile() {
	// replaces broken function
	//creats an imgage with the drawn canvas in it as an image, writes it to a new window, and opens that window
	var url = document.querySelector("canvas").toDataURL();
	var img = "<title>My Meme</title><img src='" + url + "'></img>";
	var openWin = window.open();
	openWin.document.open();
	openWin.document.write(img);
	openWin.document.close();
}
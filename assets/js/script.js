let imageDirectory = "assets/images/"
var numEntries = 1;
var selectedImage = "";
let participants = [
    {
        name : "Franz Ferdinand",
        image : imageDirectory + "Franz_Ferdinand.jpg"
    },
    {
        name : "Czar Nicholas",
        image : imageDirectory + "Czar_Nicholas.jpg"
    },
    {
        name : "David Lloyd George",
        image : imageDirectory + "David_Lloyd_George.jpg"
    },
    {
        name : "Franz Joseph",
        image : imageDirectory + "Franz-Joseph.jpg"
    },
    {
        name : "King George V",
        image : imageDirectory + "king_george-v.jpg"
    },
    {
        name : "Raymond Poincaré",
        image : imageDirectory + "Raymond_Poincaré.jpg"
    }, 
    {
        name : "Serbia",
        image : imageDirectory + "serbia.jpg"
    },
    {
        name : "Sultan Mehmed V",
        image : imageDirectory + "sultan_mehmed_V.jpg"
    },
    {
        name : "The Black Hand",
        image : imageDirectory + "The-Black-Hand.jpg"
    },
    {
        name : "Wilhelm II",
        image : imageDirectory + "wilhelm-ii.jpg"
    }
]

function createSelect(id) {
    const selectImage = $("<select class='participantSelect' data-select-id='" + id + "'>")

    selectImage.append('<option selected="true" disabled="disabled">--Select--</option>')
    
    participants.forEach(entry => {
        selectImage.append('<option value="' + entry.name + '">' + entry.name + '</option>');
    })

    return selectImage;
}

$(".reply-card-addNew button").on("click", function() {
    numEntries = numEntries + 1;
    var newCard = $("<div class='reply-card' data-id='" + numEntries + "'>")
    var newSelectImage = createSelect(numEntries);
    newCard.append(newSelectImage);

    $(".container").append(newCard);
})

$(".container").on("change", ".participantSelect", function(event) {

    for (var i = 0; i < participants.length; i++) {
        if (participants[i].name === event.target.value) {
            selectedImage = participants[i].image;
        }
    }

    var newImage = $('<img class="reply-card-pic" src="' + selectedImage + '" alt="' + event.target.value + '"/>')

    var currentCard =  $(".container").find(".reply-card[data-id='" + event.target.getAttribute('data-select-id') + "']");

    currentCard.append(newImage);
    currentCard.append($("<textarea class='reply-card-text'>"));
    currentCard.append($("<div class='reply-card-date'><label>Date:</label><input placeholder='7/28/1914'></input></div>"));

    $(event.target).css('display', 'none');

})

$(".make-image button").on("click", function() {
    $(".image-download").empty();

    var convertToImg = $(".container")[0];

    html2canvas(convertToImg).then(function(canvas) {

        console.log(canvas)

        let downloadLink = $("<a class='downloadImage'>");
        downloadLink.text("Click here for Image");
        downloadLink.attr('href', canvas.toDataURL());
        downloadLink.attr('download', 'myImage.png');

        $(".image-download").append(downloadLink);
        downloadLink[0].click();
        $(".image-download").empty();
    })
})

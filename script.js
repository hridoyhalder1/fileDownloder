const fileInput  = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener ("click", e => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
})

function fetchFile(url){

    // fetching file & returning response as a blob
    fetch(url).then(res => res.blob()).then(file => {
        // URL.createobjectURL() creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl; //passing  tempURL as href value of <a></a> tag.
        aTag.download = url.replace(/^.*[\\\/]/, ''); //passing filename as download value of <a></a> tag.
        document.body.appendChild(aTag); // adding <a></a> tag inside body 
        aTag.click(); //clickng a tag so the file downloaded
        aTag.remove(); //removing a tag so the file once downloaded
        URL.revokeObjectURL(tempUrl); //removing tempURL from the document
        downloadBtn.innerText = "Downloaded File";
        
    }).catch(() => {
        downloadBtn.innerText = "Downloaded File";
        alert("Failed to download file!");
    })
}
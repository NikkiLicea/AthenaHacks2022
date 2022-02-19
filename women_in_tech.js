// use api key to get endpoint
let endpoint = "https://women-in-tech.apievangelist.com/apis/people/";
ajax(endpoint);

function ajax(endpoint) {
    // request data
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", endpoint);
    httpRequest.send();

    // check if success
    httpRequest.onreadystatechange = function () {
        // console.log(httpRequest.readyState);
        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200) {
                // status 200 means success! we have a succesful response back from iTunes
                // console.log(httpRequest.responseText);
                displayResults(httpRequest.responseText)
            }
            else {
                alert("AJAX error!!!");
                console.log(httpRequest.status);
            }
        }
    }
}



function displayResults(resultsString) {
    // This function will actually display the results

    // Convert the JSON string into JS objects
    let resultsJS = JSON.parse(resultsString);
    console.log(resultsJS[0]);

    // Clear the previous results
    document.querySelector(".women").replaceChildren();

    // For every result that itunes gave us, we will create a table row
    for (let i = 0; i < resultsJS.length; i++) {
        let htmlString = `
        <div class="col-md-3 image" style="padding:20px; border-bottom: gray 1px solid;" >
            <img src="${resultsJS[i].image_path}" width="150px">
        </div>

        <div class="col-md-9" style="padding:20px; border-bottom: gray 1px solid;">
            <h2> 
                <a href="${resultsJS[i].website}"
                     target="_blank">${resultsJS[i].name}</a>
            </h2>
            <p>
                ${resultsJS[i].details}
            </p>

        </div>

        `;

        document.querySelector(".women").innerHTML += htmlString;

    }

}


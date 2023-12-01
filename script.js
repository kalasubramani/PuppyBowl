//fetch puppy list from api while page loads
fetchPuppyList();
let puppyData = [];

//make API call to fetch puppy List
async function fetchPuppyList() {
  //call API

    const response = await fetch(
      "https://fsa-puppy-bowl.herokuapp.com/api/2310/players"
    );
    //process the received data
    const data = await response.json();
    puppyData = data.data.players;
 
  //renderthe page
  render();
}

function render() {
   const selectedPuppy = window.location.hash.slice(1);

  if (selectedPuppy) {
    //clear puppylist
    document.querySelector("#puppyListDiv").innerHTML = "";
    renderSelectedPuppy();
  } else {
    //clear selected puppy details
    document.querySelector("#puppyDetailsDiv").innerHTML = "";
    renderPuppyList();
  }
}

function renderPuppyList() {
  const html = puppyData.map((currentPuppy) => {
    //HTML elements for displaying all pups
    return `<div class="puppyList">
              <a href="#${currentPuppy.name}">${currentPuppy.name}</a>
              <p class="breed">${currentPuppy.breed}</p>
              </div>`;
  });

  //render contents to puppylist element
  document.querySelector(
    "#puppyListDiv"
  ).innerHTML = `<div class="puppyListDiv">${html.join("")}</div>`;

  //empty selected puppy
  document.querySelector("#puppyDetailsDiv").innerHTML = "";
}

//add event listener for hashchange
window.addEventListener("hashchange", () => {
  console.log("Hash change occured ");
  render();
});

function renderSelectedPuppy() {
   //hashing
  document.querySelector("#puppyListDiv").innerHTML = "";

  //get selected puppy name from hash
  const selectedPuppy = window.location.hash.slice(1);

  //get selected puppy details from data
  const selectedPuppyData = puppyData.find((puppy) => {
    return puppy.name === selectedPuppy;
  });

  //HTML contents for displaying selected pup
  const html = `<div class="selectedPup">                  
                    <h3>${selectedPuppyData.name}</h3>    
                    <div class="puppyDetails">              
                      <img src="${selectedPuppyData.imageUrl}" alt="" class="pupImage"> 
                      <ul class="list">
                        <li><span class="bold">Team Id : </span>${selectedPuppyData.teamId}</li> 
                        <li><span class="bold"> Status :  </span>${selectedPuppyData.status}</li>
                        <li><span class="bold"> Breed :  </span>${selectedPuppyData.breed}</li>
                      </ul>
                    </div>
                    <a href="#" class="goBackLink">Go back to all puppies</a>
                </div>`;

  //render contents to puppylist element
  document.querySelector("#puppyDetailsDiv").innerHTML = html;
}

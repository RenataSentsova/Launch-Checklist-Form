document.addEventListener('DOMContentLoaded', () => {

   const container = document.getElementById("missionTarget");
   const pilotName = document.querySelector("input[name=pilotName]");
   const copilotName = document.querySelector("input[name=copilotName]");
   const fuelLevel = document.querySelector("input[name=fuelLevel]");
   const cargoMass = document.querySelector("input[name=cargoMass]");
   const faultyItemsDiv = document.getElementById("faultyItems");
   const form = document.querySelector("form");
   const launchStatus =document.getElementById("launchStatus");
   const pilotStatus = document.getElementById("pilotStatus");
   const copilotStatus = document.getElementById("copilotStatus");
   const fuelStatus = document.getElementById("fuelStatus");
   const cargoStatus = document.getElementById("cargoStatus");


   const getData = (handler) => {
      fetch("https://handlers.education.launchcode.org/static/planets.json")
          .then(response => response.json())
          .then(handler);
   };

   const renderMissionTarget = (planets) => {
      if (planets.length) {
         let index = Math.floor(Math.random() * Math.floor(planets.length));
         container.textContent='';
         container.innerHTML += `<h2>Mission Destination</h2>
                                 <ol>
                                    <li>Name: ${planets[index].name}</li>
                                    <li>Diameter: ${planets[index].diameter}</li>
                                    <li>Star: ${planets[index].star}</li>
                                    <li>Distance from Earth: ${planets[index].distance}</li>
                                    <li>Number of Moons: ${planets[index].moons}</li>
                                 </ol>
                                 <img src=${planets[index].image}>`;
      }
      else {
         const text = `<table>
                     <tr align="center"><th><h2 style="color:red;">
                     Sorry, we did not find any products
                     </th></hd></tr>
                     </table>`;
         container.innerHTML = text;
      }
   };

   const getRedSignal = () => {
      faultyItemsDiv.style.visibility = "visible";
      launchStatus.style.color = "red";
      launchStatus.textContent = "Shuttle not ready for launch"; 
      event.preventDefault();
   };

   const updateFaultyItems = () => {
      launchStatus.textContent = "Shuttle is ready for launch"; 
      launchStatus.style.color = "green";
      pilotStatus.textContent = `Pilot ${pilotName.value} is ready for launch`;
      copilotStatus.textContent = `Co-pilot ${copilotName.value} is ready for launch`;
      if (parseInt(fuelLevel.value) < 10000) {
         fuelStatus.textContent = "There is not enough fuel for the journey.";
         getRedSignal();
      }
      else {
         fuelStatus.textContent = "Fuel level high enough for launch.";
      }
      if (parseInt(cargoMass.value) > 10000) {
         cargoStatus.textContent = "There is too much mass for the shuttle to take off.";
         getRedSignal();
      }
      else {
         cargoStatus.textContent = "Cargo mass low enough for launch.";
      }
   };

   const readyToLaunch = () => {
      let hasNumber = /\d/;
      if (pilotName.value.length==0 || copilotName.value.length==0
      || fuelLevel.value.length==0 || cargoMass.value.length==0) {
         alert("All fields are required!");
         event.preventDefault();
      }
      else if (hasNumber.test(pilotName.value) || hasNumber.test(copilotName.value) 
      || isNaN(parseInt(fuelLevel.value)) || isNaN(parseInt(cargoMass.value))) {
         alert("Information is not valid!");
         event.preventDefault();
      }
      else updateFaultyItems();
      if (launchStatus.textContent == "Shuttle is ready for launch"){
         alert("Shuttle is ready for launch");
      }
   };

    form.addEventListener('submit', readyToLaunch);
    getData(renderMissionTarget);
});
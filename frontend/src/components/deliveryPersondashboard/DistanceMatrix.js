import React,{useEffect,useState} from "react";


const DistanceMatrix = () =>{
    const apiUrl = 'http://localhost:8000/distance';

fetch(`${apiUrl}?origins=329North 1st Street&destinations=San Francisco International Airport, CA|Concord,MA&departure_time=now`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

}


export default DistanceMatrix;
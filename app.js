"use strict";
// db76ef84-6dd5-4f2d-8b16-7628c139858c

const key = "db76ef84-6dd5-4f2d-8b16-7628c139858c";

const urlCountries = `http://api.airvisual.com/v2/countries?key=${key}`;

const urlByCityName = `http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key={{YOUR_API_KEY}}`;

const countriesList = document.querySelector(".countries__list");
const statesList = document.querySelector(".states__list");
const citesList = document.querySelector(".cities__list");

const cardContainer = document.querySelector(".card");
let cntCt = "";
let cntSt = "";

// async functions

// async function to get country
const getCountry = async function () {
  try {
    const response = await fetch(urlCountries);
    const data = await response.json();
    displayCountries(data);
  } catch (error) {
    alert(`Unable to fetch countries ${error}`);
  }
};
getCountry();

// async function to get state
const getState = async function (countryName) {
  try {
    const response = await fetch(
      `http://api.airvisual.com/v2/states?country=${countryName}&key=${key}`
    );
    const states = await response.json();
    console.log(states);
    displayStates(states);
  } catch (error) {
    alert(`Unable to fetch states: ${error}`);
  }
};

// async function to get city
const getCity = async function (stateName, cntCountry) {
  try {
    const response = await fetch(
      `http://api.airvisual.com/v2/cities?state=${stateName}&country=${cntCountry}&key=${key}`
    );
    const cities = await response.json();
    console.log(cities);
    displayCities(cities);
  } catch (error) {
    alert(`Unable to fetch states: ${error}`);
  }
};

// async function to get city's weather

const getData = async function (cntCountry, stateName, cntCity) {
  try {
    const response = await fetch(
      `http://api.airvisual.com/v2/city?city=${cntCity}&state=${stateName}&country=${cntCountry}&key=${key}`
    );
    const data = await response.json();
    displayData(data);
  } catch (error) {
    alert(`Unable to fetch states: ${error}`);
  }
};

// Display logic

// Display countries
const displayCountries = function (countriesData) {
  countriesList.innerHTML = "";
  countriesList.innerHTML = `<option value="">Select Country</option>`;
  const { data: countries } = countriesData;
  countries.forEach(function (country) {
    const html = `
        <option>${country.country}</option>
  `;
    countriesList.insertAdjacentHTML("beforeend", html);
  });
};

// Display states
const displayStates = function (statesData) {
  statesList.innerHTML = "";
  statesList.innerHTML = `<option value="">Select State</option>`;
  const { data: states } = statesData;
  states.forEach(function (state) {
    const html = `
        <option>${state.state}</option>
  `;
    statesList.insertAdjacentHTML("beforeend", html);
  });
};

// Display cities
const displayCities = function (citiesData) {
  citesList.innerHTML = "";
  citesList.innerHTML = `<option value="">Select State</option>`;
  const { data: cities } = citiesData;
  cities.forEach(function (city) {
    const html = `
        <option>${city.city}</option>
  `;
    citesList.insertAdjacentHTML("beforeend", html);
  });
};

// Display card data

const displayData = function ({ data }) {
  cardContainer.innerHTML = "";
  const {
    city,
    country,
    state,
    current: {
      weather: { hu, ic, pr, tp, ts, ws },
    },
  } = data;
  console.log(city, country, state, hu, ic, pr, tp, ts, ws);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(ts);
  const d = date.getDay();
  let today = "";
  for (let i = 0; i < days.length; i++) {
    today = days[d];
  }
  console.log(today);

  const html = `
      <img src=${ic}.png alt="icon">
      <h1 class="temp">${tp}<span>&#8451;</span></h1>
      <div class="container__date">
        <p class="day">${today}</p>
        <p class="date">${date.toLocaleDateString()}</p>
      </div>
      <div class="location">
        <span class="city">${city}, </span>
        <span class="country">${country}</span>
      </div>
        <p class="humidity">Humidity:${hu}%</p>
        <p class="wind">Wind Speed:${ws}m/s</p>
      </div>
  `;

  cardContainer.insertAdjacentHTML("afterbegin", html);
};

// Event handlers

// for countries list
countriesList.addEventListener("change", function (e) {
  e.preventDefault();
  const cnt = document.querySelector(".countries__list").value;
  getState(cnt);
  cntCt = cnt;
});

// for states list
statesList.addEventListener("change", function (e) {
  e.preventDefault();
  const st = document.querySelector(".states__list").value;
  console.log(st);
  cntSt = st;
  getCity(st, cntCt);
});

// for cities list

citesList.addEventListener("change", function (e) {
  e.preventDefault();
  const ct = document.querySelector(".cities__list").value;
  console.log(ct);
  getData(cntCt, cntSt, ct);
});

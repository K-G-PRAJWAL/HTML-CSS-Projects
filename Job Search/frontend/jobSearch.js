import { jobTemplate } from "./templates";
import { extractFormData, getCurrencySymbol } from "./utils";

export class JobSearch {
  constructor(
    searchFormSelector,
    resultsContainerSelector,
    loadingElementSelector
  ) {
    this.searchForm = document.querySelector(searchFormSelector);
    this.resultsContainer = document.querySelector(resultsContainerSelector);
    this.loadingElement = document.querySelector(loadingElementSelector);
  }

  setCountryCode() {
    this.countryCode = "in";
    this.setCurrencySymbol();

    fetch("http://ip-api.com/json")
      .then((results) => results.json())
      .then((results) => {
        this.countryCode = results.countryCode.toLowerCase();
        this.setCurrencySymbol();
      });
  }

  setCurrencySymbol() {
    this.currencySymbol = getCurrencySymbol(this.countryCode);
  }

  configureFormListener() {
    this.searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.startLoading();
      this.resultsContainer.innerHTML = "";
      const { search, location } = extractFormData(this.searchForm);
      fetch(
        `http://localhost:3000/?search=${search}&location=${location}&country=${this.countryCode}`
      )
        .then((response) => response.json())
        .then(({ results }) => {
          this.stopLoading();
          return results
            .map((job) => jobTemplate(job, this.currencySymbol))
            .join("");
        })
        .then((jobs) => (this.resultsContainer.innerHTML = jobs))
        .catch(() => this.stopLoading());
    });
  }

  startLoading() {
    this.loadingElement.classList.add("loading");
  }

  stopLoading() {
    this.loadingElement.classList.remove("loading");
  }
}

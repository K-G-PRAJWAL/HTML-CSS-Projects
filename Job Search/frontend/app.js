import { JobSearch } from "./JobSearch";

const jobSearch = new JobSearch(
  "#search-form",
  ".result-container",
  ".loading-element"
);
jobSearch.setCountryCode();
jobSearch.configureFormListener();

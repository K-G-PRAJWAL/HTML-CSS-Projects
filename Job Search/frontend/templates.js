export const jobTemplate = (job, currency) => `
<div class="card">
  <div class="card-body">
  <h4 class="card-title">${job.title} - up to ${currency}${
  job.salary_max ? job.salary_max : "Not Mentioned"
}</h4>
  <h5>${job.location.display_name}</h5>
  <p class="card-text">${job.description}</p>
  <a href="${job.redirect_url}">View Job</a>
  </div>
</div>
`;

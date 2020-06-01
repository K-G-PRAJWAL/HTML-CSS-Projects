export const extractFormData = (form) =>
  Array.from(form.elements).reduce(
    (acc, { id, value }) => ({ [id]: value, ...acc }),
    {}
  );

export const getCurrencySymbol = (country) => {
  const currencies = {
    gb: "£",
    us: "$",
    au: "$",
    ca: "$",
    in: " ₹",
  };
  return currencies[country];
};

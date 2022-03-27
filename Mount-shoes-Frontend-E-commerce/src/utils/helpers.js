export const formatPrice = (number) => {
  const newNumber = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  let all_types = data.map((item) => item[type]);
  if (type === "colors") {
    all_types = all_types.flat();
  }
  return ["all", ...new Set(all_types)];
};


export const getColorCode = (color) => {
  let colorCode = color;
  if (color === "Havan") colorCode = "#ce8121";
  if (color.includes("Verni")) colorCode = "#4c4c4c";
  // if (color == "Brown") colorCode = "#361d16";
  return colorCode;
};
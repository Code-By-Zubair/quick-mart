// make function to select random colors

import AppColors from "../constants/App_colors";

const getRandomColor = () => {
  const colors = [
    AppColors.grey,
    AppColors.primary,
    AppColors.secondary,
    AppColors.blue,
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export { getRandomColor };

// TODO: might not actually need this fn

export const removeElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "none";
  }
};

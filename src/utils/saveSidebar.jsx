export const saveSidebar = (state) => {
  if (localStorage.getItem("sidebar")) {
    if (state === "full") {
      if (localStorage.getItem("sidebar") === "collabsed") {
        localStorage.setItem("sidebar", state);
      }
    } else {
      localStorage.setItem("sidebar", "collabsed");
    }
  } else {
    if (document.documentElement.classList.contains("sidebar")) {
      localStorage.setItem("sidebar", "full");
    }
  }
};

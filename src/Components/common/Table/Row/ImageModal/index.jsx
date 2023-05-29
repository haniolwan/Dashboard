import { useEffect } from "react";

const ImageModal = () => {
  useEffect(() => {
    document.addEventListener("click", function (event) {
      const modal = document.getElementById("myModal");
      const outsideClick = modal && !modal.contains(event.target);
      if (modal && !outsideClick) {
        modal.style.display = "none";
      }
    });
  }, []);
  return (
    <div id="myModal" className="modal">
      <img className="modal-content" id="img01" alt="" />
      <div id="caption"></div>
    </div>
  );
};

export default ImageModal;

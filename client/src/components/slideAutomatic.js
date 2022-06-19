import { START_AUTO_SLIDE_CONTAINER, STOP_AUTO_SLIDE_CONTAINER } from "../services/domService.js";
import { renderSlider } from "./renderSlider.js";

let interval;
let index = 0;
const setSlideAutomatic = (num, pictures = []) => {

  	function start() {
			if (!pictures.length) return null;
			if (index < pictures.length) {
				renderSlider(pictures, index);
				index++;
			} else {
				index = 0;
				renderSlider(pictures, index);
			}
  }
  
  if (num === true) {
    setTimeout(function () {
			interval = setInterval(start, 1000);
		}, 1000);
		START_AUTO_SLIDE_CONTAINER.className = 'd-none';
    STOP_AUTO_SLIDE_CONTAINER.className = 'd-block';
    
	
	}
  if (num === false) {
    clearInterval(interval);
		START_AUTO_SLIDE_CONTAINER.className = 'd-block';
		STOP_AUTO_SLIDE_CONTAINER.className = 'd-none';
		return null;
  };  
};

export default setSlideAutomatic;
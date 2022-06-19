import PAGES from "./models/pageModel.js";
import { onChangePage, setNavDisplay } from "./routes/router.js";
import { renderSlider } from "./components/renderSlider.js";
import { setCounter } from "./services/sliderService.js";
import initialData from "./initialData/initialData.js";

import {
  HOME_PAGE_LINK,
  ABOUT_PAGE_LINK,
  CREATE_PIC_PAGE_LINK,
  LOGIN_PAGE_LINK,
  LINK_TO_HOME_PAGE,
  SLIDER_PREV_BTN,
  SLIDER_NEXT_BTN,
  SIGNUP_PAGE_LINK,
  LOGOUT_LINK,
  TABLE_ICON,
  SLIDER_ICON,
  CARDS_ICON,
  SORT_DOWN_ICON,
  SORT_UP_ICON,
  SEARCH_BAR,
  EDIT_USER_LINK,
  LINK_TO_SINGUP_PAGE,
  LOGIN_LINK_CONTAINER,
  LOGOUT_LINK_CONTAINER,
  START_AUTO_SLIDE,
  STOP_AUTO_SLIDE,
  LIKES_LINK,
} from "./services/domService.js";
import {
  getIdInArr,
  handleCancelCreateNewPic,
  handleCreatePic,
  onCancelEditPic,
  onCreateNewPic,
  onEditPic,
} from "./services/picService.js";
import {
  handleCancelSignup,
  handleLogin,
  handleSignup,
  onSignupNewUser,
} from "./services/userService.js";
import { removeItemFromLocalStorage } from "./services/localStorageService.js";
import DISPLAY from "./models/displayModel.js";
import { handleDisplayMode } from "./services/displayModeService.js";
import {
  filterArrayOfObjectsByTerm,
  sortArrayOfObject,
  sortReverseArrayOfObject,
} from "./utils/algoMethods.js";
import {
	handleCancelEditUser,
	handleEditUser,
	onEditUser,
} from './services/editUserService.js';
import setSlideAutomatic from './components/slideAutomatic.js';
import { infoIdArr } from "./components/renderTable.js";
import renderLikesPictures from "./components/renderLikes.js";

let counter = 0;
let pictures;
let users;



const getData = async () => {
  try {
    /********** יצירת משתנים גלובליים **********/
    const data = await initialData();
    users = data.users;
    pictures = data.pictures;

    /********** לוגיקה ***********/
    const handleSliderPicChange = (controller = "") => {
      counter = setCounter(pictures, counter, controller);
      renderSlider(pictures, counter);
    };

    /********** filter pictures **********/
    const handleFilterPictures = term => {
      const newPictures = filterArrayOfObjectsByTerm(term, pictures, "alt");
      handleDisplayMode(DISPLAY.TABLE, newPictures);
    };

    /********** האזנה לאירועים ***********/
    // ניתוב דפים
    HOME_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.HOME));
    ABOUT_PAGE_LINK.addEventListener("click", () => onChangePage(PAGES.ABOUT));
    CREATE_PIC_PAGE_LINK.addEventListener("click", handleCreatePic);
    EDIT_USER_LINK.addEventListener('click', () =>
			handleEditUser(users)
    );
    LIKES_LINK.addEventListener('click', () => onChangePage(PAGES.LIKES));
    SIGNUP_PAGE_LINK.addEventListener("click", handleSignup);
    LOGIN_PAGE_LINK.addEventListener("click", () => handleLogin(users));
    LOGOUT_LINK.addEventListener("click", () => {
      removeItemFromLocalStorage("user");
      setNavDisplay();
      onChangePage(PAGES.HOME);
    });
    LINK_TO_HOME_PAGE.addEventListener("click", () => onChangePage(PAGES.HOME));
    LINK_TO_SINGUP_PAGE.addEventListener('click', () => onChangePage(PAGES.SIGN_UP));


    // מצגת תמונות
    SLIDER_PREV_BTN.addEventListener("click", () =>
      handleSliderPicChange("prev")
    );
    SLIDER_NEXT_BTN.addEventListener("click", () =>
      handleSliderPicChange("next")
    );
    START_AUTO_SLIDE.addEventListener('click', () => setSlideAutomatic(true, pictures)
    );
    STOP_AUTO_SLIDE.addEventListener('click', () =>
			setSlideAutomatic(false, pictures)
    );    
    
    
    // Display Mode
    TABLE_ICON.addEventListener("click", () =>
      handleDisplayMode(DISPLAY.TABLE, pictures)
    );
    SLIDER_ICON.addEventListener("click", () =>
      handleDisplayMode(DISPLAY.SLIDER, pictures)
    );
    CARDS_ICON.addEventListener("click", () =>
      handleDisplayMode(DISPLAY.CARDS, pictures)
    );


    // Sorting
    SORT_DOWN_ICON.addEventListener("click", () => {
      pictures = sortArrayOfObject(pictures, "alt");
      handleDisplayMode(DISPLAY.TABLE, pictures);
    });
    SORT_UP_ICON.addEventListener("click", () => {
      pictures = sortReverseArrayOfObject(pictures, "alt");
      handleDisplayMode(DISPLAY.TABLE, pictures);
    });


    // שדה חיפוש
    SEARCH_BAR.addEventListener("input", e =>
      handleFilterPictures(e.target.value)
    );

    /********** אתחול ראשוני ***********/
    handleSliderPicChange();
    setNavDisplay();
   renderLikesPictures();
    // onChangePage(PAGES.EDIT_PIC);
    onChangePage(PAGES.HOME);
    // handleDisplayMode(DISPLAY.SLIDER, pictures);
    handleDisplayMode(DISPLAY.CARDS, pictures);
    // handleDisplayMode(DISPLAY.TABLE, pictures);    
  } catch (error) {
    console.log(error);
  }
};

getData();

/********* Create Picture **********/
export const handleSubmitNewPic = () => {
  pictures = onCreateNewPic(pictures);
  handleCancelCreateNewPic();
  handleDisplayMode(DISPLAY.TABLE, pictures);
};

/********* Delete Picture **********/
export const handleDeletePic = id => {
  pictures = pictures.filter(pic => pic._id !== id);
  handleDisplayMode(DISPLAY.TABLE, pictures);
};

/********** Edit picture **********/
export const onSubmitEditPic = id => {
  pictures = onEditPic(pictures, id);
  onCancelEditPic(pictures);
  handleDisplayMode(DISPLAY.TABLE, pictures);
};

/********** Signup new User **********/
export const handleSubmitSignup = () => {
  users = onSignupNewUser(users);
  handleCancelSignup();
  onChangePage(PAGES.HOME);
  LOGIN_LINK_CONTAINER.className = 'd-none';
  LOGOUT_LINK_CONTAINER.className = 'navbar-nav';
};

/********** Edit User **********/
export const handleSubmitEditUser = () => {
  onEditUser();
  handleCancelEditUser(users);
  onChangePage(PAGES.HOME);
};

/********** More Picture Info **********/
export const handleMoreInfo = () => {
  onChangePage(PAGES.MORE_INFO_PIC);
}

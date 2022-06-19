import { LIKES_BODY } from "../services/domService.js ";
import { toDeleteLike } from "../services/picService.js";

export let arrAfterLikes = [];


const renderLikesPictures = (likeId,likes = []) => {
  // if (!likes.length) return LIKES_BODY.innerHTML = "There is no pictures that you liked";
  
  likes.find((like) => {
    if (`like${like._id}` === likeId) {
      const { _id, url, alt, price, credits } = like;
      arrAfterLikes.push(`remove${_id}`);
		LIKES_BODY.innerHTML += `
        <div class="card col-12 col-md-6 col-xl-4 col-xxl-3 mb-2 px-0">
        <div id="info${_id}">
        <img
          src="${url}"
          alt="${alt}"
          class="card-img-top"
        />
        </div>
        <div class="card-body">
          <h5 class="card-title">${alt}</h5>
          <p>Credits: <span class="fw-bold">${credits}</span></p>
          <hr />
          <div class="justify-content-between d-flex">
            <div>Price: <span class="fw-bold cursor">${price}</span>$</div>
            <div class="bi bi-trash3 cursor btn btn-outline-dark" id="remove${_id}" vlaue="0"></div>
          </div>
        </div>
      </div>
        `;
    }
  });
  toDeleteLike(arrAfterLikes, likes);
};

export default renderLikesPictures;

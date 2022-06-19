
import { CARDS_ROW } from "../services/domService.js";
import { clickLikeBtn } from "../services/picService.js";
export let likesIdArr = [];

const renderCards = (cards = []) => {
  CARDS_ROW.innerHTML = "";
  cards.map((card) => {
    const { _id, url, alt, price, credits } = card;
    likesIdArr.push(`like${_id}`);
    CARDS_ROW.innerHTML += `
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
            <div class="bi bi-cart cursor btn btn-outline-primary" id="like${_id}"></div>
          </div>
        </div>
      </div>
        `;
  });
  clickLikeBtn(likesIdArr, cards);
};

export default renderCards;
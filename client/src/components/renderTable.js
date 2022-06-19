import { TABLE_BODY } from "../services/domService.js";

export let infoIdArr = [];

const renderTable = (pictures = []) => {
  TABLE_BODY.innerHTML = "";
  pictures.map((picture, index) => {
    const { _id, url, alt, credits } = picture;
    infoIdArr.push(_id);
    TABLE_BODY.innerHTML += `
    <tr class="">
    <td>${index + 1}</td>
    <td id="pic${_id}">
    <div id="${_id}" class="btn cursor">
      <img
        style="max-width: 50px"
        src="${url}"
        alt="${alt}"
      />
      </div>
    </td>
    <td>
      ${url}
    </td>
    <td>${alt}</td>
    <td>${credits}</td>
    <td><i class="bi bi-pencil-square cursor" id="edit${_id}"></i></td>
    <td><i class="bi bi-trash3-fill cursor" id="delete${_id}"></i></td>
  </tr>
            `;
  });
};


export default renderTable;

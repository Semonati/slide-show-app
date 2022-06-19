import { handleMoreInfo } from "../app.js";
import { PIC_INFO } from "../services/domService.js";


const picContent = (picId, pictures = []) => {
	if (!pictures.length) return console.log('no pics');
	PIC_INFO.innerHTML = '';
	pictures.find((pic) => {
    if (picId == pic._id) {
      handleMoreInfo();
			const { _id, createdAt, alt } = pic;
			PIC_INFO.innerHTML = `<div class="row">
	              <div class="col-12 col-md-3">
	                <label for="id-pic-field">ID:</label>
	                <input
	                  class="form-control mb-2"
	                  type="text"
	                  name="id-pic"
	                  value="${_id}"
	                  id="id-pic-field"
	                  minlength="2"
	                />
	                <span id="id-pic-error-span" class="text-danger"></span>
	              </div>
	              <div class="col-12 col-md-4">
	                <label for="title-pic-field">Title:</label>
	                <input
	                  class="form-control mb-2"
	                  type="text"
	                  name="title-pic"
	                  value="${alt}"
	                  id="title-pic-field"
	                  minlength="2"
	                />
	                <span id="title-pic-error-span" class="text-danger"></span>
	              </div>
	            <div class="col-12 col-md-5">
	                <label for="create-at-pic-field">Create At:</label>
	                <input
	                  class="form-control mb-2"
	                  type="text"
	                  name="create-at-pic"
	                  value="${createdAt}"
	                  id="create-at-pic-field"
	                  minlength="2"
	                />
	                <span id="create-at-pic-error-span" class="text-danger"></span>
	              </div>
	            </div>
	            <div class="row">
	              <div class="col-12">
	                <label for="description-pic-field">Description:</label>
	                <input
	                  class="form-control mb-2"
	                  type="text"
	                  name="description-pic"
	                  value=""
	                  id="description-pic-field"
	                  minlength="2"
	                />
	                <span id="description-pic-error-span" class="text-danger"></span>
	              </div>

	            </div>`;
		}
	});
}

export default picContent;


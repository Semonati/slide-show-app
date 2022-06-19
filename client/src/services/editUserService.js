import PAGES from '../models/pageModel.js';
import { onChangePage } from '../routes/router.js';
import {
	SUBMIT_BTN_EDIT,
	CANCEL_BTN_EDIT,
	FIRST_EDIT_FIELD,
	STATE_EDIT_FIELD,
	PHONE_EDIT_FIELD,
	EMAIL_EDIT_FIELD,
	COUNTRY_EDIT_FIELD,
	CITY_EDIT_FIELD,
	STREET_EDIT_FIELD,
	PASSWORD_EDIT_FIELD,
	ZIP_EDIT_FIELD,
	HOUSE_EDIT_FIELD,
	PASSWORD_RE_ENTER_EDIT_FIELD,
	LAST_EDIT_FIELD,
	FIRST_EDIT_ERROR,
	LAST_EDIT_ERROR,
	STATE_EDIT_ERROR,
	COUNTRY_EDIT_ERROR,
	CITY_EDIT_ERROR,
	STREET_EDIT_ERROR,
	HOUSE_EDIT_ERROR,
	ZIP_EDIT_ERROR,
	EMAIL_EDIT_ERROR,
	PHONE_EDIT_ERROR,
	PASSWORD_EDIT_ERROR,
	PASSWORD_RE_ENTER_EDIT_ERROR,
	BIZ_EDIT_FIELD,
} from '../services/domService.js';
import { handleSubmitEditUser } from '../app.js';
import useForm from '../services/formService.js';
import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemInLocalStorage } from './localStorageService.js';

let userId;
let user;

const { onChangeInputField, onClearFormFields } = useForm();

export const handleEditUser = (users = []) => {
	onChangePage(PAGES.EDIT_USER);
	const token = getItemFromLocalStorage('user');
	user = JSON.parse(token);
	userId = user._id;
	mapToUserModel(userId, users);
	SUBMIT_BTN_EDIT.addEventListener('click', handleSubmitEditUser);
	CANCEL_BTN_EDIT.addEventListener('click', handleCancelEditUser);
};

export const editUserListeners = () => {
	const schema = ['first-edit', 'last-edit', 'email-edit', 'password-edit', 'passwordReEnter-edit'];

	FIRST_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: FIRST_EDIT_ERROR,
				validation: { min: 2 },
			},
			SUBMIT_BTN_EDIT
		)
	);

	LAST_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: LAST_EDIT_ERROR,
				validation: { min: 2 },
			},
			SUBMIT_BTN_EDIT
		)
	);

	STATE_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: STATE_EDIT_ERROR,
				validation: { min: 2 },
			},
			SUBMIT_BTN_EDIT
		)
	);

	COUNTRY_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: COUNTRY_EDIT_ERROR,
				validation: { min: 2 },
			},
			SUBMIT_BTN_EDIT
		)
	);

	CITY_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: CITY_EDIT_ERROR,
				validation: { min: 2 },
			},
			SUBMIT_BTN_EDIT
		)
	);

	STREET_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: STREET_EDIT_ERROR,
				validation: { min: 2 },
			},
			SUBMIT_BTN_EDIT
		)
	);

	HOUSE_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: HOUSE_EDIT_ERROR,
				validation: { min: 1 },
			},
			SUBMIT_BTN_EDIT
		)
	);

	ZIP_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: ZIP_EDIT_ERROR,
				validation: { min: 4 },
			},
			SUBMIT_BTN_EDIT
		)
	);

	EMAIL_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: EMAIL_EDIT_ERROR,
				validation: {
					regex: {
						regex: /.+@.+\..{2,}/g,
						message: 'Please enter a valid email',
					},
				},
			},
			SUBMIT_BTN_EDIT
		)
	);

	PHONE_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: PHONE_EDIT_ERROR,
				validation: {
					regex: {
						regex: /^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/g,
						message: 'Please enter a valid phone number',
					},
				},
			},
			SUBMIT_BTN_EDIT
		)
	);

	PASSWORD_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: PASSWORD_EDIT_ERROR,
				validation: {
					regex: {
						regex:
							/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
						message:
							'The password must include at least six characters uppercase and lowercase letter number and one of the following special characters: !@#$%^&*-',
					},
				},
			},
			SUBMIT_BTN_EDIT
		)
	);

	PASSWORD_RE_ENTER_EDIT_FIELD.addEventListener('input', (e) =>
		onChangeInputField(
			schema,
			{
				input: e.target,
				errorSpan: PASSWORD_RE_ENTER_EDIT_ERROR,
				validation: {
					min: 2,
					regex: {
						regex:
							/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g,
						message:
							'The password must include at least six characters uppercase and lowercase letter number and one of the following special characters: !@#$%^&*-',
					},
				},
			},
			SUBMIT_BTN_EDIT
		)
	);
};

export const handleCancelEditUser = () => {
	const errorSpans = [
		FIRST_EDIT_ERROR,
		LAST_EDIT_ERROR,
		STATE_EDIT_ERROR,
		COUNTRY_EDIT_ERROR,
		CITY_EDIT_ERROR,
		STREET_EDIT_ERROR,
		HOUSE_EDIT_ERROR,
		ZIP_EDIT_ERROR,
		EMAIL_EDIT_ERROR,
		PHONE_EDIT_ERROR,
		PASSWORD_EDIT_ERROR,
		PASSWORD_RE_ENTER_EDIT_ERROR,
	];
	onClearFormFields(SUBMIT_BTN_EDIT, [], errorSpans);
	onChangePage(PAGES.HOME);
};

const firstAndLast = (user, num) => {
	let first = '';
	let last = '';
	let counter = 0;
	let temp;
	while (user[counter] !== ' ') {
		first += user[counter];
		counter++;
	}
	counter++;
	temp = counter;
	while (temp < user.length) {
		last += user[counter];
		counter++;
		temp++;
	}
	if (num === 1) {
		return first;
	}
	if (num === 2) {
		return last;
	}
};

const mapToUserModel = (userId, users = []) => {
	editUserListeners();
	user = users.find((user) => user._id === userId);
	if (!user) {
		onChangePage(PAGES.HOME);
		throw new Error('There is no user with such ID');
	}
	FIRST_EDIT_FIELD.value = firstAndLast(user.name, 1);
	LAST_EDIT_FIELD.value = firstAndLast(user.name, 2);
	STATE_EDIT_FIELD.value = user.address.state;
	COUNTRY_EDIT_FIELD.value = user.address.country;
	CITY_EDIT_FIELD.value = user.address.city;
	STREET_EDIT_FIELD.value = user.address.street;
	HOUSE_EDIT_FIELD.value = user.address.houseNumber;
	ZIP_EDIT_FIELD.value = user.address.zip;
	PHONE_EDIT_FIELD.value = user.phone;
	EMAIL_EDIT_FIELD.value = user.email;
	PASSWORD_EDIT_FIELD.value = user.password;
	PASSWORD_RE_ENTER_EDIT_FIELD.value = user.password;
};

export const onEditUser = () => {
	const checkBiz = BIZ_EDIT_FIELD.checked;
	user.name = FIRST_EDIT_FIELD.value + ' ' + LAST_EDIT_FIELD.value;
	user.address.state = STATE_EDIT_FIELD.value;
	user.address.country = COUNTRY_EDIT_FIELD.value;
	user.address.city = CITY_EDIT_FIELD.value;
	user.address.street = STREET_EDIT_FIELD.value;
	user.address.houseNumber = HOUSE_EDIT_FIELD.value;
	user.address.zip = ZIP_EDIT_FIELD.value;
	user.phone = PHONE_EDIT_FIELD.value;
	user.email = EMAIL_EDIT_FIELD.value;
	user.password = PASSWORD_EDIT_FIELD.value;
	user.isBusiness = checkBiz ? true : false;
	removeItemFromLocalStorage('user');
	const { _id, isAdmin, isBusiness } = user;
	const payload = JSON.stringify({ _id, isAdmin, isBusiness });
	setItemInLocalStorage('user', payload);
};

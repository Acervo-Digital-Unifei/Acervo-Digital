export const BASE_API_URL = 'http://localhost:3000';
export const USER_API_URL = BASE_API_URL + '/user';
export const BOOK_API_URL = BASE_API_URL + '/book';

export const USER_LOGIN_API_POST_URL = USER_API_URL + '/login';
export const USER_REGISTER_API_POST_URL = USER_API_URL + '/register';
export const USER_REQUEST_CHANGE_PASSWORD_POST_URL = USER_API_URL + '/requestchangepassword';
export const USER_REQUEST_CHANGE_EMAIL_POST_URL = USER_API_URL + '/requestchangeemail';
export const USER_CONFIRM_REQUEST_POST_URL = USER_API_URL + '/confirmrequest';
export const USER_REQUEST_EXISTS_GET_URL = USER_API_URL + '/requestexists';
export const USER_PROFILE_GET_URL = USER_API_URL + '/profile';
export const USER_GET_URL = USER_API_URL + '/';

export const BOOK_ADD_API_POST_URL = BOOK_API_URL + '/add';
export const BOOK_UPDATE_API_POST_URL = BOOK_API_URL + '/update';
export const BOOK_DELETE_API_DELETE_URL = BOOK_API_URL + '/';
export const BOOK_GET_BOOKS_API_GET_URL = BOOK_API_URL + '/';
export const BOOK_GET_BOOK_BY_ID_API_GET_URL = BOOK_API_URL + '/byid';

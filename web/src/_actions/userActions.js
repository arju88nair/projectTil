import { userConstants } from '../_constants';
import { userService } from '../_services';
import {alertActions, miscActions} from './';
import { history } from '../_helpers';
import {misc} from "../_reducers/miscReducers";

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(user) {
    return dispatch => {
        dispatch(request({ user }));

        userService.login(user)
            .then(
                user => {
                    console.log(user)
                    dispatch(alertActions.success('Login successful'));
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(success(user));
                    history.push('/');
                 },
                error => {
                    console.log(error)
                    dispatch(failure(error.toString()));
                    dispatch(miscActions.closeSpinner(false))
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    console.log(user)
                    dispatch(alertActions.success('Registration successful'));
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(miscActions.closeSpinner(false))
                    dispatch(alertActions.error(error.toString()));
                }
            );

    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
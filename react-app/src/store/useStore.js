/* Adapted and modified from
 * https://dev.to/ramsay/build-a-redux-like-global-store-using-react-hooks-4a7n
 */

import React, { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

import { authenticationInitialState, authenticationActions } from "./authentication";
import { userInitialState, userActions } from "./user";
import { registrationInitialState, registrationActions } from "./registration";

const initialState = {
    ...authenticationInitialState,
    ...registrationInitialState,
    ...userInitialState
};

const StoreContext = createContext(initialState);

const Actions = {
    ...authenticationActions,
    ...registrationActions,
    ...userActions
};

const reducer = (state, action) => {
    const act = Actions[action.type];
    const update = act(state, action);
    return { ...state, ...update };
};

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

StoreProvider.propTypes = {
    children: PropTypes.node
};

export const useStore = (store) => {
    const { state, dispatch } = useContext(StoreContext);
    return { state, dispatch };
};

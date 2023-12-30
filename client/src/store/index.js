import { createSlice, configureStore } from "@reduxjs/toolkit";

const inititalAlertState = {
    title: null,
    status: null,
    description: null
}

const alertSlice = createSlice({
    name: "alert",
    initialState: inititalAlertState,
    reducers: {
        showAlert(state, action) {
            state.title = action.payload.title;
            state.status = action.payload.status;
            state.description = action.payload.description;
        },
        hideAlert(state) {
            state.title = null;
            state.status = null;
            state.description = null;
        }
    }
});

const initialuserResultState = {
    users: [
        
    ],
    isTyping: false,
    isInputEmpty: true,
    inputName: ""
};

const userResultSlice = createSlice({
    name: "userResult",
    initialState: initialuserResultState,
    reducers: {
        replace(state, action) {
            state.users = action.payload;
        },
        typing(state) {
            state.isTyping = true;
        },
        notTyping(state) {
            state.isTyping = false;
        },
        changeInputName(state, action) {
            state.inputName = action.payload;
        },
        makeInputEmpty(state) {
            state.isInputEmpty = true;
            state.users = [];
        },
        makeInputNonEmpty(state) {
            state.isInputEmpty = false;
        }
    }
});

const sidebarInitialState = {
    translate: "translateX(-100%)",
    mainContentWidth: "100%"
}

const sidebarSlice = createSlice({
    name: "sidebar",
    initialState: sidebarInitialState,
    reducers: {
        toggle(state) {
            if(state.translate === "translateX(0%)") {
                state.translate = "translateX(-100%)";
                state.mainContentWidth = "100%";
            } else {
                state.translate = "translateX(0%)";
                state.mainContentWidth = "calc(100% - 60px)"
            }
        }
    }
});

const initialBlogState = {
    loadcnt: -1,
    isLoading: true,
    data: [

    ]
}

const blogSlice = createSlice({
    name: "blogs",
    initialState: initialBlogState,
    reducers: {
        addBlogs(state, action) {
            state.data = [...state.data, ...action.payload.data];
        },
        increaseLoadCnt(state) {
            state.loadcnt++;
        },
        getSpinner(state) {
            state.isLoading = true;
        },
        removeSpinner(state) {
            state.isLoading = false;
        }
    }
});

const initialUserState = {
    loadcnt: -1,
    isLoading: 0,
    details: {
        name: null,
        email: null,
        joinedDate: null,
        count: null,
    },
    isLoggedIn: !!localStorage.getItem("token"),
    blogs: [

    ]
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        getBlogs(state, action) {
            state.blogs = [...state.blogs, ...action.payload];
        },
        getDetails(state, action) {
            state.details = action.payload;
        },
        increaseLoadCnt(state) {
            state.loadcnt++;
        },
        decreaseLoadCnt(state) {
            state.loadcnt--;
        },
        getSpinner(state) {
            state.isLoading = true;
        },
        removeSpinner(state) {
            state.isLoading = false;
        },
        loginHandler(state) {
            state.isLoggedIn = true;
        },
        logoutHandler(state) {
            state.isLoggedIn = false;
        }
    }
});

const store = configureStore({
    reducer: {
        alert: alertSlice.reducer,
        userResult: userResultSlice.reducer,
        sidebar: sidebarSlice.reducer,
        blogs: blogSlice.reducer,
        user: userSlice.reducer
    }
});

export default store;
export const alertActions = alertSlice.actions;
export const userResultActions = userResultSlice.actions;
export const sidebarActions = sidebarSlice.actions;
export const blogsActions = blogSlice.actions;
export const userActions = userSlice.actions;
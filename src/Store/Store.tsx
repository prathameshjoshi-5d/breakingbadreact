import { createStore } from "redux";

import rootReducer from "./Reducers";

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export { store };

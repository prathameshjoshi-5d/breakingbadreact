import { combineReducers } from "redux";
import { getCharacters } from "./characters";

export default combineReducers({
  characters: getCharacters,
});

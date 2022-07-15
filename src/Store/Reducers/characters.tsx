import { CharacterData } from "../../components/UserItem/type";
import { typeActions } from "../Actions";

const initialState: { data: CharacterData[]; favoriteData: CharacterData[] } = {
  data: [],
  favoriteData: [],
};

export const getCharacters = (
  state = initialState,
  action: { type: string; payload: CharacterData[] }
) => {
  switch (action.type) {
    case typeActions.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case typeActions.SET_FAVORITE_DATA:
      return {
        ...state,
        favoriteData: action.payload,
      };
    default:
      return state;
  }
};

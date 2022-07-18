import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { typeActions } from "../../Store/Actions";
import { RootState } from "../../Store/Store";
import UsersItem from "../UserItem";
import { CharacterData } from "../UserItem/type";
import styles from "./userList.module.css";

interface UserListProps {
  data: CharacterData[];
  onClick: (item: CharacterData) => void;
}

const UsersList: React.FC<UserListProps> = ({ data, onClick }) => {
  const favArray = useSelector(
    (state: RootState) => state.characters.favoriteData
  );
  const dispatch = useDispatch();

  return (
    <div className={styles.list}>
      <ul>
        {data.map((item, index) => {
          return (
            <UsersItem
              key={index.toString()}
              item={item}
              onClick={onClick}
              onClickFavorite={(element) => {
                let tempFavArray = [...favArray];
                const isFavorite = favArray.find(
                  (element) => element.char_id === item.char_id
                );
                if (!isFavorite) {
                  tempFavArray.push(element);
                } else {
                  tempFavArray = tempFavArray.filter((item: CharacterData) => {
                    return item.char_id !== element.char_id;
                  });
                }
                dispatch({
                  type: typeActions.SET_FAVORITE_DATA,
                  payload: tempFavArray,
                });
              }}
              favArray={favArray}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default UsersList;

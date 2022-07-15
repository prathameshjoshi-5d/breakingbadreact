import React from "react";
import UsersItem from "../UserItem";
import { CharacterData } from "../UserItem/type";
import styles from "./userList.module.css";

interface UserListProps {
  data: CharacterData[];
  onClick: (item: CharacterData) => void;
  onClickFavorite: (item: CharacterData) => void;
}

const UsersList: React.FC<UserListProps> = ({
  data,
  onClick,
  onClickFavorite,
}) => {
  return (
    <div className={styles.list}>
      <ul>
        {data.map((item, index) => {
          return (
            <UsersItem
              key={index.toString()}
              item={item}
              onClick={onClick}
              onClickFavorite={onClickFavorite}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default UsersList;

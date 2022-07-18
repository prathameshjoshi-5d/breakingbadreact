import React from "react";
import { ReactComponent as Heart } from "../../assets/Images/HEART.svg";
import { ReactComponent as HeartFilled } from "../../assets/Images/HEART_FILLED.svg";
import { CharacterData } from "./type";
import styles from "./userItem.module.css";

interface UserItemProps {
  item: CharacterData;
  onClick: (item: CharacterData) => void;
  onClickFavorite: (item: CharacterData) => void;
  favArray: CharacterData[];
}

const UsersItem: React.FC<UserItemProps> = ({
  item,
  onClick,
  onClickFavorite,
  favArray,
}) => {
  const isFavorite = favArray.find(
    (element) => element.char_id === item.char_id
  );

  return (
    <li>
      <div className={styles.main}>
        <div className={styles.userItem} onClick={() => onClick(item)}>
          <img
            src={item.img}
            alt={"UserImage"}
            width={180}
            height={258}
            style={{ objectFit: "cover" }}
          />
          <div className={styles.view}>
            <text className={`${styles.userItemText} ${styles.bold}`}>
              {item.name}
            </text>
            <text className={`${styles.userItemText} ${styles.thin}`}>
              {item.nickname}
            </text>
            <div className={styles.potrayedView}>
              <text className={`${styles.potrayedText} ${styles.medium}`}>
                Potrayed
              </text>
              <text className={`${styles.potrayed} ${styles.thin}`}>
                {item.portrayed}
              </text>
            </div>
          </div>
        </div>
        <div
          className={styles.btn}
          onClick={() => {
            onClickFavorite(item);
          }}
        >
          {isFavorite ? (
            <HeartFilled height={39} width={44} />
          ) : (
            <Heart height={39} width={44} />
          )}
        </div>
      </div>
    </li>
  );
};

export default UsersItem;

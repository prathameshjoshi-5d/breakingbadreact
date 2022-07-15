import React, { useState } from "react";
import { ReactComponent as Heart } from "../../assets/Images/HEART.svg";
import { ReactComponent as HeartFilled } from "../../assets/Images/HEART_FILLED.svg";
import { CharacterData } from "./type";
import styles from "./userItem.module.css";

interface UserItemProps {
  item: CharacterData;
  onClick: (item: CharacterData) => void;
  onClickFavorite: (item: CharacterData) => void;
}

const UsersItem: React.FC<UserItemProps> = ({
  item,
  onClick,
  onClickFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(item.favorite);

  return (
    <li>
      <div className={styles.justify}>
        <div className={styles.userItemMain} onClick={() => onClick(item)}>
          <img
            src={item.img}
            alt={"mage"}
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
            setIsFavorite((prevState) => !prevState);
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

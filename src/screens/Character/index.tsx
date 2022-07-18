import { useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/container";
import { RootState } from "../../Store/Store";
import { motion } from "framer-motion";
import { CharacterData } from "../../components/UserItem/type";
import styles from "./character.module.css";

interface locationState {
  data: CharacterData;
}

const CharacterScreen = () => {
  const history = useNavigate();
  const location = useLocation();
  const { data } = location.state as locationState;

  const DATA = useSelector((state: RootState) => state.characters.data);

  const [otherCharacters, setOtherCharacters] = useState<CharacterData[]>([]);

  useEffect(() => {
    let otherData = [];
    for (let i = 0; i < DATA.length; i++) {
      if (DATA[i].category === data.category) {
        otherData.push(DATA[i]);
      }
    }
    setOtherCharacters(otherData);
  }, [DATA, data.category]);
  return (
    <motion.div
      initial={{ translateX: "100%" }}
      animate={{ translateX: 0 }}
      transition={{ ease: "easeOut" }}
    >
      <Container>
        <div className={styles.mainCharacterScreen}>
          <div
            className={styles.image_container}
            style={{ backgroundImage: "url(" + data.img + ")" }}
          >
            <FontAwesome
              name="arrow-left"
              style={{
                textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                color: "#FFFFFF",
              }}
              height={16}
              width={16}
              onClick={() => history(-1)}
              className={styles.backArrow}
            />
            <div className={styles.transparent_view}>
              <img
                className={styles.bg_img}
                alt="background-img"
                src={data.img}
              />
              <text className={styles.header_name}>{data.name}</text>
              <text className={styles.header_nickname}>{data.nickname}</text>
            </div>
          </div>
          <div className={styles.mainVerticalView}>
            <div className={styles.verticalView}>
              <div className={styles.horizontalView}>
                <div className={styles.vertical}>
                  <span
                    className={`${styles.favoriteTextCharacterScreen} ${styles.medium}`}
                  >
                    Potrayed
                  </span>
                  <span
                    className={`${styles.textCharacterScreen} ${styles.thin}`}
                  >
                    {data.portrayed}
                  </span>
                </div>
                {data.birthday !== "Unknown" && data.birthday && (
                  <div className={styles.horizontalView}>
                    <img
                      alt="Birthday-icon"
                      src={require("../../assets/Images/Birthday.png")}
                      height={23}
                      width={23}
                    />
                    <text className={`${styles.textBirthday} ${styles.thin}`}>
                      {data?.birthday}
                    </text>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.verticalView}>
              <text
                className={`${styles.favoriteTextCharacterScreen} ${styles.medium}`}
              >
                Occupation
              </text>
              <text className={`${styles.textCharacterScreen} ${styles.thin}`}>
                {data?.occupation[0]}
              </text>
              <text className={`${styles.textCharacterScreen} ${styles.thin}`}>
                {data?.occupation[1]}
              </text>
            </div>
            <div className={styles.verticalView}>
              <text
                className={`${styles.favoriteTextCharacterScreen} ${styles.medium}`}
              >
                Appeared in
              </text>
              <div className={styles.mainCharacterScreen}>
                {data?.appearance.map((item, index) => {
                  return (
                    <div style={style.season} key={index.toString()}>
                      <text
                        className={`${styles.textCharacterScreen} ${styles.seasonText} ${styles.thin}`}
                      >
                        Season {item}
                      </text>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={`${styles.verticalView} ${styles.other}`}>
              <text className={`${styles.otherCharactersText} ${styles.bold}`}>
                Other characters
              </text>
              <div className={styles.mainCharacterScreen}>
                {otherCharacters.map((item, index) => {
                  return (
                    <div
                      className={styles.otherCharacters}
                      key={index.toString()}
                    >
                      <img
                        src={item.img}
                        alt={"mage"}
                        className={styles.character}
                        style={{ objectFit: "cover" }}
                      />
                      <text className={`${styles.textName} ${styles.bold}`}>
                        {item.name}
                      </text>
                      <text className={`${styles.textNickName} ${styles.thin}`}>
                        {item.nickname}
                      </text>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

const style = {
  season: {
    marginRight: 10,
    marginTop: 20,
    backgroundColor: "#313131",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default CharacterScreen;

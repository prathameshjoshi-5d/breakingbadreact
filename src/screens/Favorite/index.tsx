import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container";
import Header from "../../components/Header";
import { CharacterData } from "../../components/UserItem/type";
import UsersList from "../../components/UsersList";
import { RootState } from "../../Store/Store";
import styles from "./favorite.module.css";

const FavoriteScreen = () => {
  const history = useNavigate();
  const DATA = useSelector((state: RootState) => state.characters.favoriteData);
  const [allCharacters, setAllCharacters] = useState<CharacterData[]>([]);

  useEffect(() => {
    setAllCharacters(DATA);
  }, [DATA, allCharacters]);

  const renderLeftContainer = () => {
    return (
      <FontAwesome
        name="arrow-left"
        style={{
          textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
          color: "#FFFFFF",
          cursor: "pointer",
        }}
        height={16}
        width={16}
        onClick={() => history("/")}
      />
    );
  };

  const renderMainContainer = () => {
    return (
      <div className={styles.rightContainerFavoriteScreen}>
        <img
          src={require("../../assets/Images/Vector.png")}
          alt="Heart"
          height={33}
          width={36}
          className="vector"
        />
        <text className={styles.text}>The Breaking bad</text>
      </div>
    );
  };

  const renderRightContainer = () => {
    return <text className={styles.favoriteTextFavoriteScreen}>Favorites</text>;
  };

  return (
    <motion.div
      initial={{ translateX: "100%" }}
      animate={{ translateX: 0 }}
      transition={{ ease: "easeOut" }}
    >
      <Header
        RenderLeftContainer={renderLeftContainer}
        RenderMainContainer={renderMainContainer}
        RenderRightContainer={renderRightContainer}
      />
      <Container>
        {allCharacters && allCharacters.length !== 0 ? (
          <UsersList
            data={allCharacters}
            onClick={(data) => history("/Character", { state: { data: data } })}
          />
        ) : (
          <div className={styles.emptyRecordsView}>
            <span className={styles.emptyRecords}>No records found</span>
          </div>
        )}
      </Container>
    </motion.div>
  );
};

export default FavoriteScreen;

import { useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container";
import Header from "../../components/Header";
import UsersList from "../../components/UsersList";
import { typeActions } from "../../Store/Actions";
import { RootState } from "../../Store/Store";
import { motion } from "framer-motion";
import { CharacterData } from "../../components/UserItem/type";
import styles from "./favorite.module.css";

const FavoriteScreen = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const DATA = useSelector((state: RootState) => state.characters.favoriteData);
  const charData = useSelector((state: RootState) => state.characters.data);
  const favData = useSelector(
    (state: RootState) => state.characters.favoriteData
  );
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

  const editFavorite = (item: CharacterData) => {
    var tempArr = [...charData];
    var tempFavArr = [...favData];
    tempArr.forEach((element) => {
      if (element.char_id === item.char_id) {
        if (element.favorite === true) {
          element.favorite = false;
          const filterChar = favData.filter(
            (item) => item.char_id !== element.char_id
          );
          dispatch({
            type: typeActions.SET_FAVORITE_DATA,
            payload: filterChar,
          });
        } else {
          element.favorite = true;
          tempFavArr.push(element);
          dispatch({
            type: typeActions.SET_FAVORITE_DATA,
            payload: tempFavArr,
          });
        }
      }
    });
  };
  return (
    <motion.div
      initial={{ translateX: "100%" }}
      animate={{ translateX: 0 }}
      transition={{ ease: "easeOut" }}
    >
      <Container>
        <Header
          RenderLeftContainer={renderLeftContainer}
          RenderMainContainer={renderMainContainer}
          RenderRightContainer={renderRightContainer}
        />
        <UsersList
          data={allCharacters}
          onClick={(data) => history("/Character", { state: { data: data } })}
          onClickFavorite={(item) => editFavorite(item)}
        />
      </Container>
    </motion.div>
  );
};

export default FavoriteScreen;

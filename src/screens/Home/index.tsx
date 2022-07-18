import { useCallback, useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container";
import Header from "../../components/Header";
import UsersList from "../../components/UsersList";
import { typeActions } from "../../Store/Actions";
import { searchCharacters } from "../../Store/Characters";
import { RootState } from "../../Store/Store";
import styles from "./home.module.css";
import { motion } from "framer-motion";
import { CharacterData } from "../../components/UserItem/type";

const HomeScreen = () => {
  const history = useNavigate();
  const DATA = useSelector((state: RootState) => state.characters.data);
  const charData = useSelector((state: RootState) => state.characters.data);
  const favData = useSelector(
    (state: RootState) => state.characters.favoriteData
  );
  const dispatch = useDispatch();
  const [allCharacters, setAllCharacters] = useState<CharacterData[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();

  useEffect(() => {
    setFirstRender(true);
  }, []);

  useEffect(() => {
    if (allCharacters.length === 0) {
      setAllCharacters(DATA);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DATA]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchData(searchText ?? "");
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const searchData = (value: string) => {
    searchCharacters(value)
      .then((res) => {
        setAllCharacters(res);
      })
      .catch((err) => {});
  };

  const renderLeftContainer = () => {
    return (
      <div className={styles.rightContainer}>
        <img
          src={require("../../assets/Images/Vector.png")}
          alt="Heart"
          height={33}
          width={36}
        />
        <text className={styles.text}>The Breaking bad</text>
      </div>
    );
  };

  const renderRightContainer = useCallback(
    () => {
      return (
        <div className={styles.rightContainer}>
          <div className={styles.search_icon_view}>
            <FontAwesome
              id="iconSearch"
              name="search"
              style={{
                textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                color: "#FFFFFF",
              }}
              className={styles.searchIcon}
              onClick={() => setSearching((prevState) => !prevState)}
            />
            <input
              id="inputSearch"
              className={
                searching
                  ? styles.searchTextfield
                  : firstRender
                  ? styles.searchTextfield_Active
                  : styles.searchTextfield_Hidden
              }
              type={"text"}
              value={searchText}
              autoComplete={"false"}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              placeholder={"Search"}
            />
          </div>
          <img
            src={require("../../assets/Images/HEART_FILLED.png")}
            alt="Heart"
            height={20}
            width={22}
            className={styles.favorite}
            onClick={() => history("/Favorite")}
          />
        </div>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searching]
  );

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
      initial={{ translateX: "-100%" }}
      animate={{ translateX: 0 }}
      transition={{ ease: "easeOut" }}
    >
      <Container>
        <Header
          RenderLeftContainer={renderLeftContainer}
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

export default HomeScreen;

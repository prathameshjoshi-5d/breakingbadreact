import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "../../components/container";
import Header from "../../components/Header";
import { CharacterData } from "../../components/UserItem/type";
import UsersList from "../../components/UsersList";
import { searchCharacters } from "../../Store/Characters";
import { RootState } from "../../Store/Store";
import styles from "./home.module.css";

const HomeScreen = () => {
  const history = useNavigate();
  const DATA = useSelector((state: RootState) => state.characters.data);
  const [allCharacters, setAllCharacters] = useState<CharacterData[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setFirstRender(true);
  }, []);

  useEffect(() => {
    if (allCharacters && allCharacters.length === 0) {
      setIsLoading(true);
      setAllCharacters(DATA);
    } else {
      setIsLoading(false);
    }
    // setIsLoading(false);
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
        setIsLoading(false);
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
                setIsLoading(true);
              }}
              placeholder={"Search"}
              autoCorrect={"false"}
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

  return (
    <motion.div
      initial={{ translateX: "-100%" }}
      animate={{ translateX: 0 }}
      transition={{ ease: "easeOut" }}
    >
      <Header
        RenderLeftContainer={renderLeftContainer}
        RenderRightContainer={renderRightContainer}
      />
      <Container>
        {isLoading ? (
          <div className={styles.loaderView}>
            <div className={styles.loader}></div>
          </div>
        ) : allCharacters && allCharacters.length !== 0 ? (
          <UsersList
            data={allCharacters}
            onClick={(data) => history("/Character", { state: { data: data } })}
          />
        ) : (
          <div className={styles.loaderView}>
            <span className={styles.emptyRecords}>No records found</span>
          </div>
        )}
      </Container>
    </motion.div>
  );
};

export default HomeScreen;

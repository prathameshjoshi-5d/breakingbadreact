import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { typeActions } from "../Store/Actions";
import { getAllCharacters } from "../Store/Characters";
import "../App.css";
import AnimatedRoutes from "./Routes";
import { CharacterData } from "../components/UserItem/type";

const Navigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllCharacters()
      .then((data) => {
        data.forEach((item: CharacterData) => {
          item.favorite = false;
        });
        dispatch({
          type: typeActions.SET_DATA,
          payload: data,
        });
      })
      .catch((err) => {});
  }, [dispatch]);
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default Navigation;

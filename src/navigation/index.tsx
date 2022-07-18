import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "../App.css";
import { typeActions } from "../Store/Actions";
import { getAllCharacters } from "../Store/Characters";
import AnimatedRoutes from "./Routes";

const Navigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllCharacters()
      .then((data) => {
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

import { Route, Routes, useLocation } from "react-router-dom";
import CharacterScreen from "../screens/Character";
import FavoriteScreen from "../screens/Favorite";
import HomeScreen from "../screens/Home";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Character" element={<CharacterScreen />} />
        <Route path="/Favorite" element={<FavoriteScreen />} />
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;

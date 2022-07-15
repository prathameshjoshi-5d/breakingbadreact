import styles from "./header.module.css";

interface HeaderProps {
  RenderLeftContainer?: React.FC | undefined;
  RenderMainContainer?: React.FC | undefined;
  RenderRightContainer?: React.FC | undefined;
}

const Header: React.FC<HeaderProps> = ({
  RenderLeftContainer,
  RenderMainContainer,
  RenderRightContainer,
}) => {
  return (
    <div className={styles.header}>
      {RenderLeftContainer && <RenderLeftContainer />}

      {RenderMainContainer && <RenderMainContainer />}

      {RenderRightContainer && <RenderRightContainer />}
    </div>
  );
};

export default Header;

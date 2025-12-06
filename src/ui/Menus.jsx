import { Dot, EllipsisVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

const Menus = function ({ children }) {
  const [openID, setOpenID] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenID("");
  const Open = setOpenID;
  return (
    <MenusContext.Provider
      value={{ openID, Open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toogle = function ({ id }) {
  const { Open, openID, close, setPosition } = useContext(MenusContext);

  const handleClick = function (e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    console.log(rect);
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    //when clicked on the same button twice
    if (id === openID) {
      close();
    }

    if (id !== openID || openID === "") {
      Open(id);
    }
  };
  return (
    <StyledToggle onClick={handleClick}>
      <EllipsisVertical />
    </StyledToggle>
  );
};

const List = function ({ id, children }) {
  const { openID, position } = useContext(MenusContext);

  if (id !== openID) {
    return null;
  }

  return createPortal(
    <StyledList position={position}>{children}</StyledList>,
    document.body
  );
};
const Button = function ({ children, onClick, icon, disabled = false }) {
  return (
    <li>
      <StyledButton onClick={() => onClick?.()} disabled={disabled}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
};

const Menu = function ({ children }) {
  return <StyledMenu>{children}</StyledMenu>;
};
Menus.Toogle = Toogle;
Menus.Menu = Menu;
Menus.List = List;
Menus.Button = Button;

export default Menus;

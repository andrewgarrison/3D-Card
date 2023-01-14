import styled from "@emotion/styled";
import { CardColor } from "./types";

const cardNameColorMap: Record<CardColor, string> = {
  black: "silver",
  white: "gray",
  gray: "silver",
};

const cardColorBgMap: Record<CardColor, string> = {
  black: "#505050",
  white: "#FBFBFB",
  gray: "#F4F4F4",
};

export const Card3DRenderer = styled.div`
  width: 100%;
  height: 100%;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const Card3DNameRenderer = styled.div`
  position: absolute;

  & > div {
    perspective: none !important;
  }
`;

export const Card3DName = styled("div")<{ cardColor: CardColor }>`
  position: absolute;
  font-size: 1.25vh;
  opacity: 0;
  color: ${(p) => cardNameColorMap[p.cardColor]};
  transform: translate(-50%, -50%)
    matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) scale(-1, 1) !important;
`;

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const Card3DContainer = styled("div")<{ cardColor: CardColor }>`
  height: 100vh;
  width: 50%;
  background-color: ${(p) => cardColorBgMap[p.cardColor]};
  transition: 250ms ease-in-out;

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 136px);
  }
`;

export const CustomizeCardContainer = styled.div`
  height: 100vh;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 128px;
  justify-content: center;
  gap: 16px;

  @media only screen and (max-width: 1280px) {
    padding: 32px;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: white;
  }
`;

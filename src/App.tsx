import { useState } from "react";
import { Input, Select } from "@chakra-ui/react";
import { Card3D } from "./components/Card3D";
import { CardColor } from "./types";
import {
  Card3DContainer,
  CustomizeCardContainer,
  PageContainer,
} from "./styles";

const App = () => {
  const [cardName, setCardName] = useState("");
  const [cardColor, setCardColor] = useState<CardColor>(CardColor.White);

  return (
    <PageContainer>
      <Card3DContainer cardColor={cardColor}>
        <Card3D cardColor={cardColor} cardName={cardName} />
      </Card3DContainer>
      <CustomizeCardContainer>
        <Input
          type="text"
          placeholder="Enter your name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <Select
          onChange={(e) => setCardColor(e.target.value as CardColor)}
          value={cardColor}
        >
          <option value={CardColor.White}>White</option>
          <option value={CardColor.Black}>Black</option>
          <option value={CardColor.Gray}>Gray</option>
        </Select>
      </CustomizeCardContainer>
    </PageContainer>
  );
};

export default App;

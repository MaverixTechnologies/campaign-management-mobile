import React, { useState } from "react";
import { Box, VStack, Heading, HStack, IconButton } from "native-base";
import { AntDesign } from "@expo/vector-icons";
const InfoCard = ({ screenWidth, data }) => {
  const [cardShow, setCardShow] = useState(false);
  const toggleCard = () => {
    setCardShow(!cardShow);
  };
  return (
    <Box
      w={screenWidth > 800 ? "800" : screenWidth - 20}
      // w={"100%"}
      mt={2}
      rounded="lg"
      overflow="scroll"
      borderWidth={1}
      _dark={{
        backgroundColor: "primary.300",
        borderColor: "primary.100",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "secondary.100",
        borderColor: "secondary.200",
      }}
      px="2"
    >
      <VStack px="4" space={3} py="4">
        <HStack
          justifyContent={"space-between"}
          space={2}
          alignItems={"center"}
        >
          <HStack justifyContent={"flex-start"} space={2} alignItems={"center"}>
            <Heading
              size="sm"
              _light={{
                color: "gray.600",
              }}
              _dark={{
                color: "gray.50",
              }}
            >
              VIDHANSABHA -
            </Heading>
            <Heading
              size="sm"
              _light={{
                color: "gray.600",
              }}
              _dark={{
                color: "gray.50",
              }}
            >
              #{data?.vidhansabha_number}
            </Heading>
            <Heading
              size="sm"
              _light={{
                color: "secondary.500",
              }}
              _dark={{
                color: "gray.50",
              }}
              fontWeight="600"
              // textTransform={"uppercase"}
            >
              {data?.vidhansabha_name}
            </Heading>
          </HStack>
          <IconButton
            h={4}
            w={4}
            onPress={toggleCard}
            variant="ghost"
            // borderRadius="full"
            // p={3}
            _icon={{
              as: AntDesign,
              name: cardShow ? "up" : "down",
            }}
          />
        </HStack>
        {cardShow ? (
          <HStack justifyContent={"flex-start"} space={2} alignItems={"center"}>
            <Heading
              size="sm"
              _light={{
                color: "gray.600",
              }}
              _dark={{
                color: "gray.50",
              }}
              textTransform={"uppercase"}
            >
              Sitting MLA -
            </Heading>
            <Heading
              size="sm"
              _light={{
                color: "gray.800",
              }}
              _dark={{
                color: "gray.50",
              }}
              fontWeight="500"
            >
              {data?.sitting_mla_name ? data?.sitting_mla_name : `NA`}
            </Heading>
          </HStack>
        ) : null}
      </VStack>
    </Box>
  );
};
export default InfoCard;

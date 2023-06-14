import React from "react";
import { Box, VStack, Heading, Text, HStack, Divider } from "native-base";
const InfoCard = ({ screenWidth }) => {
  return (
    <Box
      w={screenWidth > 800 ? "800" : screenWidth - 20}
      rounded="lg"
      overflow="scroll"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: "coolGray.50",
        borderColor: "coolGray.200",
      }}
      px="2"
    >
      <VStack>
        <HStack
          px="4"
          py="4"
          justifyContent={"space-between"}
          space={2}
          alignItems={"center"}
        >
          <Heading
            size="xs"
            ml="-1"
            _light={{
              color: "gray.500",
            }}
            _dark={{
              color: "gray.50",
            }}
          >
            Vidhansabha
          </Heading>
          <Text
            fontSize="lg"
            _light={{
              color: "gray.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            Sanchi
          </Text>
        </HStack>
        <Divider
          orientation="horizontal"
          thickness={"0.5"}
          alignSelf={"center"}
          // mr={2}
        />
        <HStack
          px="4"
          py="4"
          justifyContent={"space-between"}
          space={2}
          alignItems={"center"}
        >
          <Heading
            size="xs"
            ml="-1"
            _light={{
              color: "gray.500",
            }}
            _dark={{
              color: "gray.50",
            }}
          >
            Siting MLA
          </Heading>
          <Text
            fontSize="lg"
            _light={{
              color: "gray.800",
            }}
            _dark={{
              color: "gray.50",
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            John Doe
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};
export default InfoCard;

// <Box
//   w={screenWidth > 800 ? "800" : screenWidth - 20}
//   rounded="lg"
//   overflow="scroll"
//   borderColor="coolGray.200"
//   borderWidth="1"
//   _dark={{
//     borderColor: "coolGray.600",
//     backgroundColor: "gray.700",
//   }}
//   _web={{
//     shadow: 2,
//     borderWidth: 0,
//   }}
//   _light={{
//     backgroundColor: "rgba(250,250,250,0.64)",
//     borderColor: "coolGray.200",
//   }}
//   px="2"
// >
//   <HStack alignItems={"center"}>
//     <Stack px="4" py="4" space={3} alignItems={"flex-start"} w={"50%"}>
//       <Heading
//         size="xs"
//         ml="-1"
//         _light={{
//           color: "gray.500",
//         }}
//         _dark={{
//           color: "gray.50",
//         }}
//       >
//         Vidhansabha
//       </Heading>
//       <Text
//         fontSize="xl"
//         _light={{
//           color: "gray.800",
//         }}
//         _dark={{
//           color: "gray.50",
//         }}
//         fontWeight="500"
//         ml="-0.5"
//         mt="-1"
//       >
//         Sanchi
//       </Text>
//     </Stack>
//     {/* <Divider
//           orientation="vertical"
//           thickness={"0.5"}
//           h={"80%"}
//           alignSelf={"center"}
//           mr={2}
//         /> */}
//     <Stack px="4" py="4" space={3} alignItems={"flex-start"} w={"48%"}>
//       <Heading
//         size="xs"
//         ml="-1"
//         _light={{
//           color: "gray.500",
//         }}
//         _dark={{
//           color: "gray.50",
//         }}
//       >
//         MLA
//       </Heading>
//       <Text
//         fontSize="xl"
//         _light={{
//           color: "gray.800",
//         }}
//         _dark={{
//           color: "gray.50",
//         }}
//         fontWeight="500"
//         ml="-0.5"
//         mt="-1"
//       >
//         Some MLA
//       </Text>
//     </Stack>
//   </HStack>
// </Box>;

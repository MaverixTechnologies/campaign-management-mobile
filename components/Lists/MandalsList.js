import React from "react";
import {
  Spacer,
  Text,
  VStack,
  HStack,
  Box,
  Pressable,
  Avatar,
} from "native-base";
const MandalsList = (props) => {
  return (
    <>
      {props.listData.map((item) => {
        return (
          <Box bg="white" safeArea flex="1" key={item.id}>
            <Pressable
              onPress={() => console.log("You touched me")}
              _dark={{
                bg: "coolGray.800",
              }}
              _light={{
                bg: "white",
              }}
            >
              <Box pl="4" pr="5" py="2">
                <HStack alignItems="center" space={3}>
                  <Avatar
                    size="48px"
                    source={{
                      uri: item.avatarUrl,
                    }}
                  />
                  <VStack>
                    <Text
                      color="coolGray.800"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      bold
                    >
                      {item.fullName}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.recentText}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    color="coolGray.800"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    alignSelf="flex-start"
                  >
                    {item.timeStamp}
                  </Text>
                </HStack>
              </Box>
            </Pressable>
          </Box>
        );
      })}
    </>
  );
};

export default MandalsList;

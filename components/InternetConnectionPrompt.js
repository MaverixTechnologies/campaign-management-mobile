import React, { useEffect } from "react";
import { Center, Heading, Button, View } from "native-base";
import * as Network from "expo-network";

const InternetConnectionPrompt = ({ setIsConnected, isConnected }) => {
  // const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkInternetConnection = async () => {
      const { isConnected } = await Network.getNetworkStateAsync();
      setIsConnected(isConnected);
    };

    checkInternetConnection();
  }, []);

  const handleRetry = async () => {
    const { isConnected } = await Network.getNetworkStateAsync();
    setIsConnected(isConnected);

    if (isConnected) {
      setIsConnected(true);
    }
  };

  if (!isConnected) {
    return (
      <View justifyContent={"center"} alignItems={"center"} h={"full"}>
        <Center flex={1}>
          <Heading>No Internet Connection</Heading>
          <Button onPress={handleRetry} mt={4}>
            Retry
          </Button>
        </Center>
      </View>
    );
  }

  return null;
};

export default InternetConnectionPrompt;

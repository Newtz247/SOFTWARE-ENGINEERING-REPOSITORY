import { BackgroundImage, Center, Box, Button, Text } from '@mantine/core';
// import MapMarker from './components/MapMarker';
import background from './components/images/summer.jpeg';
import ViewDictionaryButton from './components/ViewDictionaryButton';
import{Link} from 'react-router-dom';


function Homepage () {
  return (
    <Box w="100vw" h="100vh">
      <BackgroundImage
        src= {background}
        radius="sm"
         style={{
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          
        }}
        className="font-comic"
      >
       
        <Center style={{ 
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
          <Text size="xl" fw={700} c="rgba(204, 0, 0, 1)">Mi'kmaq Pictionary</Text>
          <ViewDictionaryButton />
          <Button 
            variant ="filled" color='red'
            component={Link}
            to="/Layout"
          >
              Go to Pictionary Game
          </Button>
        </Center>
      </BackgroundImage>
    </Box>
  );
}
export default Homepage;
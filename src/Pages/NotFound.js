import React from 'react';
import '../css/App.css';
import notfound from '../images/404.svg'
import { Image,Center,Box,Text,Stack,Button } from '@chakra-ui/react'
function NotFound(props) {
            return (
                        <div>
                         <Center>
                        <Stack>
                         <Box boxSize='md' mt={10} >
                        <Image src={notfound} alt='PAGE NOT FOUND'/>
                        <Text mt='4' fontWeight={'bold'} color='teal.700' fontSize={40 } id="pagenotfound" textAlign='center'>PAGE NOT FOUND</Text>
                        </Box>
                       
                        </Stack>
                         </Center>
                        </div>
            );
}

export default NotFound;
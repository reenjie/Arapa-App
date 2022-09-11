import React from 'react';
import { Image, Box, Center, Heading,Stack ,Text ,Button,Container,Badge} from '@chakra-ui/react'
import result from '../images/res.jpg';
import PopInfo from "../components/layouts/popover";
import { Link } from "react-router-dom";
function Result(props) {
            
 function BtnAbout(){
                        return (<>
                          <Button variant={'link'} color='teal.600'  size='sm'>About us <i style={{marginLeft:'2px'}} className="fas fa-info-circle" ></i> </Button>
                        </>);
   }
  function BtnContact(){
            return (<>
              <Button variant={'link'} color='teal.600' size='sm' ml={4}>Contact Us <i style={{marginLeft:'2px'}} className="fas fa-phone" ></i> </Button>
            </>);
          }
            return (
            <>
            <div>
            <Box boxSize='xxl'>
            <Image src={result} alt='Image' borderBottom='15px solid gray' />
            <Heading position={'absolute'} color={'teal.700'} top='10' size={'xl'} left={20} >Great! Below is your Results..
            <Text color={'teal.600'} fontSize={16}>
              Thank you for using BMI Tracker.
            </Text>
            </Heading>
            
            </Box>
            
            <Box mt={10} mb={150}>
             <Container maxW={'container.lg'}>
             <Heading>Generated Results:</Heading>
           
            
            <Text color={'blackAlpha.700'} fontSize='20' mt='4'>
            Height : 162
            </Text>
            <Text color={'blackAlpha.700'} fontSize='20' mt='4'>
            Weight : 62
            </Text>
            <Text letterSpacing={5} color={'blackAlpha.700'} fontSize='30' fontWeight={'bold'} mt='4'>
          BMI 
            </Text>
            <Text color={'teal.700'} fontWeight='bold' fontSize='20' mt='4'>
            45.4
            </Text>
            <Badge mb={10} variant='outline' colorScheme='green'>
          OBESE
            </Badge>
            <Text noOfLines={2}>
  "The quick brown fox jumps over the lazy dog" is an English-language pangram—a
  sentence that contains all of the letters of the English alphabet. Owing to
  its existence, Chakra was created.
</Text>
            
            <Button variant={'link'}  color='green.500'>Show full Recommendation</Button>
            
            <Box mt={20}>
               <Button variant={'outline'}  size='sm' colorScheme='teal'>Print Page</Button>   
              <Link to='/'> <Button variant={'outline'} size='sm' colorScheme='blue' ml={2}>Try Again <i style={{marginLeft:'5px'}} className='fas fa-sync'></i></Button>      
              </Link>
            </Box>
            <Box mt={40}>
            <PopInfo btn={<BtnAbout/>} header='aboutheader' body='aboutbody'/>
            <PopInfo btn={<BtnContact/>} header='contactheader' body='contactbody'/>  
            <Text fontSize={14} color={'blackAlpha.600'} float='right'>
          BMI Tracker
          <br/>
          All Rights Reserved &middot; 2022
        </Text>
            </Box>
         
             </Container>
            </Box>
            </div>
            </>
            );
}

export default Result;
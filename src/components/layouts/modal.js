import {
            Modal,
            ModalOverlay,
            ModalContent,
            ModalHeader,
            ModalFooter,
            ModalBody,
            ModalCloseButton,
            Button,
            Text,
            Container,
            Box,
            SimpleGrid,
            Image,
            Stack,
            Input,
            Spacer,
            Center
          } from '@chakra-ui/react'
 import { useDisclosure } from '@chakra-ui/react'
 import { Link } from "react-router-dom";

 import React from 'react'
 import bmi from '../../images/bmi.jpg';
function BMIModal() {
            const OverlayOne = () => (
              <ModalOverlay
                bg='blackAlpha.300'
                backdropFilter='blur(10px) hue-rotate(90deg)'
              />
            )
          
            const OverlayTwo = () => (
              <ModalOverlay
                bg='none'
                backdropFilter='auto'
                backdropInvert='80%'
                backdropBlur='2px'
              />
            )
          
            const { isOpen, onOpen, onClose } = useDisclosure()
            const [overlay, setOverlay] = React.useState(<OverlayOne />)
          
            return (
              <>
              

                <Button colorScheme='teal' p={10} fontSize={20}  onClick={() => {
                    setOverlay(<OverlayTwo />)
                    onOpen()
                  }} width={'100%'} variant='solid'>
                         Calculate BMI
                         </Button>
                <Modal  isOpen={isOpen} size='full' onClose={onClose}>
                  {overlay}
                  <ModalContent>
                    <ModalHeader fontSize={30} color={'orange.400'}>CALCULATE BMI</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Container maxW={'container.xl'}>
                   
                        <SimpleGrid  columns={[2, null, 2]} spacing='40px'>
                        <Box id="calculate_pic" >
                        <Box boxSize='sm' ml={10} >
                        <Center>
                        <Image src={bmi} width='100%' alt='Illustration' />
                        </Center>
                        <Text color={'blackAlpha.700'}>
            <span style={{fontWeight:'bold'}}>Body Mass Index </span> (BMI) is a measure that relates body weight to height. BMI is
sometimes used to measure total body fat and whether a person is a healthy weight. Excess
body fat is linked to an increased risk of some diseases including heart disease and some
cancers.
                        </Text>
                        </Box>
                        </Box>
                        <Box id="calculate_bmi" >
                       
                   
                        <Stack spacing={3} mt='5'>
                        <Text color={'blackAlpha.600'} fontSize={20}>
                                    Your Height
                        </Text>
                        <Input placeholder='Centimeters' size='lg' autoFocus />
                        <Spacer/>
                        <Text color={'blackAlpha.600'} fontSize={20}>
                                    Your Weight
                        </Text>
                        <Input placeholder='Kilograms' size='lg' />
                                   
                  <Spacer/>
                  <Spacer/>
                   <Link to='/BMI/Result'><Button padding={7} colorScheme='teal' mt={5} float='right' variant={'solid'}>CALCULATE</Button> </Link>    
                                    </Stack>
                        </Box> 
                        </SimpleGrid>
                        </Container>


                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            )
          }

export default BMIModal;
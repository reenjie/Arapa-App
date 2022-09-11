import {
            Popover,
            PopoverTrigger,
            PopoverContent,
            PopoverHeader,
            PopoverBody,
            PopoverFooter,
            PopoverArrow,
            PopoverCloseButton,
            PopoverAnchor,
            Button,
            ButtonGroup
          } from '@chakra-ui/react'
          import { useDisclosure } from '@chakra-ui/react'
            function PopInfo(props) {
            const { isOpen, onToggle, onClose } = useDisclosure()
          
            return (
              <>
              
                <Popover
                  returnFocusOnClose={false}
                  isOpen={isOpen}
                  onClose={onClose}
                  placement='top-start'
                  closeOnBlur={false}
                >
                  <PopoverTrigger>
                  <Button variant={'link'} color='teal.600'  size='sm' onClick={onToggle}>
                  {props.btn}      
                  </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverHeader fontWeight='semibold'>{props.header}</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                     {props.body}
                    </PopoverBody>
                    <PopoverFooter display='flex' justifyContent='flex-end'>
                      <ButtonGroup size='sm'>
                     
                      </ButtonGroup>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </>
            )
          }
export default PopInfo;
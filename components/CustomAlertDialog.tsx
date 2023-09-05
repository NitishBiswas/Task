import React from 'react';
import { Button, AlertDialog, Box, Text } from 'native-base';

interface CustomAlertDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    cancelButtonText?: string;
    deleteButtonText?: string;
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
    isOpen,
    onClose,
    title,
    message,
    cancelButtonText = 'Cancel',
    deleteButtonText = 'Delete',
}) => {
    const cancelRef = React.useRef(null);

    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <Box
                bg="white"
                shadow={2}
                borderRadius="md"
                p={4}
                width="80%"
                mx="auto"
            >
                <AlertDialog.CloseButton />

                <Box>
                    <Text fontSize="xl" fontWeight="bold">
                        {title}
                    </Text>
                </Box>

                <Box mt={4}>
                    <Text>{message}</Text>
                </Box>

                <Box mt={8}>
                    <Button.Group space={2} justifyContent="flex-end">
                        <Button
                            variant="unstyled"
                            colorScheme="coolGray"
                            onPress={onClose}
                            ref={cancelRef}
                        >
                            {cancelButtonText}
                        </Button>
                        <Button colorScheme="danger" onPress={onClose}>
                            {deleteButtonText}
                        </Button>
                    </Button.Group>
                </Box>
            </Box>
        </AlertDialog>
    );
};

export default CustomAlertDialog;

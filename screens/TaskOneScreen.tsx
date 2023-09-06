import React, { useEffect, useState } from 'react';
import { Actionsheet, Box, Button, FlatList, HStack, Text, VStack, useDisclose } from 'native-base';
import TodoCard from '../components/TodoCard';
import { ActivityIndicator } from 'react-native';
import CustomAlertDialog from '../components/CustomAlertDialog';

interface ITodo {
    "userId": number,
    "id": number,
    "title": string,
    "completed": boolean
}

const TaskOneScreen: React.FC = () => {
    const [todoList, setTodoList] = useState<ITodo[] | []>([]);
    const [todo, setTodo] = useState<ITodo | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const handleDeleteTodo = async (item: ITodo | null) => {
        try {
            openDialog();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((data) => {
                setTodoList(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <VStack w='full' bg="white" h="full">
            {loading ? <VStack justifyContent='center' alignItems='center' h='full'>
                <ActivityIndicator size='large' color='orange' />
            </VStack> : <FlatList
                pt='4'
                data={todoList}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => (
                    <TodoCard
                        key={item.id}
                        title={item.title}
                        completed={item.completed}
                        handleDelete={() => handleDeleteTodo(item)}
                        handleViewDetails={() => {
                            setTodo(item);
                            onOpen();
                        }}
                    />
                )}
            />}
            <CustomAlertDialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                title="Delete Confirmation"
                message="Are you sure you want to delete this todo?"
                cancelButtonText="Cancel"
                deleteButtonText="Confirm Delete"
            />

            <Actionsheet isOpen={isOpen} onClose={() => {
                setTodo(null);
                onClose();
            }}>
                <Actionsheet.Content>
                    <VStack p='5' space={4}>
                        <VStack space={4} flexDirection={'row'} w="80%">
                            <Text fontSize="xl" fontWeight="bold" w="100px">User ID</Text>
                            <Text fontSize="xl" w="85%">: {todo?.userId}</Text>
                        </VStack>
                        <VStack space={4} flexDirection={'row'} w="80%">
                            <Text fontSize="xl" fontWeight="bold" w="100px">ID</Text>
                            <Text fontSize="xl" w="85%">: {todo?.id}</Text>
                        </VStack>
                        <VStack space={4} flexDirection={'row'} w="80%">
                            <Text fontSize="xl" fontWeight="bold" w="100px">Title</Text>
                            <Text fontSize="xl" w="85%">: {todo?.title}</Text>
                        </VStack>
                        <VStack space={4} flexDirection={'row'} w="80%">
                            <Text fontSize="xl" fontWeight="bold" w="100px">Completed</Text>
                            <Text fontSize="xl" w="85%">: {todo?.completed ? "Yes" : "No"}</Text>
                        </VStack>
                        <Button colorScheme="danger" onPress={() => handleDeleteTodo(todo)}>
                            Delete
                        </Button>
                    </VStack>
                </Actionsheet.Content>
            </Actionsheet>

        </VStack>
    );
};

export default TaskOneScreen;

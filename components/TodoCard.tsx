import React from 'react';
import { HStack, Pressable, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface TodoCardProps {
    title: string;
    completed: boolean;
    handleViewDetails: () => void;
    handleDelete: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ title, completed, handleViewDetails, handleDelete }) => {
    return (
        <HStack mb="5" mx='2' bg='#fcf4e6' px='2' py='3' rounded='lg' shadow={completed ? 0 : 1} justifyContent='space-between' space={4}>
            <TouchableOpacity onPress={handleViewDetails} style={{ width: '85%' }}>
                <HStack space={4}>
                    <AntDesign name={completed ? "checkcircle" : "checkcircleo"} size={24} color={completed ? "#facc78" : "gray"} />
                    <Text w='87%' textDecorationLine={completed ? "line-through" : "none"} color={completed ? "gray.500" : "black"} fontSize='xl' fontWeight='bold' isTruncated={true}>{title}</Text>
                </HStack>
            </TouchableOpacity>
            <AntDesign name="delete" size={24} color="red" onPress={handleDelete} />
        </HStack>
    );
};

export default TodoCard;

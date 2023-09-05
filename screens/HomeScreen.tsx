import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { VStack, Text, Pressable } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface Props {
    navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <VStack alignItems="center" justifyContent="center" h="full" space={10} bg="white">
            <Pressable onPress={() => navigation.navigate('TaskOne')} h="80px" w="70%" bg="#ff9900" alignItems="center" justifyContent="center" rounded={8} shadow={5} _pressed={{ backgroundColor: '#ffb545' }}>
                <Text color="white" fontSize="xl" fontWeight="bold">Task One</Text>
            </Pressable>
            <Pressable h="80px" w="70%" bg="#ff9900" alignItems="center" justifyContent="center" rounded={8} shadow={5} _pressed={{ backgroundColor: '#ffb545' }}>
                <Text color="white" fontSize="xl" fontWeight="bold">Task Tow</Text>
            </Pressable>
        </VStack>
    );
};

export default HomeScreen;

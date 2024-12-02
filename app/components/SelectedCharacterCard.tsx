import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Character } from '../store/useCharacterStore'

type Props = {
    item: Character,
    toggleCharacter: (item: Character) => void
}

const SelectedCharacterCard = ({ item, toggleCharacter }: Props) => {
    return (
        <View className="flex items-center flex-row bg-[#E2E8F0] rounded-xl px-3 py-2" >
            <Text className="text-gray-700 mr-1"> {item.name} </Text>
            <Pressable 
                className='bg-[#94A3B8] rounded-md' 
                onPress={(e) => {
                    e.stopPropagation();
                    toggleCharacter(item);
                }}
            >
                <Ionicons name="close" size={20} color="#fff" />
            </Pressable>
        </View >
    )
}

export default SelectedCharacterCard

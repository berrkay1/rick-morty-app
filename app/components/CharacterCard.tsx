import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Character, useCharacterStore } from '../store/useCharacterStore';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  character: Character;
  searchQuery: string;
};

export const CharacterCard = ({ character, searchQuery }: Props) => {
  const { selectedCharacters, toggleCharacter } = useCharacterStore();
  const isSelected = selectedCharacters.some(char => char.id === character.id);

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <Text key={i} className="text-[#455367] font-bold">
              {part}
            </Text>
          ) : (
            part
          )
        )}
      </>
    );
  };


  return (
    <Pressable
      onPress={() => {
        toggleCharacter(character);
        console.log(character.id, character.name, "selected");
      }}
      className={"flex-row items-center p-3 rounded-3xl rounded-b-none bg-white border-b-2 border-secondary"}
    >
      <View className="mr-3">
        <Ionicons
          name={isSelected ? "checkbox" : "square-outline"}
          size={24}
          color={isSelected ? "#3B82F6" : "#94A3B8"}
        />
      </View>
      <Image
        source={{ uri: character.image }}
        className="w-16 h-16 rounded-xl"
      />
      <View className="flex-1 ml-3">
        <Text className="text-[#455367] text-lg font-normal">
          {highlightText(character.name)}
        </Text>
        <Text className="text-[#65758B] font-normal">
          {character.episode.length} Episode{character.episode.length !== 1 ? 's' : ''}
        </Text>
      </View>
    </Pressable>
  );
};

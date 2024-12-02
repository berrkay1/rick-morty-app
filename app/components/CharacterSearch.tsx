import React, { useRef } from 'react';
import { View, TextInput, Platform } from 'react-native';
import { useCharacterStore } from '../store/useCharacterStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import SelectedCharacterCard from './SelectedCharacterCard';

export const CharacterSearch = () => {

  const { searchQuery, setSearchQuery, selectedCharacters, toggleCharacter } = useCharacterStore();
  const inputRef = useRef<TextInput>(null);

  return (
    <View
      className="flex flex-row justify-between items-center bg-white border-2 border-secondary rounded-3xl p-2 gap-2 min-h-14"
      style={{
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 3.85,
          },
          android: {
            elevation: 5,
          },
        })
      }}
      onTouchEnd={(e) => {
        e.stopPropagation();
        inputRef.current?.focus();
      }}
    >
      <View className='flex-1 flex flex-row flex-wrap items-center gap-2'>
        {selectedCharacters.map((item) => (
          <SelectedCharacterCard key={item.id} item={item} toggleCharacter={toggleCharacter} />
        ))}
        <View className="bg-transparent">
          <TextInput
            ref={inputRef}
            className="bg-transparent text-primary min-w-12"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={selectedCharacters.length > 0 ? "" : "Search characters..."}
            placeholderTextColor="#6b7280"
          />
        </View>
      </View>
      <View>
        <AntDesign name={searchQuery.length > 0 ? "caretdown" : "caretup"} size={18} color="#6b7280" />
      </View>
    </View>
  );
};

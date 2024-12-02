import React, { useEffect } from 'react';
import { View, FlatList, Text, Animated } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Character, useCharacterStore } from './store/useCharacterStore';
import { CharacterSearch } from './components/CharacterSearch';
import { CharacterCard } from './components/CharacterCard';
import { useDebounce } from './hooks/useDebounce';
import { fetchCharacters } from './api.ts/global';
import Loading from './components/Loading';
import Error from './components/Error';

export default function App() {
    const { searchQuery } = useCharacterStore();
    const debouncedSearch = useDebounce(searchQuery, 500);
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    const { data: characters = [], isLoading, error } = useQuery({
        queryKey: ['characters', debouncedSearch],
        queryFn: () => fetchCharacters(debouncedSearch),
        enabled: debouncedSearch.length > 0,
    });

    const renderItem = ({ item }: { item: Character }) => <CharacterCard character={item} searchQuery={debouncedSearch} />

    useEffect(() => {
        if (searchQuery.length > 0) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            fadeAnim.setValue(0);
        }
    }, [searchQuery.length > 0]);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <Error message={error.message} />
    }

    return (
        <View className="flex-1 bg-white px-4 py-2">
            <CharacterSearch />
            {searchQuery.length > 0 &&
                <Animated.View
                    className="flex-1 mt-3 overflow-hidden border-2 border-secondary rounded-3xl"
                    style={{
                        opacity: fadeAnim,
                        transform: [{
                            translateY: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-20, 0]
                            })
                        }]
                    }}
                >
                    <FlatList
                        data={characters}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        ListEmptyComponent={
                            !isLoading ? (
                                <Text className="text-center mt-4 text-gray-500">
                                    No characters found
                                </Text>
                            ) : null
                        }
                    />
                </Animated.View>}
        </View>
    );
}
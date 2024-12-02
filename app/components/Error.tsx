import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Error = ({ message }: { message?: string }) => {
    return (
        <View className='flex-1 justify-center items-center p-5 bg-slate-400'>
            <Ionicons className='mb-3' name="alert-circle-outline" size={60} color="red" />
            <Text className='text-red-600 text-2xl font-bold'>
                Hata Oluştu
            </Text>
            <Text className='text-white text-lg font-normal'>
                {message || 'Bir şeyler yanlış gitti. Lütfen daha sonra tekrar deneyin.'}
            </Text>
        </View>
    );
};


export default Error;

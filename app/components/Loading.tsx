import { View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
    return (
        <View className='flex-1 justify-center items-center bg-slate-400'>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    )
}

export default Loading

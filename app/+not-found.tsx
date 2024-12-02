import { Link } from 'expo-router';
import { Text, View } from 'react-native';


export default function NotFoundScreen() {
  return (
    <View className='flex-1 justify-center items-center bg-black'>
      <Text className='text-white text-2xl'>Oops! Something went wrong on our side.</Text>
      <Link href="/" className='text-white text-lg mt-4 p-3 rounded-3xl bg-[#455367]'>
        <Text className='text-white'>Go to the home screen!</Text>
      </Link>
    </View>
  );
}

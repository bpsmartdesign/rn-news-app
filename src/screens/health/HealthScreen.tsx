import React, {useEffect, useState} from 'react';
import {categoryService} from '../../api/services';
import {FlatList, SafeAreaView, View} from 'react-native';
import {NewsCardItem} from '../../services/models';
import NewsCard from '../../component/NewsCard';
import styles from './HealthScreen.style';
import Spinner from '../../component/Spinner';

interface HealthScreenProps {}

interface cardItem {
  item: NewsCardItem;
}

const HealthScreen: React.FC<HealthScreenProps> = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    categoryService('health')
      .then(data => {
        setNewsData(data);
      })
      .catch(error => {
        console.log('HealthScreen error: ', error);
      });

    return () => {
      setNewsData([]);
    };
  }, []);

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <View>
        {newsData.length > 1 ? (
          <>
            <FlatList
              data={newsData}
              renderItem={({item}: cardItem) => <NewsCard data={item} />}
              keyExtractor={item => item.title}
              ListFooterComponent={<Spinner />}
            />
          </>
        ) : (
          <Spinner />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HealthScreen;

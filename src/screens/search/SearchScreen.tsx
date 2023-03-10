import React, {useEffect, useState} from 'react';
import {categoryService, searchService} from '../../api/services';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {NewsCardItem} from '../../services/models';
import NewsCard from '../../component/NewsCard';
import styles from './SearchScreen.style';
import Spinner from '../../component/Spinner';
import SearchBar from './component/SearchBar';

interface SearchScreenProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface cardItem {
  item: NewsCardItem;
}

const SearchScreen: React.FC<SearchScreenProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputTerm, setInputTerm] = useState('');
  const [newsData, setNewsData] = useState([]);

  const searchInputTerm = () => {
    if (inputTerm === '') return;
    setIsLoading(true);
    searchService(`${inputTerm}`)
      .then(data => {
        setNewsData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('SearchTerm error: ', error);
      });
  };

  const searchByCategory = (searchCategory: string) => {
    setIsLoading(true);
    setInputTerm('');
    categoryService(`${searchCategory}`)
      .then(data => {
        setNewsData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('SearchCategory error: ', error);
      });
  };

  useEffect(() => {
    return () => {
      setNewsData([]);
      setInputTerm('');
    };
  }, []);

  const Categories = () => {
    return (
      <View>
        <View style={styles.categoryContainer}>
          <Pressable
            onPress={() => {
              searchByCategory('entertainment');
            }}>
            <View style={styles.category}>
              <Image
                resizeMode="cover"
                style={styles.categoryImage}
                source={require('../../assets/hd-movie.png')}
              />
              <Text style={styles.categoryText}>{'Entertainment'}</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              searchByCategory('science');
            }}>
            <View style={styles.category}>
              <Image
                resizeMode="cover"
                style={styles.categoryImage}
                source={require('../../assets/science.png')}
              />
              <Text style={styles.categoryText}>{'Science'}</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.categoryContainer}>
          <Pressable>
            <View style={styles.category}>
              <Image
                resizeMode="cover"
                style={styles.categoryImage}
                source={require('../../assets/bookmark.png')}
              />
              <Text style={styles.categoryText}>{'Saved'}</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              searchByCategory('sports');
            }}>
            <View style={styles.category}>
              <Image
                resizeMode="cover"
                style={styles.categoryImage}
                source={require('../../assets/game.png')}
              />
              <Text style={styles.categoryText}>{'Sports'}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.backgroundStyle}>
        <ScrollView>
          <SearchBar
            inputTerm={inputTerm}
            setInputTerm={setInputTerm}
            searchInputTerm={searchInputTerm}
          />
          <Categories />
          <View>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {/* <Text>{newsData.length}</Text> */}
                {newsData.map(
                  (item, index) =>
                    // show only 24 serach result out of 100
                    index < 25 && <NewsCard key={index} data={item} />,
                )}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SearchScreen;

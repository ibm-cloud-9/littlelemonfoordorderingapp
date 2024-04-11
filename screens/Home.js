import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
  dropTable,
} from '../database';
import Filters from '../components/Filters';
import { getSectionListData, useUpdateEffect } from '../utils/utils';
import "setimmediate"
const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const sections = ['starters', 'mains', 'desserts']

//const Item = ({ name, price, description, image }) => (
const Item = ({ name, price, description, image}) => (
  <View style={styles.item}>
    <View style={styles.itemBody}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
      <Image style={styles.itemImage} source={{uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`}}/>
  </View>
);

const renderSectionHeader = ({ section: { name } }) => (
  <View style={styles.headerStyle}>
    <Text style={styles.sectionHeader}>{name}</Text>
  </View>
);
export default function Home() {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async() => {
    // 1. Implement this function
    let json;
    let menuData;
    try {
      const response = await fetch(API_URL);
      json = await response.json();
      console.log(json);
		  menuData = json.menu.map((item, index) => ({
        id: index+1,
        name: item.name,
        price: item.price.toString(),
        description: item.description,
        image: item.image,
        category: item.category
      }));
 
    } catch (error) {
      console.error(error);
    } finally {
    }

    // Fetch the menu from the API_URL endpoint. You can visit the API_URL in your browser to inspect the data returned
    // The category field comes as an object with a property called "title". You just need to get the title value and set it under the key "category".
    // So the server response should be slighly transformed in this function (hint: map function) to flatten out each menu item in the array,

    //id integer primary key not null, uuid text, title text, price text, category text

    //alert(json.menu);

    //alert(menuData[0].title);

    //console.log('Data has been Fetched:',menuData);
    return menuData;

  }

  useEffect(() => {
    (async () => {
	  let menuItems=[];
      try {
        //await dropTable();
        //menuItems = [];
        //console.log('Table Dropped, and menu items cleared')
        await createTable();
        menuItems = await getMenuItems();

        //console.log('Debug Home: MenuItems  (1):', menuItems)
        // The application only fetches the menu data once from a remote URL
        // and then stores it into a SQLite database.
        // After that, every application restart loads the menu from the database
        if (!menuItems.length) {
          menuItems = await fetchData();
          //console.log('Fetched Menuitems from URL:', menuItems)
          saveMenuItems(menuItems);
        }

        const sectionListData = getSectionListData(menuItems);
        //console.log('Debug Home : getSectionListData:', sectionListData)
        setData(sectionListData);
        //TODOload and set profile here
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        //console.log('UseUpdateEffect:', menuItems)
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: .10,
          justifyContent: 'center',
          alignItems: 'center',

        }}>
        <Image source={require('../assets/Logo.png')}
          style={{marginTop: 5}} />
      </View>
      <View
      style={{
        flex: .10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#495E57',
        padding: 10
      }}>
      <Text style={{color: '#F4CE14', fontSize: 32}}>Little Lemon</Text>
      <Text style={{color: '#FFFFFF', fontSize: 24}}>Chicago</Text>
    </View>
    <View
        style={{
          flex: .20,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          backgroundColor: '#495E57',
          padding:20,
        }}>
        <Text style={{color: '#FFFFFF', fontSize: 18, width: '60%'}}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
        <Image source={require('../assets/restaurant-food.jpg')}
          style={{width: 150, height: 150, borderRadius: 8, marginTop: -20}} />
      </View>
      <View style={{backgroundColor: '#495E57'}}>
        <Searchbar
          placeholder="Search"
          placeholderTextColor="#000"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
          iconColor="#000"
          inputStyle={{ color: '#000' }}
          elevation={0}
        />
      </View>
      <View>
      <Text style={styles.delivery}>ORDER FOR DELIVERY!</Text>
      </View>
      <View
        style={{
          flex: .10,
          flexDirection: 'column',
          alignItems: 'center',

        }}>
        
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        />
      </View>
      <View
        style={{
          flex: .50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          padding: 2
        }}>
      <SectionList
        style={styles.sectionList}
        sections={data}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <Item name={item.name} price={item.price} description={item.description} image={item.image} />
        )}
        renderSectionHeader={({ section: { name } }) => (
          <Text style={styles.itemHeader}>{name}</Text>
        )}>
        </SectionList>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    /*backgroundColor: '#495E57',*/
    backgroundColor: '#FFF',
  },
  filterButton: {
    borderRadius: 20,
  },
  delivery: {
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 10,
  },
  headerStyle: {
    backgroundColor: '#F4CE14',
  },
  sectionHeader: {
    color: 'black',
    fontSize: 26,
    flexWrap: 'wrap',
    textAlign: 'center',
  },  
  sectionList: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 8,
    backgroundColor: '#EDEFEE',
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  header: {
    fontSize: 24,
    paddingVertical: 8,
    color: '#FBDABB',
    backgroundColor: '#495E57',
  },
  capitalizeFirst: {
    textTransform: 'capitalize',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    paddingVertical: 10,
  },
  itemBody: {
    flex: 1,
  },
  itemHeader: {
    fontSize: 24,
    paddingVertical: 8,
    color: '#495e57',
    backgroundColor: '#fff',
  },
  sectionHeader: {
    color: 'black',
    fontSize: 26,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  name: {
    fontSize: 20,
    color: '#000000',
    paddingBottom: 5,

  },
  description: {
    color: '#495e57',
    paddingRight: 5,
  },
  price: {
    fontSize: 20,
    color: '#495e57',
    paddingTop: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
});

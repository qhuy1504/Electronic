import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import axios from 'axios';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons } from '@expo/vector-icons';
// import { ScrollViews } from 'react-native-gesture-handler';

const Screen02 = () => {
    const [category, setCategory] = useState('Smartphone');
    const [filter, setFilter] = useState('Sale');
    const [showAll, setShowAll] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [showLabel, setShowLabel] = useState(false);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');



    useEffect(() => {
        const fetchData = async () => {
            try {
                const listproductsResponse = await axios.get('https://67146bf4690bf212c7616162.mockapi.io/api/v1/listproduct');
                const categoryResponse = await axios.get('https://67146bf4690bf212c7616162.mockapi.io/api/v1/category');
                setProducts(listproductsResponse.data);
                //setCategory(categoryResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Gọi fetchData khi màn hình được hiển thị
    

    const filteredData = products.filter(product => {
        if (showLabel == false && showAll && showCategory == false) {
            return product.name.toLowerCase().includes(search.toLowerCase());
        }
        if (showLabel == false && showAll) {
            return product.name.toLowerCase() === category.toLowerCase()
        }
        if (showCategory) {
            return product.name.toLowerCase() === category.toLowerCase() && product.label.toLowerCase() === filter.toLowerCase();
        }
        return product.name.toLowerCase().includes(search.toLowerCase());
    });


    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);  // Cập nhật danh mục hiện tại
        setShowAll(false);  // Khi đổi danh mục thì mặc định không hiển thị hết sản phẩm
        setShowCategory(true);
        setFilter('Sale');  // Mặc định sẽ hiển thị sản phẩm theo Best Sales
    };
    const setLabel = (newFilter) => {
        setShowLabel(true);
        setFilter(newFilter);
    }

    return (

        <View style={styles.container}>
            <ScrollView style={{ width: '100%', height: 500 }}>
                <View style={styles.header}>
                    <View style={styles.header1}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.navigate('Screen01')}
                        >
                            <FontAwesome name="arrow-left" size={25} style={styles.icon2} />
                        </TouchableOpacity>

                        <Text style={styles.headerTitle}>Electronics</Text>
                    </View>
                    <View style={styles.header2}>
                        <TouchableOpacity style={styles.cartButton}>
                            <Ionicons name="cart-outline" size={30} color="#9095a0" />
                        </TouchableOpacity>

                        <Image source={require('../Data/avatar.png')} style={styles.profileImage} />
                    </View>


                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="search" size={20} style={styles.icon} />
                    <TextInput style={styles.input}
                        placeholder="Search"
                        value={search}
                        onChangeText={setSearch}
                        onFocus={() => setShowCategory(false)}
                    ></TextInput>
                </View>

                {/* Categories */}
                <View style={styles.categoryheader}>
                    <Text style={styles.textcatagories}>Catagories</Text>
                    <Text style={styles.textseeall}>See all</Text>
                </View>
                <View style={styles.categoriesContainer}>
                    <TouchableOpacity
                        style={styles.buttonsmart}
                        onPress={() => handleCategoryChange('Smartphone')}  // Khi chọn smartphone
                    >
                        <View style={styles.viewsmart1}>
                            <Image source={require('../Data/smart.png')} style={styles.imagesmart} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonsmart}
                        onPress={() => handleCategoryChange('Ipad')}  // Khi chọn iPad
                    >
                        <View style={styles.viewsmart2}>
                            <Image source={require('../Data/ipad.png')} style={styles.imageipad} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonsmart}
                        onPress={() => handleCategoryChange('Macbook')}  // Khi chọn MacBook
                    >
                        <View style={styles.viewsmart3}>
                            <Image source={require('../Data/macbook.png')} style={styles.imagemacbook} />
                        </View>
                    </TouchableOpacity>
                </View>


                {/* Filter: Best Sales, Best Matched, Popular */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity onPress={() => setLabel('Sale')}>
                        <Text style={styles.filterText}>Best Sales</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLabel('Matches')}>
                        <Text style={styles.filterText}>Best Matched</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setLabel('Popular')}>
                        <Text style={styles.filterText}>Popular</Text>
                    </TouchableOpacity>
                </View>

                {/* Product List */}
                <FlatList
                    data={showAll ? filteredData : filteredData.slice(0, 4)}  // Chỉ hiển thị 4 sản phẩm ban đầu
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.productContainer}>
                            <Image source={{ uri: `${item.image}.png` }} style={styles.productImage} />


                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Image
                                    source={require('../Data/Rating 5.png')}
                                    style={styles.ratingImage}
                                />
                            </View>

                            <View style={styles.productPrices}>
                                <TouchableOpacity>
                                    <Image
                                        source={require('../Data/addtocart.png')}
                                        style={styles.addtocartImage}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.productPrice}>{item.price}</Text>

                            </View>

                        </View>
                    )}
                />

                {/* See All Button */}
                {!showAll && products.length > 4 && (
                    <Button title="See all" onPress={() => { setShowAll(true); setShowLabel(false) }} />
                )}
                <Image
                    source={require('../Data/banner.png')}
                    style={styles.bannerimage}
                />
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        paddingVertical: 10,
    },
    filterText: {
        fontSize: 16,
        color: '#333',
    },
    productContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        flexDirection: 'row',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 16,
        color: '#555',
        fontWeight: 'bold',
    }
    , header: {
        flexDirection: 'row',
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    header1: {
        flexDirection: 'row',
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    header2: {
        flexDirection: 'row',
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'space-between',

    }



    , headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 10,

    }, cartButton: {
        marginRight: 5,
    },
    inputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: -50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#aba9a9',

        paddingHorizontal: 10,  // Tạo khoảng cách giữa icon và input
        marginBottom: 20,



    },
    input: {
        width: '85%',
        padding: 7,
        fontSize: 18,

    }, categoryheader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    textcatagories: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    viewsmart1: {
        borderRadius: 10,
        backgroundColor: '#c759f0',
    },
    viewsmart2: {
        borderRadius: 10,
        backgroundColor: '#a6d5ff',
    },
    viewsmart3: {
        borderRadius: 10,
        backgroundColor: '#e6da77',
    }, productImage: {
        width: 60,
        height: 60,
        borderRadius: 10,

    }, addtocartImage: {
        width: 30,
        height: 30,
        borderRadius: 10,
        marginBottom: 5,
    },
    productInfo: {
        flex: 1,
        marginLeft: 10,
    }, bannerimage: {
        width: '100%',
        borderRadius: 10,
        marginTop: 10,
    }, profileImage:{
        width: 40,
        height: 40,
        borderRadius: 20,
    },

});

export default Screen02;

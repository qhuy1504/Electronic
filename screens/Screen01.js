import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Screen01 = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const users = [
        { email: 'tranquochuy@gmail.com', password: "tranquochuy" },
        { email: 'tranquochuy1@gmail.com', password: "tranquochuy1" },
        { email: 'tranquochuy2@gmail.com', password: "tranquochuy2" },
        { email: 'tranquochuy3@gmail.com', password: "tranquochuy3" },
        { email: 'tranquochuy43@gmail.com', password: "tranquochuy4" },

    ];
    const handleLOgin = () => {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            navigation.navigate('Screen02');
        } else {
            alert('Thông tin đăng nhập không chính xác', 'vui lòng kiểm tra lại email và mật khẩu');
        }
    
    };

    const toggleShowPassword = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <Ionicons name="arrow-back" size={24} color="black" style={styles.backIcon}/>    
            <View style={styles.imgcontainer}>
                <Image source={require('../Data/icon.png')} style={styles.img} />
               
            </View>
            <View style={styles.titlecontainer}>
                <Text style={styles.title}>Hello Again!</Text>
                <Text style={styles.title1} >Log into your account</Text>

            </View>
            <View style={styles.inputcontainer}>
                <Ionicons name="mail-outline" size={24} color="black" style={styles.iconemail} /> 
                <TextInput style={styles.input1}
                    placeholder="Email your email address"
                    value={email}
                    onChangeText={setEmail}
                />
               
            

            </View>
            <View style={styles.inputcontainer2}>
             
                <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.iconblock} />
                <TextInput style={styles.input2}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity style={styles.eye} onPress={toggleShowPassword}>
                    <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={24} color="black" style={styles.iconeye}  />

                </TouchableOpacity>
                


            </View>
            <View style={styles.forgotpassword}>
                <Text style={styles.forgotpassword1}>Forgot password ?</Text>
            
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLOgin}>
                <Text style={styles.buttontext}>
                    Continue
                </Text>


            </TouchableOpacity>
            <View style = {styles.loginmore}>
                <Text style={styles.or}>
                    or
                </Text>
                <TouchableOpacity style={styles.logocontainer}>
                    <Image source={require('../Data/google.png')} style={styles.logomore} />
                    <Image source={require('../Data/face.png')} style={styles.logomore} />
                    <Image source={require('../Data/apple.png')} style={styles.logomore} />
                    

                </TouchableOpacity>
            </View>
            


        </View>


    );

};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 100,
        
    },
    backIcon: {
        position: 'absolute',
        top: 50,
        left: 20,
    }, imgcontainer: {
       
        justifyContent: 'center',
        alignItems: 'center',
        
    }, img: {
        marginTop: 60,
        width: 80,
        height: 80,
    }
    
    
    , titlecontainer: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 50,
        
        
        
    }, title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginBottom  : 5,
    }, title1: {
        marginLeft: 25,
    }, inputcontainer: {
       
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'gray',
        marginLeft: 50,
        width: '80%',
        
    }, input1: {
        marginLeft: 30,
        height: 40,
        opacity: 0.5,
        width: '100%',
        fontSize: 16,
        

    }, iconemail: {
        position: 'relative',
        top: 0,
        left: 15,
        marginTop: 7,

    }
, inputcontainer2: {
    marginTop: 20,
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'gray',
    marginLeft: 50,
    width: '80%',

    },  iconblock: {
        position: 'relative',
        top: 0,
        left: 15,
        marginTop: 7,

    }, input2: {
        marginLeft: 30,
        height: 40,
        opacity: 0.5,
        width: '100%',
        fontSize: 16,
    }
    , iconeye: {
        marginRight: 10,
        marginTop: 5,

        
    }, forgotpassword: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    }, forgotpassword1: {
        color: '#00a8ab',
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 20,

    }, button: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        
        
        

    }, buttontext: {
        paddingHorizontal: 100,
        backgroundColor: '#00a8ab',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        color: "white",
        fontSize: 18,
       


    }, or:{
        marginLeft: 200,

    }, logocontainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    }, logomore:{
        marginLeft: 10,
    }
   
});
export default Screen01;
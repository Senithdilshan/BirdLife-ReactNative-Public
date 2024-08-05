import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/styles'
import SearchButton from '../UI/Buttons/SearchButton'

const Search = ({ onSearch, onChangeSearch, apiTextValue }) => {
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        const checkParams = () => {
            if (apiTextValue != null) {
                setSearchInput(apiTextValue);
            }
        }
        checkParams();
    }, [apiTextValue])
    const onChange = (text) => {
        if (text.length === 0) {
            setSearchInput(text);
            onChangeSearch();
        } else {
            setSearchInput(text);
        }
    }
    return (
        <View style={styles.root}>
            <View style={styles.main}>
                <TextInput style={styles.input} value={searchInput} placeholder='Search Here....' onChangeText={onChange}></TextInput>
            </View>
            <View>
                <SearchButton onPress={onSearch} searchInput={searchInput} />
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        margin: 5
    },
    main: {
        backgroundColor: Colors.secondary500,
        width: 250,
        height: 60,
        borderColor: Colors.primary800,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        flexDirection: "row",
    },
    input: {
        width: '100%',
        marginLeft: 30,
        marginTop: 5,
    },
})
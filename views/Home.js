import React from 'react';
import { View, ActivityIndicator, Image, ScrollView, Button, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			teams: null,
			image_url: null,
			image_format: null,
		};
	}
	saveID = async (id, name) => {
		try {
			const teamid = JSON.stringify(id)
			await AsyncStorage.setItem('id', teamid)
			await AsyncStorage.setItem('name', name)
		} catch (error) {
			console.log(error)
		}
	}

	getID = async () => {
		try {
			const teamid = await AsyncStorage.getItem('id')
			const name = await AsyncStorage.getItem('name')
			if (teamid !== null) {
				this.props.navigation.navigate(name, { id: teamid })
			}
		} catch (error) {
			console.log(error)
		}
	}

	componentDidMount() {
		this.getID();
		fetch('https://api.sportti.org/sites')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					teams: data.teams,
					image_url: data.logo.url,
					image_format: data.logo.ext,
				})
			})
			.catch((error) => {
				console.log(error)
			});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={styles.container}>
					<ActivityIndicator size="large" color="blue" />
				</View>
			)
		}
		else {
			const url = this.state.image_url
			const format = this.state.image_format
			let teams = this.state.teams.map((val, key) => {
				if (val.id != null) {
					return <View key={key} style={styles.item}>
						<Button style={[styles.tc, styles.h4]} title={val.name} onPress={() => {
							this.saveID(val.id, val.name);
							this.props.navigation.navigate(val.name, { id: val.id })
						}} />
						<Image style={styles.logo} source={{ uri: url + val.img + "." + format }} />
					</View>
				}
			});

			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
						{teams}
					</ScrollView>
				</View>

			);

		}

	}

}


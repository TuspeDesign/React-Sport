import React from "react";
import { Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import { styles } from '../styles/Styles'

class Partners extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			logos: null,
		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/partners')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					logos: data,
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
					<Text style={[styles.tc, styles.h4]}>Ladataan...</Text>
				</View>
			)
		} else {

			let mainTeam = this.state.logos.map((val, key) => {
				if (val.type == 'Yhteistyöseura') {
					return <View key={key} style={styles.item, styles.mb3}>
						<Image style={styles.logo} source={{ uri: val.img }} />
					</View>
				}
			});

			let mainPartners = this.state.logos.map((val, key) => {
				if (val.type == 'Pääyhteistyökumppanit') {
					return <View key={key} style={styles.item, styles.mb3}>
						<Image style={styles.logo} source={{ uri: val.img }} />
					</View>
				}
			});

			let partners = this.state.logos.map((val, key) => {
				if (val.type == 'Yhteistyökumppanit') {
					return <View key={key} style={styles.item, styles.mb3}>
						<Image style={styles.logo} source={{ uri: val.img }} />
					</View>
				}
			});

			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
						<Text style={[styles.tc, styles.h4, styles.mb3, styles.up]}>Yhteistyöseura</Text>
						{mainTeam}
						<Text style={[styles.tc, styles.h4, styles.mb3, styles.up]}>Pääyhteistyökumppanit</Text>
						{mainPartners}
						<Text style={[styles.tc, styles.h4, styles.mb3, styles.up]}>Yhteistyökumppanit</Text>
						{partners}
					</ScrollView>
				</View>

			);

		}
	}
}

export { Partners };


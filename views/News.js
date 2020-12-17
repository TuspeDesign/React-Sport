import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import moment from "moment";
import { Loading } from './Loading';
import { styles } from '../styles/Styles'

class News extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			news: null,
		};
	}
	componentDidMount() {
		fetch('https://api.sportti.org/sites/' + this.props.route.params.team_id + '/news')
			.then((response) => response.json())
			.then((data) => {
				this.setState({
					isLoading: false,
					news: data,
				})
			})
			.catch((error) => {
				console.log(error)
			});
	}

	render() {
		if (this.state.isLoading) {
			return (<Loading />);
		} else {
			let news = this.state.news.map((val, key) => {
				let date = moment(val.date * 1000).format('DD.MM.YYYY')
				return <View key={key} style={styles.mb3}>
					<TouchableOpacity onPress onPress={() => this.props.navigation.navigate('Sivu', {
						team_id: this.props.route.params.team_id, page_id: val.id
					})}>
						<Text style={[styles.h4, styles.up]}>{val.title}</Text>
						<Text>{date} | Uutiset</Text>
					</TouchableOpacity>
				</View>
			});

			return (
				<View style={styles.container}>
					<ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
						<Text style={[styles.h4, styles.up, styles.tc, styles.mt3, styles.mb3]}>Uutiset</Text>
						{news}
					</ScrollView>
				</View>
			);
		}


	}
}

export { News }
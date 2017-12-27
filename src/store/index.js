import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import moment from 'moment-timezone';
import Axios from 'axios';

export default new Vuex.Store({
	state: {
		currentYear: 2017,
		currentMonth: 12,
		eventFormPos: {
			x: 0,
			y: 0
		},
		eventFormActive: false,
		eventFormDate: moment(),
		events: [],
	},
	mutations: {
		setCurrentMonth(state,payload) {
			state.currentMonth = payload;
		},
		setCurrentYear(state,payload) {
			state.currentYear = payload;
		},
		eventFormPos(state,payload) {
			state.eventFormPos = payload;
		},
		eventFormActive(state, payload) {
			state.eventFormActive = payload;
		},
		eventFormDate(state, payload) {
			state.eventFormDate = payload;
		},
		addEvent(state, payload) {
			state.events.push(payload);
		}
	},
	actions: {
		addEvent(context, payload) {
			return new Promise((resolve, reject) => {
				let obj = {
					description: payload,
					date: context.state.eventFormDate
				};
				Axios.post('/add-event', obj).then(response => {
					if (response.status == 200) {
						context.commit('addEvent', obj);
						resolve();
					} else {
						reject();
					}
				});
			});
			
		}
	}
});
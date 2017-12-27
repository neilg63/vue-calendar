import VueCalendar from './entry.js';
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

export default function(context) {
	return VueCalendar(context.events.map(event => {
			return {
				description: event.description,
				date: moment(event.date)
			}
		})
	);	
}

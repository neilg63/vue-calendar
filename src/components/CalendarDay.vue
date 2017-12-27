<template>
	<div :class="classObject" @click="captureClick">
	{{day.format('D') }}
	<ul class="event-list">
		<li v-for="event in events">{{event.description}}</li>
	</ul>
</div>
</template>
<script>

export default {
	props: ['day'],
	computed: {
		events() {
			let events = this.$store.state.events;

			return events.filter(event => event.date.isSame(this.day,'day'));
		},
		classObject() {
			let now = this.$moment(); 
			let today = this.day.isSame(now,'day')
			let efDate = this.$store.state.eventFormDate;
			let efActive = this.$store.state.eventFormActive;
			let obj = {
				day: true,
				today: today,
				past: this.day.isSameOrBefore(now,'day') && !today,
				active: efDate.isSame(this.day,'day') && efActive
			};
			return obj;
		}
	},
	methods: {
		captureClick(e) {
			this.$store.commit('eventFormPos', {
				x: e.clientX,
				y: e.clientY
			})
			this.$store.commit('eventFormActive', true);
			this.$store.commit('eventFormDate', this.day);
		}
	}
}

</script>
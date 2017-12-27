<template>
	<div>
		<div class="current-month">{{formattedDate}}</div>
		<button @click="dec">-</button>
		<button @click="inc">+</button>
	</div>
</template>
<script>

export default {
	computed: {
		month() {
			return this.$store.state.currentMonth;
		},
		year() {
			return this.$store.state.currentYear;
		},
		formattedDate() {
			return this.$moment(`${this.year}-${this.month}-1`,'YYYY-M-D').format('MMMM YYYY')
		}
	},
	methods: {
		inc() {
			let changeYear = this.month === 12;
			let nextVal = changeYear? 1 : this.month + 1;
			this._change(nextVal,changeYear, 1);
		},
		dec() {
			let changeYear = this.month === 1;
			let nextVal = changeYear? 12 : this.month - 1;
			this._change(nextVal,changeYear, -1);
		},
		_change(nextVal,changeYear, yearDiff) {
			if (changeYear) {
				this.$store.commit('setCurrentYear', this.year + yearDiff);
			}
			this.$store.commit('setCurrentMonth', nextVal);
			this.$store.commit('eventFormActive', false);
		}
	}
}

</script>
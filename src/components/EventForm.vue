<template>
	<div id="event-form" :class="{active:active}" :style="style">
		<h4>Add an event</h4>
		<p>{{date.format('dddd, Do MMM')}}</p>
		<div class="text">
			<input v-focus type="text" v-model="description" size="32" max-length="255" placeholder="Enter description" :keyup.enter="create" />
		</div>
		<div class="buttons">
			<button class="create" @click="create">Create</button>
		</div>
		<button id="close-button" @click="close">&#10005</button>
	</div>
</template>
<script>
export default {
	data() {
		return {
			description: ''
		}
	},
	computed: {
		pos() {
			return this.$store.state.eventFormPos;
		},
		style() {
			return {top: this.pos.y + 'px', left: this.pos.x + 'px'}
		},
		active() {
			return this.$store.state.eventFormActive;
		},
		date() {
			return this.$store.state.eventFormDate
		}
	},
	methods: {
		close() {
			this.$store.commit('eventFormActive', false);
		},
		create() {
			this.description = this.description.trim();
			if (this.description.length > 1) {
				this.$store.dispatch('addEvent', this.description).then(_ => {
					this.close();
					this.description = '';
				});
			}
		}
	},
	directives: {
		focus: {
			update(el) {
				el.focus();
			}
		}
	}
}	
</script>
<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h1 class="font-weight-black text-center mb-8">Aktualne predstave</h1>
                </v-col>
            </v-row>

            <v-row class="justify-center">
                <v-col cols="10" class="d-flex justify-center">
                    <div v-for="event in events" :key="event._id" class="white px-8 py-4 text-center elevation-5 last-no-mr" style="border-radius: 7px; min-width: 200px">
                        <h2 class="title font-weight-medium">{{ event.name }}</h2>
                        <p class="body-2 mt-1 mb-0 cyan--text text--darken-3">
                            {{ getDateAndTime(event.startDate) }}
                        </p>
                        <p class="body-2 cyan--text text--darken-3" v-if="event.venue && event.venue.name">
                            {{ event.venue.name }}
                        </p>
                        <v-btn outlined small color="secondary" @click="sheet = !sheet">
                            Nakup / {{ event.price }}€
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>

        <v-bottom-sheet v-model="sheet">
            <v-sheet class="text-center" height="200px">
                <v-btn
                        class="mt-6"
                        text
                        color="red"
                        @click="sheet = !sheet"
                >Prekliči nakup</v-btn>
                <div class="py-3">This is a bottom sheet using the controlled by v-model instead of activator</div>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>

<script>
	const axios = require('axios');

	export default {
		name: 'HelloWorld',

		data: () => ({
			events: [],
			sheet: false,
		}),
        methods: {
			getDateAndTime: function (eventDate) {
				const date = new Date(eventDate);
				const hours = date.getHours() < 10 ? `${date.getHours()}0` : `${date.getHours()}`;
				const minutes = date.getMinutes() < 10 ? `${date.getMinutes()}0` : `${date.getHours()}`;

				return `${date.getDate()}. ${date.getMonth() + 1}. ob ${hours}:${minutes}`;
			}
        },
        mounted() {
			axios
				.get(`${process.env.VUE_APP_API}/events`)
				.then(response => {
					if (response && response.data) {
						this.events = response.data
					}
				})
		},
	};
</script>

<style scoped>
  .last-no-mr {
    margin-right: 32px;
  }

  .last-no-mr:last-child {
    margin-right: 0;
  }
</style>
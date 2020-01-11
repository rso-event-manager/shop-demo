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
                    <div v-for="event in events" :key="event._id"
                         class="white px-8 py-4 text-center elevation-5 last-no-mr"
                         style="border-radius: 7px; min-width: 200px">
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

        <v-bottom-sheet v-model="sheet" :eager="true">
            <v-sheet class="secondary text-center d-flex justify-center align-center" height="200px">
                <div class="py-10 px-10" style="width: 400px;">
                    <div ref="card" class="white elevation-5 pa-4" style="border-radius: 10px">
                        <!-- Elements will create input elements here -->
                    </div>

                    <!-- We'll put the error messages in this element -->
                    <div id="card-errors" role="alert"></div>

                    <v-btn outlined color="primary" id="submit" class="mt-7 elevation-4">Plačaj vstopnico</v-btn>
                </div>
            </v-sheet>
        </v-bottom-sheet>
    </div>
</template>

<script>
	const axios = require('axios');

	// eslint-disable-next-line no-undef
	const stripe = Stripe('pk_test_woNnzLqV7KaTrdLQiiebET4P00vMr2y6uN');
	const elements = stripe.elements();

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

			const card = elements.create("card");
			card.mount(this.$refs.card);
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
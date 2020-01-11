<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h1 class="font-weight-black text-center mb-8">Aktualne predstave</h1>
                </v-col>
            </v-row>

            <v-row class="justify-center">
                <v-col cols="3" v-for="event in events" :key="event._id"
                       class="px-4 text-center">
                    <div class="white elevation-5 px-8 py-4" style="border-radius: 7px;">
                        <h2 class="title font-weight-medium">{{ event.name }}</h2>
                        <p class="body-2 mt-1 mb-0 cyan--text text--darken-3">
                            {{ getDateAndTime(event.startDate) }}
                        </p>
                        <p class="body-2 cyan--text text--darken-3" v-if="event.venue && event.venue.name">
                            {{ event.venue.name }}
                        </p>
                        <v-btn outlined small color="secondary" @click="goToCheckout(event)">
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

                    <v-btn outlined color="primary" id="submit" class="mt-7 elevation-4" @click="buyTicket">Plačaj
                        vstopnico
                    </v-btn>
                </div>
            </v-sheet>
        </v-bottom-sheet>

        <v-dialog
                v-model="dialog"
                persistent
                width="400"
        >
            <v-card
                    color="secondary"
                    dark
            >
                <v-card-text class="py-3">
                    Počakajte trenutek. Plačilo je v obdelavi ...
                    <v-progress-linear
                            indeterminate
                            color="white"
                            class="mt-2 mb-2"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-snackbar
                v-model="snackbar"
                :timeout="snackbarTimeout"
                :color="snackbarColor"
        >
            {{ snackbarText }}
        </v-snackbar>
    </div>
</template>

<script>
	const axios = require('axios');

	// eslint-disable-next-line no-undef
	const stripe = Stripe('pk_test_woNnzLqV7KaTrdLQiiebET4P00vMr2y6uN');
	const elements = stripe.elements();

	let card;

	export default {
		name: 'HelloWorld',

		data: () => ({
			events: [],
			sheet: false,
			activeEvent: {},
			dialog: false,
			snackbar: false,
			snackbarColor: "success",
			snackbarText: "",
			snackbarTimeout: 2500,
			clientSecret: "",
		}),
		methods: {
			getDateAndTime: function (eventDate) {
				const date = new Date(eventDate);
				const hours = date.getHours() < 10 ? `${date.getHours()}0` : `${date.getHours()}`;
				const minutes = date.getMinutes() < 10 ? `${date.getMinutes()}0` : `${date.getHours()}`;

				return `${date.getDate()}. ${date.getMonth() + 1}. ob ${hours}:${minutes}`;
			},
			goToCheckout: function (event) {
				this.sheet = !this.sheet
				this.activeEvent = event

				const vm = this

				axios.post(`${process.env.VUE_APP_API}/billing/secret`, {
					eventId: this.activeEvent._id,
					amount: this.activeEvent.price,
					currency: "eur",
				})
					.then(function (res) {
						// eslint-disable-next-line no-console
						vm.clientSecret = res.data.client_secret;
					})
			},
			buyTicket: function () {
				this.sheet = !this.sheet
				this.dialog = !this.dialog

				const vm = this

				stripe.confirmCardPayment(vm.clientSecret, {
					payment_method: {
						card: card,
						// billing_details: {
						// 	name: 'Jenny Rosen'
						// }
					}
				}).then((res) => {
					if (res.error) {
						// eslint-disable-next-line no-console
						console.log(res.error.message)

						vm.snackbar = !vm.snackbar
						vm.snackbarColor = "error"
						vm.snackbarText = "Plačilo ni uspelo"
					} else {
						vm.snackbar = !vm.snackbar
						vm.snackbarColor = "success"
						vm.snackbarText = "Plačilo je uspelo"
					}
				}).finally(() => {
					vm.activeEvent = null
					vm.dialog = !vm.dialog
				});
			},
		},
		mounted() {
			const today = new Date()
            const formattedDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
			axios
				.get(`${process.env.VUE_APP_API}/events/?from=${formattedDate}`)
				.then(response => {
					if (response && response.data) {
						this.events = response.data
					}
				})

			card = elements.create("card");
			card.mount(this.$refs.card);
		}
		,
	}
	;
</script>

<style scoped>
    .last-no-mr {
        margin-right: 32px;
    }

    .last-no-mr:last-child {
        margin-right: 0;
    }
</style>
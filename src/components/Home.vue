<template>
    <v-container>
        <!--    <v-layout-->
        <!--      text-center-->
        <!--    >-->

        <v-row>
            <v-col cols="12">
                <h1 class="font-weight-black text-center mb-8">Aktualne predstave</h1>
            </v-col>
        </v-row>

        <v-row class="justify-center">
            <v-col cols="10" class="d-flex justify-center">
                <div v-for="event in events" :key="event.id" class="white px-8 py-4 text-center elevation-5 last-no-mr" style="border-radius: 7px; min-width: 200px">
                    <h2 class="title font-weight-medium">{{ event.title }}</h2>
                    <p class="body-2 mt-1 mb-0 cyan--text text--darken-3">
                        {{ event.date }}
                    </p>
                    <p class="body-2 cyan--text text--darken-3">
                        {{ event.venue }}
                    </p>
                    <v-btn outlined small color="secondary">
                      Nakup
                    </v-btn>
                </div>
            </v-col>
        </v-row>

        <!--    </v-layout>-->
    </v-container>
</template>

<script>
	export default {
		name: 'HelloWorld',

		data: () => ({
			events: [
				{
					id: '1',
					title: 'Star Wars',
					date: '10. 1. ob 20:00',
					price: '4€',
					venue: 'Velika dvorana',
				},
				{
					id: '2',
					title: 'Knives Out',
					date: '11. 1. ob 18:00',
					price: '4€',
					venue: 'Velika dvorana',
				},
				{
					id: '3',
					title: 'Zgodbe iz kostanjevih gozdov',
					date: '12. 1. ob 14:00',
					price: '3€',
					venue: 'Mala dvorana',
				}
			],
		}),
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
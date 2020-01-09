<template>
    <v-app>
      <v-content class="primary justify-center align-center">

            <!-- Provides the application the proper gutter -->
            <v-container fluid>

                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>

	export default {
		name: 'App',

		data: () => ({
			//
		}),
	};
</script>

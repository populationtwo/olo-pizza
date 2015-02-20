/**
 * Popular Build Finder v1.0.0
 * http://www.edwinlunandy.com
 *
 *
 * Copyright 2015, Edwin Lunandy
 */

$( document ).ready( function () {

	var get_pizza = function () {
		$.getJSON( 'http://files.olo.com/pizzas.json', function (data) {

			var allPizzas = [];
			for (var i = 0; i < data.length; i++) { // Sort pizza toppings
				data[i].toppings.sort();
				allPizzas.push( data[i].toppings.join(', '));
			}
			allPizzas.sort;

			var compressed = [];
			// make a copy of the input array
			var copy = allPizzas.slice(0);

			// first loop goes over every element
			for (var i = 0; i < allPizzas.length; i++) {

				var myCount = 0;
				// loop over every element in the copy and see if it's the same
				for (var w = 0; w < copy.length; w++) {
					if (allPizzas[i] == copy[w]) {
						// increase amount of times duplicate is found
						myCount++;
						// sets item to undefined
						delete copy[w];
					}
				}

				if (myCount > 0) {
					var a = new Object();
					a.pizzaName = allPizzas[i];
					a.pizzaCounter = myCount;
					compressed.push(a);
				}
			}

			function compare(a, b) {
				if (a.pizzaCounter > b.pizzaCounter)
					return -1;
				if (a.pizzaCounter < b.pizzaCounter)
					return 1;
				return 0;
			}
			compressed.sort( compare ); // Sort pizza based on pizzaCounter.

			for (var l = 0; l < 20; l++) { // Get the 20 most frequently ordered Pizza
				$( '#js-pizza-list' ).append(
					"<article class='panel'>" +
					"<h3><span class='name'>" +
					compressed[l].pizzaName + "</span> ordered "+
					"<span class='num'>" + compressed[l].pizzaCounter +
					"</span> times </h3>" +
					"</article>");
			}

		} )

	};

	get_pizza();

} );
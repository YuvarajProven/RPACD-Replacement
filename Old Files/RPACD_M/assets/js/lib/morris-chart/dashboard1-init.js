// Dashboard 1 Morris-chart
$( function () {
	"use strict";


	// Extra chart
	Morris.Bar( {
		element: 'traffic-chart',
		data: [ {
				period: 'Monday',
				iphone: 19,
				imac: 16,
				ibook: 46
        }, {
				period: 'Tuesday',
				iphone: 14,
				imac: 10,
				ibook: 42
        }, {
				period: 'Wednesday',
				iphone: 15,
				imac: 10,
				ibook: 40
        }, {
				period: 'Thrusday',
				iphone: 17,
				imac: 13,
				ibook: 42
        }, {
				period: 'Friday',
				iphone: 18,
				imac: 10,
				ibook: 48
        }, {
				period: 'Saturday',
				iphone: 15,
				imac: 12,
				ibook: 45
        }, {
				period: 'Sunday',
				iphone: 17,
				imac: 12,
				ibook: 51
        }


        ],
		barColors: [ 'green', 'red'],
		xkey: 'period',
		ykeys: [ 'iphone', 'imac', 'ibook'],
		labels: [ 'Critical', 'Non Critical', 'Completed'],
		pointSize: 0,
		lineWidth: 0,
		resize: true,
		fillOpacity: 0.8,
		behaveLikeLine: true,
		gridLineColor: '#e0e0e0',
		hideHover: 'auto'

	} );



} );

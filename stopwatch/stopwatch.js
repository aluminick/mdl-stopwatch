(function() {
	var hourCount = document.getElementById('hour-count'),
		minuteCount = document.getElementById('minute-count'),
		secondCount = document.getElementById('second-count'),
		millisecondCount = document.getElementById('millisecond-count');

	var btnToggleStopwatch = document.getElementById('btn-toggle-stopwatch'),
		btnResetStopwatch = document.getElementById('btn-reset-stopwatch');


	var ToggleMountNode = document.getElementById('stopwatch-mount-node'),
		ToggleStopwatchComponent = React.createClass({
			componentDidMount: function() {
				componentHandler.upgradeDom();
			},
			componentDidUpdate: function() {
				componentHandler.upgradeDom();
			},
			getDefaultProps: function() {
				return {
					hourDOM: hourCount,
					minuteDOM: minuteCount,
					secondDOM: secondCount,
					millisecondDOM: millisecondCount,
					intervalRunner: null,
				};
			},
			getInitialState: function() {
				return {
					running: false,
					hours: parseInt(document.getElementById('hour-value').innerHTML),
					minutes: parseInt(document.getElementById('minute-value').innerHTML),
					seconds: 0,
					milliseconds: 0,
					intervalRunner: null,
				};
			},
			reset: function() {
				this.setState({
					running: false,
					hours: parseInt(document.getElementById('hour-value').innerHTML),
					minutes: parseInt(document.getElementById('minute-value').innerHTML),
					seconds: 0,
					milliseconds: 0,
				});
				clearInterval(this.state.intervalRunner);
				this.props.hourDOM.innerHTML = '00';
				this.props.minuteDOM.innerHTML = '00';
				this.props.secondDOM.innerHTML = '00';
				this.props.millisecondDOM.innerHTML = '00';
				document.getElementById('hour-value').innerHTML = '00';
				document.getElementById('minute-value').innerHTML = '00';
				document.getElementById('hour-slider').value = 0;
				document.getElementById('minute-slider').value = 0;
			},

			toggle: function() {
				this.setState({
					running: !this.state.running,
					hours: parseInt(document.getElementById('hour-value').innerHTML),
					minutes: parseInt(document.getElementById('minute-value').innerHTML),
				}, function() {
					if(this.state.running === false) {
						clearInterval(this.state.intervalRunner);
					}
				});

				if(this.state.running === false) {
					this.state.intervalRunner = setInterval(function(){

						this.setState({
							milliseconds: ((this.state.milliseconds + 1) > 99)? 0: this.state.milliseconds + 1,
						}, function() {
							if(this.state.milliseconds === 0) {
								this.setState({
									seconds: ((this.state.seconds + 1) > 59)? 0: this.state.seconds + 1,
								}, function() {
									if(this.state.seconds === 0) {
										this.setState({
											minutes: ((this.state.minutes + 1) > 59)? 0: this.state.minutes + 1,
										}, function() {
											if(this.state.minutes === 0) {
												this.setState({
													hours: this.state.hours + 1,
												});
											}
										});
									}
								});
							}
						});

						this.props.hourDOM.innerHTML = (this.state.hours < 10)?'0'+this.state.hours: this.state.hours;
						this.props.minuteDOM.innerHTML = (this.state.minutes < 10)?'0'+this.state.minutes: this.state.minutes;
						this.props.secondDOM.innerHTML = (this.state.seconds < 10)?'0'+this.state.seconds: this.state.seconds;
						this.props.millisecondDOM.innerHTML = (this.state.milliseconds < 10)?'0'+this.state.milliseconds: this.state.milliseconds;

					}.bind(this), 10);
				}
			},
			render: function() {
				var label = (this.state.running === true)?'Stop': 'Start';
				return (
					<span>
						<button onClick={this.toggle} className="btn-control mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
							<span id="label-state-stopwatch">{label}</span>
						</button>
						<button onClick={this.reset} className="btn-control mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
							<span id="label-state-stopwatch">Reset</span>
						</button>
					</span>
				);
			}
		});

	ReactDOM.render(
		<ToggleStopwatchComponent />,
		ToggleMountNode
	);


})();
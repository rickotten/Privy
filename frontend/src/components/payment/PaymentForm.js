import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid'
import { Paper } from "@material-ui/core";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Typography } from "@material-ui/core";

export default class PaymentForm extends React.Component {
	state = {
		cvc: '',
		expiry: '',
		focus: '',
		name: '',
		number: '',
	};

	handleInputFocus = (e) => {
		this.setState({ focus: e.target.name });
	}

	handleInputChange = (e) => {
		const { name, value } = e.target;

		this.setState({ [name]: value });
	}



	render() {
		return (
			<Grid container direction='column' spacing={3}>
				<Grid item>
					<Cards
						cvc={this.state.cvc}
						expiry={this.state.expiry}
						focused={this.state.focus}
						name={this.state.name}
						number={this.state.number}
					/>
				</Grid>
				<Grid item>
					<CreditCardForm parentSetState={this.handleInputChange} information={this.state} />
				</Grid>
			</Grid>
		);
	}
}

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20
	},
	margin: {
		margin: theme.spacing(1),
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	textField: {
		width: '25ch',
	},
	centered: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontFamily: "Nunito",
		fontWeight: "italic",
		fontSize: "1rem",
		color: 'rgb(102, 101, 101, 0.7)',
		width: '100%'
	},
}));

function CreditCardForm({
	parentSetState,
	information
}) {
	const classes = useStyles();
	const [values, setValues] = React.useState({
		number: information.number,
		name: information.name,
		cvc: information.cvc,
		expiry: information.expiry,
		showCVV: false,
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
		parentSetState(event)
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showCVV: !values.showCVV });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Paper className={classes.root}>
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Typography variant='subtitle2' gutterBottom className={classes.title}>*Note this is a mock payment portal. Information is not actually sent</Typography>
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth className={classes.margin} variant="filled">
						<InputLabel htmlFor="filled-adornment-amount">CC #</InputLabel>
						<FilledInput
							name='number'
							placeholder="Do not include dashes"
							id="filled-adornment-amount"
							value={values.number}
							onChange={handleChange('amount')}
							startAdornment={<InputAdornment position="start">
								<CreditCardIcon />
							</InputAdornment>}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth className={classes.margin} variant="filled">
						<InputLabel htmlFor="filled-adornment-amount">Full Name</InputLabel>
						<FilledInput
							name='name'
							placeholder="e.g. John H. Doe"
							id="filled-adornment-amount"
							value={values.name}
							onChange={handleChange('amount')}
							startAdornment={<InputAdornment position="start">
								<AccountCircleIcon />
							</InputAdornment>}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
						<InputLabel htmlFor="filled-adornment-password">CVC</InputLabel>
						<FilledInput
							id="filled-adornment-password"
							name='cvc'
							placeholder="XXX"
							type={values.showCVV ? 'text' : 'password'}
							value={values.cvc}
							onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position="start">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{values.showCVV ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
						<InputLabel htmlFor="filled-adornment-weight">Expiry</InputLabel>
						<FilledInput
							id="filled-adornment-weight"
							placeholder="e.g. 07/2021"
							value={values.expiry}
							onChange={handleChange('weight')}
							endAdornment={<InputAdornment position="start"><CalendarTodayIcon /></InputAdornment>}
							aria-describedby="filled-weight-helper-text"
							inputProps={{
								'aria-label': 'weight',
							}}
						/>
					</FormControl>
				</Grid>
			</Grid>
		</Paper>
	);
}
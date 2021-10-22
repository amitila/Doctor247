import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Home from "./Home";
import Slide from "./Slide";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(2),
		},
		textAlign: "center",
	},
	grid: {
		float: "none",
	},
}));

export default function Doctors() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Container maxWidth="lg">
				<Grid container spacing={1}>
					<Grid xs={12} sm={12}>
						<Home />
					</Grid>
					<Grid xs={12} sm={12}>
						<div
							className="fb-page"
							data-href="https://www.facebook.com/doctor247DHT"
							data-tabs="timeline"
							data-width="500"
							data-height="50"
							data-small-header="true"
							data-adapt-container-width="true"
							data-hide-cover="false"
							data-show-facepile="true"
						>
							<blockquote
							cite="https://www.facebook.com/doctor247DHT"
							className="fb-xfbml-parse-ignore"
							>
							<a href="https://www.facebook.com/doctor247DHT">Doctor247</a>
							</blockquote>
						</div>
					</Grid>
					<Grid container xs={12} >
						<Grid xs={12} sm={4} >
							
						</Grid>
						<Grid xs={12} sm={4} >
							<Slide className={classes.grid} />
						</Grid>
						<Grid xs={12} sm={4} >
							
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

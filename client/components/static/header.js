import React from "react";
import "../../SCSS/header.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			navOpen: false,
		};
	}

	handleNav() {
		let navOpen = !this.state.navOpen;
		this.setState({
			navOpen: navOpen,
		});
	}

	render() {
		let header;
		if (this.props.loggedIn) {
			header = (
				<div className="topBar content container">
					<div className="logo">
						<Link to="/">
							<img src="/public/logo.svg" />
						</Link>
					</div>
					<nav>
						<div className="thumbnail" onClick={() => this.handleNav()}>
							<img
								src={this.props.user.avatar_url}
								className="navThumbnail"
								onClick={() => this.handleNav()}
							/>
							<div className="menu">menu</div>
						</div>
						<ul className={this.state.navOpen ? "userNav" : "userNav closed"}>
							<li>
								<Link
									className={this.props.onboarded ? null : "hidden"}
									to={"/search"}
									onClick={() => this.handleNav()}>
									{" "}
									Search{" "}
								</Link>
							</li>
							<li>
								<Link
									className={this.props.onboarded ? null : "hidden"}
									to="/team/myteams"
									onClick={() => this.handleNav()}>
									Your Teams
								</Link>
							</li>
							<li>
								<Link
									className={this.props.onboarded ? null : "hidden"}
									to={"/me"}
									onClick={() => this.handleNav()}>
									{" "}
									View Your Profile{" "}
								</Link>
							</li>
							<li>
								<a
									href="/api/auth/github/logout"
									onClick={() => this.handleNav()}>
									Signout
								</a>
							</li>
						</ul>
					</nav>
				</div>
			);
		} else {
			header = (
				<div className="topBar content container landing">
					<div className="logo">
						<img src="/public/logo.svg" />
					</div>
				</div>
			);
		}
		return <header className="container">{header}</header>;
	}
}

const mapStateToProps = state => ({
	user: state.profile,
	onboarded: state.onboarded,
});

export default connect(mapStateToProps)(Header);

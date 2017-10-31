import React from "react";

import "../../SCSS/noMobile.scss";

export default class NoMobile extends React.Component {
	render() {
		const githubIssues = (
			<a href="https://github.com/thinkful-c11/devcupid/issues">
				GitHub Issues
			</a>
		);
		return (
			<div className="noMobile">
				<div className="sorry">
					<h1>{"</3"}</h1>
					<h2>Hey, thanks for checking out our app. We truly appreciate it!</h2>
					<h3>Unfortunately, we don't support mobile devices as of now. :( </h3>
					<p>
						I know, I know... mobile is like > 50% of web traffic, and we should
						have done the mobile CSS first anyway... but, we didn't. It was a
						tight deadline and most people were going to be demoing it on a
						desktop! We really hope to have full mobile support sometime soon.
						If you're particularly annoyed, go ahead and light a fire under our
						butts over on our {githubIssues}. In the meantime, please view the
						app on a larger screen to get the full experience.
					</p>
					<p>Sorry!</p>
					<p>-The devCupid Team {"<3"}</p>
				</div>
			</div>
		);
	}
}

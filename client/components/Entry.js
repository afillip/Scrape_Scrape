import React from 'react';


export default class Entry extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	componentWillMount(){
		console.log(this.props.images)
	}

	

	render(){
		return(
			<div>
				<table className="linkTable"> 
					<thead>
						<tr>
							<tbody>
								<img src={this.props.images} width='200px' height='200px'></img>
							</tbody>
						</tr>
					</thead>
				</table>
			</div>

		)
	}
}

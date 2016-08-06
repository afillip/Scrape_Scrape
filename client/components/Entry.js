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
				
				
					
						
								<img src={this.props.images} width='200px' height='200px'></img>
							
					
				
				
			</div>

		)
	}
}

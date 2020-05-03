import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class restaurantListing extends Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			listingData: []
		};
	}
	
	componentDidMount() {
		this._isMounted = true;
		fetch("https://opentable.herokuapp.com/api/restaurants?state=IL")
			.then(res  => res.json())
			.then(
				(result) => {
					if (this._isMounted) {
						this.setState({
							isLoaded:true,
							listingData:result.restaurants
						});
					}
				},
				(error) => {
					console.log(error)
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	componentWillUnmount() {
    	this._isMounted = false;
  	}
  	
	render() {
		const {error, isLoaded, listingData } = this.state;
		
		if (error) {
			return <h1 className = "err_msg">{error.message}</h1>;
		} else if (!isLoaded) {
			return <h1 className='err_msg'>Loading...</h1>;
		} else 
		return (
			<Container fluid>
  			<Row>
				{listingData.map(data => (  				
    			<Col sm={3} key = {data.id} className= 'testbor'>  
					<div className="clearfix">
						 <br/>
					  <img className="img" src={data.image_url} alt="Pineapple" />
					  <p><b>{data.name}</b></p>
					  <p>{data.address}</p>
					</div>
    			</Col>
    	    	))}
            </Row>
		</Container>
		);
	}
}

export default restaurantListing;
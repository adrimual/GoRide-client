import { React, Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
//Import bootstrap
import { Card, Button, Col } from 'react-bootstrap'

import EventService from '../../../services/EventService'
class EventCard extends Component {
    constructor (props){
        super (props)
        this.state = {}
        this.eventService = new EventService()
    }
    deleteEvent = eventId =>{
        this.eventService
            .deleteEvent(eventId)
            .then(() => this.props.updateEvents())
            .catch(err => console.log(err))
    }
    render(){
        return (
            <Col md={4}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Subtitle>City:{this.props.city}</Card.Subtitle>
                    <Card.Text>Date: {this.props.date}</Card.Text>
                    <Card.Text>Description: {this.props.description}</Card.Text>
                    <Link to={`/user/${this.props.loggedInUser}/event/edit/${this.props._id}`} ><Button variant="primary">Edit</Button></Link>
                    <Button variant="primary" onClick={() => this.deleteEvent(this.props._id) && <Redirect to='/profile'/>  }>Delete</Button>
                </Card.Body>
            </Card>
            </Col>
        )
    }
}

export default EventCard 
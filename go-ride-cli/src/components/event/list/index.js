import React, {Component} from 'react';

import EventService from '../../../services/EventService';
import EventCard from '../card';
import Container from 'react-bootstrap/esm/Container';

class  EventList extends Component {
    constructor (props){
        super (props)
        this.state = {
            events: undefined,
            loggedUserEvents: []
        }
        this.eventService = new EventService()
    }
    componentDidMount = () => {
        this.updateEventList()
    }
    updateEventList = () => {  
        this.setLoggedUserEvents(this.props.loggedInUser._id)
        this.eventService
            .getAllEvents()
            .then(response =>this.setState({events: response.data}))
            .catch(err => console.log(err))
    }
    setLoggedUserEvents = userId => {
        let loggedUserEventsCopy = []
        this.eventService
            .getOwnedEvents(userId)
            .then(response => loggedUserEventsCopy.push(...response.data)) //Gestionar que siempre sea un array
            .then(() => this.eventService.getParticipantEvents(userId))
            .then(response => loggedUserEventsCopy.push(...response.data))
            .then(() => this.setState({loggedUserEvents: loggedUserEventsCopy}))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
            {this.props.location.pathname.includes('profile') ? 
                    <Container as='div'>
                        <h5>Joined events</h5>
                        {this.state.participantEvents.map(event => <EventCard {...this.props} loggedUserEvents={this.state.loggedUserEvents} updateEventList={this.updateEventList} loggedInUser={this.props.loggedInUser} key={event._id} {...event}/>)}
                        <h5>Your events</h5>
                        {this.state.ownedEvents.map(event => <EventCard {...this.props} loggedUserEvents={this.state.loggedUserEvents} updateEventList={this.updateEventList} loggedInUser={this.props.loggedInUser} key={event._id} {...event}/>)}
                    </Container> 
                    :
                    null
            }

            {!this.state.events ? <h1>Loading</h1> : this.props.location.pathname.includes('events') ? 
                    <Container as='div'>
                        {this.state.events.map(event => <EventCard {...this.props} loggedUserEvents={this.state.loggedUserEvents} updateEventList={this.updateEventList} loggedInUser={this.props.loggedInUser} key={event._id} {...event}/>)}
                    </Container> : null
                }
            </>
        )
    }
}
export default EventList
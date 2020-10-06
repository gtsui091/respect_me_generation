import React, { Component } from 'react';
import fire from '../fire';
import "../routes/CreateCard.css";
import { Nav, Row, Col, Tab, CardDeck, Card, Button } from 'react-bootstrap';
import TextLengthModal from '../components/TextLengthModal';
import CardModal from '../components/CardModal';

/**
 * Lets logged in users create a card post displayed as a MyCard component.
 */
class CreateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgOption: '1',
            text: '',
            createdCard: false,
            imgSrc: '',
            tag: 'all',
            cardKey: '',
            textLengthModal: false
        };
        this.db = fire.database();
        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleTxtChange = this.handleTxtChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // imgOption state is set when an image is selected
    handleImgChange(event) {
        this.setState({
            imgOption: event.target.value
        })
    }
    
    // text state is set when user enters a text
    handleTxtChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTagChange(event) {
        this.setState({
            tag: event.target.name
        })
    }

    // saves card information to firebase
    writeCardInfo(imgSrc, currentUser) {
        if(this.state.text.length <= 75) {
            var key = this.db.ref().child('Card').push().key;
            var timestamp = Date.now();
            
            this.db.ref("User/" + currentUser.uid).child('cards/' + key).set({
                imgOption: imgSrc,
                text: this.state.text,
                tag: this.state.tag,
                timestamp: timestamp
            });
            this.setState({
                cardKey: key,
                createdCard: true
            });
        } else {
            this.setState({textLengthModal: true});
        }
        
    }

    // finds src of the image selected by user
    handleSubmit(event) {
        event.preventDefault();
        var currentUser = fire.auth().currentUser;

        if (currentUser != null) {
            var imgRef = this.db.ref('Image');
            var imgSource = '';
            imgRef.on('value', snap => {
                const imgInfo = snap.val();
                imgSource = imgInfo[this.state.imgOption]
                this.setState({ imgSrc: imgInfo[this.state.imgOption]});
                this.writeCardInfo(imgSource, currentUser);
                this.increasePoints(currentUser);
            })
        }
    }

    /**
     * Gives welcome points to user.
     * @param {firebaseUser} currentUser 
     */
    increasePoints(currentUser){
        this.db.ref('User/'+currentUser.uid).once('value')
            .then(function(snapshot){
                let points = snapshot.child('points').val()
                points += 10
                console.log(points)
                fire.database().ref('User/' + currentUser.uid).update({
                    points
            })
        });
        this.checkBadge(currentUser);
    }

    /**
     * Check user's points to determine if the badge needs to be upgraded.
     * @param {firebaseUser} currentUser 
     */
    checkBadge(currentUser){
        this.db.ref('User/'+currentUser.uid).once('value')
            .then(function(snapshot){
                let points = snapshot.child('points').val()
                let badge = snapshot.child('badge').val()
                console.log(points);
                console.log(badge);
                if(points >= 100){
                    fire.database().ref('User/' + currentUser.uid).update({
                        badge: 'advanced'
                    });
                };
        });
    }

    render() {
        return (
            <div className="createcard_wrapper">
                <form onSubmit={this.handleSubmit}>
                    <div className='createcard_img'>
                        <p className="createcard_title">1. Select Image</p>
                        <CardDeck>
                            <div className="createcard_img--opt">
                                <label>
                                <Card>
                                    <Card.Img 
                                        className="cardImage" 
                                        src={"https://i.pinimg.com/564x/aa/b8/49/aab84958979e408935c1b472deacda43.jpg"}
                                    />
                                </Card>
                                <input 
                                        type="radio" 
                                        value="1" 
                                        checked={this.state.imgOption === "1"} 
                                        onChange={this.handleImgChange} 
                                    />
                                </label>
                            </div>
                            <div className="createcard_img--opt">
                                <label>
                                <Card>
                                    <Card.Img 
                                        className="cardImage" 
                                        src={"https://i.pinimg.com/564x/73/96/bd/7396bd1cbf9e8ef8c73be0476290fd95.jpg"}
                                    />
                                </Card>
                                <input 
                                        type="radio" 
                                        value="2" 
                                        checked={this.state.imgOption === "2"} 
                                        onChange={this.handleImgChange} 
                                    />
                                </label>
                            </div>
                            <div className="createcard_img--opt">
                                <label>
                                <Card>
                                    <Card.Img 
                                        className="cardImage" 
                                        src={"https://i.pinimg.com/564x/40/39/5c/40395c9d7cd4263ce1eb1d9eae47b920.jpg"}
                                    />
                                </Card>
                                <input 
                                        type="radio" 
                                        value="3" 
                                        checked={this.state.imgOption === "3"} 
                                        onChange={this.handleImgChange} 
                                    />
                                </label>
                            </div>
                        </CardDeck>
                    </div>
                    <div className="createcard_text">
                        <p className="createcard_title">2. Enter Text</p>
                        <textarea 
                            name='text' 
                            class="createcard_text--field" 
                            onChange={this.handleTxtChange} 
                        />    
                    </div>
                    <div className="createcard_tags">
                        <p className="createcard_title">3. Select a Tag</p>
                            <Tab.Container>
                                <Row>
                                    <Nav variant="pills">
                                        <Col>
                                            <Nav.Item>
                                                <Nav.Link name="study" onClick={this.handleTagChange}>Study</Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                        <Col> 
                                            <Nav.Item>
                                                <Nav.Link name="relationship" onClick={this.handleTagChange}>Relationship</Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                        <Col>
                                            <Nav.Item>
                                                <Nav.Link name="health" onClick={this.handleTagChange}>Health</Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                    </Nav>
                                </Row>
                            </Tab.Container>
                    </div>
                    <Button className="createcard_button--submit" onClick={this.handleSubmit} size="lg">Create card!</Button>
                </form>
                <CardModal
                    id={this.cardKey}
                    imgsrc={this.state.imgSrc}
                    text={this.state.text}
                    tag={this.state.tag}
                    animation={false}
                    show={this.state.createdCard}
                    onHide={()=> this.setState({createdCard: false})} 
                />
                <TextLengthModal
                    animation={false}
                    show={this.state.textLengthModal}
                    onHide={()=> this.setState({textLengthModal: false})}
                    textLength={75} 
                />
            </div>
        )
    }
}

export default CreateCard;


